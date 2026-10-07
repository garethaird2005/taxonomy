import { Client } from "postmark"
import * as z from "zod"

import { env } from "@/env.mjs"
import { contactSchema } from "@/lib/validations/contact"

const MAX_BODY_BYTES = 10_000
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 10 * 60 * 1000

// Best-effort, per-instance limiter. Put a shared store (e.g. Upstash) or the
// host's firewall in front of this route if abuse becomes a problem.
const hits = new Map<string, number[]>()

function isRateLimited(key: string) {
  const now = Date.now()
  if (hits.size > 10_000) hits.clear()
  const recent = (hits.get(key) ?? []).filter((t) => now - t < RATE_WINDOW_MS)
  recent.push(now)
  hits.set(key, recent)
  return recent.length > RATE_LIMIT
}

function isSameOrigin(req: Request) {
  const origin = req.headers.get("origin")
  if (!origin) return false
  try {
    return new URL(origin).host === new URL(req.url).host
  } catch {
    return false
  }
}

export async function POST(req: Request) {
  if (!isSameOrigin(req)) {
    return new Response(null, { status: 403 })
  }

  if (Number(req.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) {
    return new Response(null, { status: 413 })
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anon"
  if (isRateLimited(ip)) {
    return new Response(null, { status: 429 })
  }

  try {
    const body = contactSchema.parse(await req.json())

    // Bots fill the honeypot; pretend success so they learn nothing.
    if (body.website) {
      return new Response(null, { status: 200 })
    }

    if (!env.CONTACT_TO_EMAIL) {
      if (process.env.NODE_ENV === "production") {
        console.error("Contact form: CONTACT_TO_EMAIL is not set.")
        return new Response(null, { status: 503 })
      }
      console.info("Contact form (dev, not sent):", body)
      return new Response(null, { status: 200 })
    }

    const postmark = new Client(env.POSTMARK_API_TOKEN)
    await postmark.sendEmail({
      From: env.SMTP_FROM,
      To: env.CONTACT_TO_EMAIL,
      ReplyTo: body.email,
      Subject: `New enquiry: ${body.service} from ${body.name}`.replace(
        /[\r\n]+/g,
        " "
      ),
      TextBody: [
        `Name: ${body.name}`,
        `Email: ${body.email}`,
        `Company: ${body.company || "-"}`,
        `Service: ${body.service}`,
        `Budget: ${body.budget}`,
        "",
        body.message,
      ].join("\n"),
      MessageStream: "outbound",
    })

    return new Response(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError || error instanceof SyntaxError) {
      return new Response(null, { status: 422 })
    }

    console.error("Contact form failed:", error)
    return new Response(null, { status: 500 })
  }
}

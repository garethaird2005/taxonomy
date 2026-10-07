import * as z from "zod"

export const contactServices = [
  "Dashboard",
  "Workflow automation",
  "Website",
  "Not sure yet",
] as const

export const contactBudgets = [
  "Under £2,500",
  "£2,500 – £5,000",
  "£5,000 – £10,000",
  "£10,000+",
] as const

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.string().trim().email("Please enter a valid email.").max(200),
  company: z.string().trim().max(120).optional(),
  service: z.enum(contactServices),
  budget: z.enum(contactBudgets),
  message: z
    .string()
    .trim()
    .min(20, "A sentence or two helps us prepare (20 characters minimum).")
    .max(4000),
  // Honeypot: hidden from people, filled in by bots. Must stay empty.
  website: z.string().max(0).optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>

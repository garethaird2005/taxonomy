import { siteConfig } from "@/config/site"
import { ContactForm } from "@/components/landing/contact-form"

const promises = [
  "A reply within one working day",
  "A free 30-minute discovery call",
  "A fixed-price proposal, with no obligation",
]

export function Contact() {
  return (
    <section id="contact" className="container scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto grid max-w-[72rem] gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div className="flex flex-col gap-6">
          <span className="text-sm font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Contact
          </span>
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-4xl md:text-5xl">
            Let&apos;s build something that pays for itself.
          </h2>
          <p className="text-muted-foreground sm:text-lg">
            Tell us what is slowing you down or what you want to launch. You
            will get honest advice, even if the answer is that you do not need
            us.
          </p>
          <ul className="space-y-3">
            {promises.map((promise) => (
              <li key={promise} className="flex items-center gap-3 text-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                {promise}
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground">
            Prefer email?{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-medium text-foreground underline underline-offset-4"
            >
              {siteConfig.email}
            </a>
          </p>
        </div>
        <div className="relative">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}

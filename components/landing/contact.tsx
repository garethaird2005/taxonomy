import { siteConfig } from "@/config/site"
import { ContactForm } from "@/components/landing/contact-form"
import { PolarisMark } from "@/components/landing/polaris-mark"
import { Eyebrow } from "@/components/landing/section-header"

const promises = [
  "A reply within one working day",
  "A free 30-minute discovery call",
  "A fixed-price proposal, with no obligation",
]

export function Contact() {
  return (
    <section
      id="contact"
      data-surface="night"
      className="container scroll-mt-24 py-24 text-paper md:py-40"
    >
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Eyebrow index="07" data-reveal className="text-sky/70">
            Start a project
          </Eyebrow>
          <h2
            data-reveal="mask"
            className="mt-6 font-heading text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-[1.02] tracking-[-0.04em]"
          >
            <span>Let&apos;s build something that pays for itself.</span>
          </h2>
          <p
            data-reveal
            style={{ "--i": 1 } as React.CSSProperties}
            className="mt-6 max-w-[44ch] text-paper/70 md:text-lg md:leading-relaxed"
          >
            Tell us what is slowing you down or what you want to launch. You
            will get honest advice, even if the answer is that you do not need
            us.
          </p>
          <ul className="mt-10 border-t border-paper/10">
            {promises.map((promise, i) => (
              <li
                key={promise}
                data-reveal
                style={{ "--i": i + 2 } as React.CSSProperties}
                className="flex items-center gap-4 border-b border-paper/10 py-4 text-[15px]"
              >
                <PolarisMark className="h-3 w-3 text-sky" />
                {promise}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-paper/60">
            Prefer email?{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-paper underline decoration-paper/30 underline-offset-4 transition-colors duration-500 ease-smooth hover:decoration-paper"
            >
              {siteConfig.email}
            </a>
          </p>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <div
            data-reveal
            style={{ "--i": 1 } as React.CSSProperties}
            className="theme-paper rounded-[1.5rem] bg-card p-6 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.75)] sm:p-10"
          >
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}

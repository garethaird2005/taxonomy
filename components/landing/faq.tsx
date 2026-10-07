import { faqs } from "@/config/landing"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Eyebrow } from "@/components/landing/section-header"

export function Faq() {
  return (
    <section id="faq" className="container scroll-mt-24 pb-24 md:pb-36">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Eyebrow index="06" data-reveal>
              Questions
            </Eyebrow>
            <h2
              data-reveal="mask"
              className="mt-6 font-heading text-[clamp(2.25rem,4.4vw,3.75rem)] font-light leading-[1.04] tracking-[-0.035em]"
            >
              <span>Straight answers.</span>
            </h2>
            <p
              data-reveal
              style={{ "--i": 2 } as React.CSSProperties}
              className="mt-6 text-muted-foreground md:text-lg"
            >
              Can&apos;t see yours?{" "}
              <a
                href="#contact"
                className="text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors duration-500 ease-smooth hover:decoration-foreground"
              >
                Ask us directly
              </a>
              .
            </p>
          </div>
        </div>
        <Accordion
          type="single"
          collapsible
          className="border-t border-foreground/15 lg:col-span-7 lg:col-start-6"
        >
          {faqs.map((faq, i) => (
            <AccordionItem
              key={faq.question}
              value={faq.question}
              data-reveal
              style={{ "--i": i } as React.CSSProperties}
              className="border-foreground/15"
            >
              <AccordionTrigger className="gap-6 py-6 text-left font-heading text-lg font-normal tracking-[-0.01em] hover:no-underline md:text-xl">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pr-10 text-[15px] leading-relaxed text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

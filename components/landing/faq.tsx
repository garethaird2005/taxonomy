import { faqs } from "@/config/landing"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { SectionHeader } from "@/components/landing/section-header"

export function Faq() {
  return (
    <section id="faq" className="container scroll-mt-20 py-16 md:py-24">
      <SectionHeader eyebrow="FAQ" title="Questions, answered" />
      <Accordion
        type="single"
        collapsible
        className="mx-auto mt-10 max-w-[48rem]"
      >
        {faqs.map((faq) => (
          <AccordionItem key={faq.question} value={faq.question}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}

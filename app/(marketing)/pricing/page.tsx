import { Contact } from "@/components/landing/contact"
import { Faq } from "@/components/landing/faq"
import { Pricing } from "@/components/landing/pricing"
import { Eyebrow } from "@/components/landing/section-header"
import { Sheet } from "@/components/landing/sheet"

export const metadata = {
  title: "Pricing",
}

export default function PricingPage() {
  return (
    <>
      <section
        data-surface="night"
        className="container pb-20 pt-40 text-paper md:pb-28 md:pt-48"
      >
        <Eyebrow data-load className="text-sky/70">
          Pricing
        </Eyebrow>
        <h1 className="mt-6 max-w-[14ch] font-heading text-[clamp(2.85rem,6.4vw,6rem)] font-light leading-[0.98] tracking-[-0.045em]">
          <span data-load="mask">
            <span>Clear prices for work that lasts.</span>
          </span>
        </h1>
      </section>
      <Sheet>
        <Pricing />
        <Faq />
      </Sheet>
      <Contact />
    </>
  )
}

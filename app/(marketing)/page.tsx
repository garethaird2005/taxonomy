import { Commitments } from "@/components/landing/commitments"
import { Contact } from "@/components/landing/contact"
import { Faq } from "@/components/landing/faq"
import { Hero } from "@/components/landing/hero"
import { Pricing } from "@/components/landing/pricing"
import { Process } from "@/components/landing/process"
import { Reasons } from "@/components/landing/reasons"
import { Services } from "@/components/landing/services"
import { Sheet } from "@/components/landing/sheet"
import { Statement } from "@/components/landing/statement"
import { Tools } from "@/components/landing/tools"
import { Work } from "@/components/landing/work"

// Night sections show the backdrop; paper sheets rise over it in between.
export default function IndexPage() {
  return (
    <>
      <Hero />
      <Tools />
      <Sheet>
        <Services />
        <Reasons />
      </Sheet>
      <Commitments />
      <Sheet>
        <Process />
        <Work />
      </Sheet>
      <Statement />
      <Sheet>
        <Pricing />
        <Faq />
      </Sheet>
      <Contact />
    </>
  )
}

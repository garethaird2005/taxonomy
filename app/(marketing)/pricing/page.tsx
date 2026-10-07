import { Contact } from "@/components/landing/contact"
import { Pricing } from "@/components/landing/pricing"

export const metadata = {
  title: "Pricing",
}

export default function PricingPage() {
  return (
    <>
      <Pricing />
      <Contact />
    </>
  )
}

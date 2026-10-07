import { Contact } from "@/components/landing/contact"
import { Faq } from "@/components/landing/faq"
import { Hero } from "@/components/landing/hero"
import { Pricing } from "@/components/landing/pricing"
import { Process } from "@/components/landing/process"
import { Services } from "@/components/landing/services"
import { Showcase } from "@/components/landing/showcase"

export default function IndexPage() {
  return (
    <>
      <Hero />
      <Services />
      <Showcase />
      <Process />
      <Pricing />
      <Faq />
      <Contact />
    </>
  )
}

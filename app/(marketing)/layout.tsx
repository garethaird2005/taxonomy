import { marketingConfig } from "@/config/marketing"
import { Backdrop } from "@/components/landing/backdrop"
import { Footer } from "@/components/landing/footer"
import { ScrollEffects } from "@/components/landing/scroll-effects"
import { SiteHeader } from "@/components/landing/site-header"

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip">
      <Backdrop />
      <SiteHeader items={marketingConfig.mainNav} />
      <main className="flex-1">{children}</main>
      <Footer />
      <ScrollEffects />
    </div>
  )
}

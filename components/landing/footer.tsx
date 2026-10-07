import Link from "next/link"

import { services } from "@/config/landing"
import { marketingConfig } from "@/config/marketing"
import { siteConfig } from "@/config/site"
import { PolarisMark } from "@/components/landing/polaris-mark"

export function Footer() {
  return (
    <footer data-surface="night" className="text-paper">
      <div className="container pb-8 pt-16 md:pt-24">
        <div className="grid gap-12 border-t border-paper/10 pt-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <PolarisMark className="h-5 w-5 text-sky" />
            <p className="mt-6 max-w-[30ch] font-heading text-2xl font-light leading-snug tracking-[-0.02em]">
              {siteConfig.description}
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-6 inline-block text-sm text-paper/70 underline decoration-paper/30 underline-offset-4 transition-colors duration-500 ease-smooth hover:text-paper hover:decoration-paper"
            >
              {siteConfig.email}
            </a>
          </div>
          <FooterLinks
            title="Services"
            className="md:col-span-2 md:col-start-8"
            links={services.map((service) => ({
              title: service.title,
              href: `/#${service.id}`,
            }))}
          />
          <FooterLinks
            title="Studio"
            className="md:col-span-2"
            links={marketingConfig.mainNav.filter(
              (item) => item.href !== "/#services"
            )}
          />
          <FooterLinks
            title="Contact"
            className="md:col-span-1"
            links={[{ title: "Enquire", href: "/#contact" }]}
          />
        </div>
        <p
          aria-hidden="true"
          className="mt-20 select-none whitespace-nowrap font-heading text-[clamp(3rem,17vw,16rem)] font-light leading-[0.85] tracking-[-0.055em] text-paper/90 md:mt-28"
        >
          {siteConfig.name}
        </p>
        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-paper/10 pt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/50 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}
          </p>
          <p>Dashboards, automations and websites</p>
        </div>
      </div>
    </footer>
  )
}

function FooterLinks({
  title,
  links,
  className,
}: {
  title: string
  links: { title: string; href: string }[]
  className?: string
}) {
  return (
    <nav aria-label={title} className={className}>
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sky/60">
        {title}
      </p>
      <ul className="mt-5 space-y-3 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-paper/70 transition-colors duration-500 ease-smooth hover:text-paper"
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

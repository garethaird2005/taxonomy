import Link from "next/link"

import { services } from "@/config/landing"
import { Icons } from "@/components/icons"

const delay = (i: number) => ({ "--i": i } as React.CSSProperties)

export function Hero() {
  return (
    <section
      data-surface="night"
      className="relative flex min-h-[100svh] flex-col text-paper"
    >
      <div className="container flex flex-1 flex-col justify-center pb-16 pt-32 md:pt-40">
        <p
          data-load
          style={delay(0)}
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-sky/80 sm:tracking-[0.24em]"
        >
          Dashboards &middot; Automations &middot; Websites
        </p>
        <h1 className="mt-7 font-heading text-[clamp(2.5rem,10.4vw,6.75rem)] font-light leading-[0.98] tracking-[-0.045em]">
          <span data-load="mask" style={delay(0)}>
            <span>Software that makes</span>
          </span>
          <span data-load="mask" style={delay(1)}>
            <span>your business</span>
          </span>
          <span data-load="mask" style={delay(2)}>
            <span>run itself.</span>
          </span>
        </h1>
        <p
          data-load
          style={delay(4)}
          className="text-balance mt-8 max-w-[34rem] text-base leading-relaxed text-paper/70 md:text-lg"
        >
          Polaris Works designs live dashboards, quiet automations and websites
          of real craft, so your team sees clearly and moves faster.
        </p>
        <div
          data-load
          style={delay(5)}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Link
            href="#contact"
            className="group inline-flex h-12 items-center gap-3 rounded-full bg-paper pl-6 pr-2 text-sm font-medium text-ink transition-colors duration-500 ease-smooth hover:bg-white"
          >
            Start a project
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-paper">
              <Icons.arrowRight className="h-3.5 w-3.5 transition-transform duration-500 ease-smooth group-hover:translate-x-0.5" />
            </span>
          </Link>
          <Link
            href="#work"
            className="inline-flex h-12 items-center rounded-full border border-paper/20 px-6 text-sm transition-colors duration-500 ease-smooth hover:border-paper/50"
          >
            See the work
          </Link>
        </div>
      </div>

      <div className="container pb-6 md:pb-8">
        <div className="grid border-t border-paper/15 sm:grid-cols-3">
          {services.map((service, i) => (
            <Link
              key={service.id}
              href={`#${service.id}`}
              data-load
              style={delay(6 + i)}
              className="group flex items-center gap-4 border-b border-paper/10 py-4 sm:border-b-0 sm:py-5 sm:pr-8"
            >
              <span className="font-mono text-[11px] text-sky/70">
                {service.index}
              </span>
              <span className="flex-1">
                <span className="block text-sm">{service.title}</span>
                <span className="mt-0.5 block text-[13px] text-paper/50">
                  {service.tagline}
                </span>
              </span>
              <Icons.arrowRight className="h-4 w-4 opacity-40 transition-[opacity,transform] duration-500 ease-smooth group-hover:translate-x-1 group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

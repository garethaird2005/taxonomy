"use client"

import * as React from "react"

import { services } from "@/config/landing"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { SectionHeader } from "@/components/landing/section-header"
import { VisualPanel, serviceVisuals } from "@/components/landing/visuals"

/**
 * The services, told one at a time. On large screens the illustration stays
 * pinned while the copy scrolls past, and crossfades to match whichever
 * service sits in the middle of the viewport.
 */
export function Services() {
  const [active, setActive] = React.useState(0)
  const steps = React.useRef<(HTMLElement | null)[]>([])

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.step))
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    )
    steps.current.forEach((step) => step && observer.observe(step))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" className="container scroll-mt-24 py-24 md:py-36">
      <SectionHeader
        index="01"
        eyebrow="What we do"
        title="Three disciplines, one way of working."
        description="Dashboards show where the business stands, automations take the repetitive work away, and a website brings in the next client. We design all three to work as one."
      />

      <div className="mt-16 grid gap-y-4 md:mt-24 lg:grid-cols-12 lg:gap-x-12">
        <div className="hidden lg:col-span-6 lg:block">
          <div className="sticky top-28 h-[min(40rem,calc(100vh-9rem))]">
            <VisualPanel className="h-full">
              {services.map((service, i) => {
                const Visual = serviceVisuals[service.id]
                return (
                  <div
                    key={service.id}
                    aria-hidden={active !== i}
                    className={cn(
                      "absolute inset-0 transition-[opacity,transform] duration-700 ease-smooth",
                      active === i
                        ? "opacity-100"
                        : "pointer-events-none scale-[1.02] opacity-0"
                    )}
                  >
                    <Visual />
                  </div>
                )
              })}
            </VisualPanel>
            <div className="absolute -bottom-8 left-0 flex gap-2">
              {services.map((service, i) => (
                <span
                  key={service.id}
                  className={cn(
                    "h-px w-10 transition-colors duration-700 ease-smooth",
                    active === i ? "bg-foreground" : "bg-foreground/20"
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          {services.map((service, i) => {
            const Visual = serviceVisuals[service.id]
            return (
              <article
                key={service.id}
                id={service.id}
                data-step={i}
                ref={(element) => (steps.current[i] = element)}
                className="scroll-mt-28 border-t border-foreground/15 py-12 first:border-t-0 lg:flex lg:min-h-[80vh] lg:flex-col lg:justify-center lg:border-t-0"
              >
                <VisualPanel className="mb-10 aspect-[4/5] sm:aspect-[5/4] lg:hidden">
                  <Visual />
                </VisualPanel>
                <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  <span className="text-highlight">{service.index}</span>
                  <span
                    aria-hidden="true"
                    className="h-px w-8 bg-current opacity-40"
                  />
                  {service.title}
                </p>
                <h3
                  data-reveal="mask"
                  className="mt-6 font-heading text-[clamp(1.9rem,3vw,2.75rem)] font-light leading-[1.06] tracking-[-0.03em]"
                >
                  <span>{service.heading}</span>
                </h3>
                <p
                  data-reveal
                  style={{ "--i": 1 } as React.CSSProperties}
                  className="mt-5 text-muted-foreground md:text-lg md:leading-relaxed"
                >
                  {service.description}
                </p>
                <ul className="mt-8 border-t border-foreground/10">
                  {service.points.map((point, j) => (
                    <li
                      key={point}
                      data-reveal
                      style={{ "--i": j + 2 } as React.CSSProperties}
                      className="flex gap-4 border-b border-foreground/10 py-3.5 text-[15px]"
                    >
                      <Icons.check className="mt-0.5 h-4 w-4 shrink-0 text-highlight" />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

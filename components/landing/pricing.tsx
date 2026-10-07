import Link from "next/link"

import { plans } from "@/config/landing"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { SectionHeader } from "@/components/landing/section-header"

export function Pricing() {
  return (
    <section id="pricing" className="container scroll-mt-24 py-24 md:py-36">
      <SectionHeader
        index="05"
        eyebrow="Pricing"
        title="Fixed prices, agreed up front."
        description="These are starting points. Your proposal gives one fixed price for the scope we agree together, before any work begins."
      />
      <div className="mt-14 grid gap-4 md:mt-20 lg:grid-cols-3">
        {plans.map((plan, i) => (
          <div
            key={plan.name}
            data-reveal
            style={{ "--i": i } as React.CSSProperties}
            className={cn(
              "relative flex flex-col rounded-[1.5rem] p-8 md:p-10",
              plan.featured
                ? "theme-night bg-night shadow-[0_30px_80px_-30px_rgba(5,11,22,0.6)]"
                : "border border-foreground/10 bg-card"
            )}
          >
            {plan.featured ? (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[1.5rem] bg-[radial-gradient(80%_50%_at_100%_0%,rgba(42,80,216,0.35),transparent_70%)]"
              />
            ) : null}
            <div className="relative flex h-full flex-col">
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.22em]">
                  {plan.name}
                </h3>
                {plan.featured ? (
                  <span className="rounded-full border border-highlight/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-highlight">
                    Signature
                  </span>
                ) : null}
              </div>
              <p className="mt-12 font-heading text-6xl font-light tracking-[-0.045em]">
                {plan.price}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {plan.cadence}
              </p>
              <p className="mt-6 text-[15px] leading-relaxed">
                {plan.description}
              </p>
              <ul className="mt-8 flex-1 space-y-3 border-t border-foreground/10 pt-8 text-[15px]">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <Icons.check className="mt-0.5 h-4 w-4 shrink-0 text-highlight" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/#contact"
                className={cn(
                  "group mt-10 inline-flex h-12 items-center justify-between rounded-full pl-6 pr-2 text-sm font-medium transition-colors duration-500 ease-smooth",
                  plan.featured
                    ? "bg-paper text-ink hover:bg-white"
                    : "bg-ink text-paper hover:bg-night"
                )}
              >
                <span>
                  Start {/^[aeiou]/i.test(plan.name) ? "an" : "a"}{" "}
                  {plan.name.toLowerCase()} project
                </span>
                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full",
                    plan.featured ? "bg-ink text-paper" : "bg-paper text-ink"
                  )}
                >
                  <Icons.arrowRight className="h-3.5 w-3.5 transition-transform duration-500 ease-smooth group-hover:translate-x-0.5" />
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <p
        data-reveal
        className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground"
      >
        Prices exclude VAT. Monthly care plans are available after launch.
      </p>
    </section>
  )
}

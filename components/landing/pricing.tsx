import Link from "next/link"

import { plans } from "@/config/landing"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { SectionHeader } from "@/components/landing/section-header"

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-20 border-y py-16 md:py-24">
      <div className="container">
        <SectionHeader
          eyebrow="Pricing"
          title="Fixed prices, agreed up front"
          description="Every project gets a written quote before work starts. These are typical starting points."
        />
        <div className="mx-auto mt-12 grid max-w-[72rem] items-start gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-background/60 p-8 backdrop-blur-sm",
                plan.featured &&
                  "border-indigo-500 shadow-xl shadow-indigo-500/10 md:-mt-4 md:pb-12"
              )}
            >
              {plan.featured ? (
                <span className="absolute -top-3 left-8 rounded-full bg-indigo-500 px-3 py-1 text-xs font-semibold text-white">
                  Most popular
                </span>
              ) : null}
              <h3 className="font-semibold">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {plan.description}
              </p>
              <p className="mt-6">
                <span className="font-heading text-4xl">{plan.price}</span>{" "}
                <span className="text-sm text-muted-foreground">
                  {plan.cadence}
                </span>
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <Icons.check
                      className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/#contact"
                className={cn(
                  buttonVariants({
                    variant: plan.featured ? "default" : "outline",
                  }),
                  "mt-8"
                )}
              >
                Get a quote
              </Link>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Need ongoing help? Monthly care plans cover updates, monitoring and
          small improvements.
        </p>
      </div>
    </section>
  )
}

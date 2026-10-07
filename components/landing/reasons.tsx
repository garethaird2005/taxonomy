import { reasons } from "@/config/landing"
import { SectionHeader } from "@/components/landing/section-header"

export function Reasons() {
  return (
    <section className="container pb-24 md:pb-36">
      <SectionHeader
        index="02"
        eyebrow="Why Polaris Works"
        title="Quietly excellent, from first call to launch."
      />
      <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
        {reasons.map((reason, i) => (
          <div
            key={reason.title}
            data-reveal
            style={{ "--i": i } as React.CSSProperties}
            className="border-t border-foreground/15 pt-6"
          >
            <p className="font-mono text-[11px] text-highlight">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-8 font-heading text-xl tracking-[-0.02em]">
              {reason.title}
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              {reason.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

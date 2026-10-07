import { steps } from "@/config/landing"
import { SectionHeader } from "@/components/landing/section-header"

export function Process() {
  return (
    <section id="process" className="container scroll-mt-24 py-24 md:py-36">
      <SectionHeader
        index="03"
        eyebrow="How we work"
        title="Four steps, no surprises."
        description="Every project follows the same path, with a fixed price agreed before any build starts and a demo of real progress every week."
      />
      {/* Scroll effects set --progress as the steps pass through view. */}
      <ol
        data-scroll-progress
        className="relative mt-16 grid gap-12 md:mt-24 md:grid-cols-4 md:gap-8"
      >
        <span
          aria-hidden="true"
          className="absolute inset-y-2 left-[7px] w-px bg-foreground/15 md:inset-x-0 md:bottom-auto md:top-[7px] md:h-px md:w-auto"
        >
          <span className="block h-full w-full origin-top scale-y-[var(--progress,0)] bg-highlight md:origin-left md:scale-x-[var(--progress,0)] md:scale-y-100" />
        </span>
        {steps.map((step, i) => (
          <li
            key={step.title}
            data-reveal
            style={{ "--i": i } as React.CSSProperties}
            className="relative pl-10 md:pl-0 md:pt-14"
          >
            <span
              aria-hidden="true"
              className="absolute left-0 top-1 h-[15px] w-[15px] rounded-full border border-foreground/25 bg-background md:top-0"
            >
              <span
                className="absolute inset-[3px] rounded-full bg-highlight"
                style={{
                  opacity: `clamp(0, (var(--progress, 0) - ${
                    i * 0.25
                  }) * 12, 1)`,
                }}
              />
            </span>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Step {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-3 font-heading text-2xl font-light tracking-[-0.02em] md:text-3xl">
              {step.title}
            </h3>
            <p className="mt-3 max-w-[30ch] text-[15px] leading-relaxed text-muted-foreground">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  )
}

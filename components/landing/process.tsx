import { steps } from "@/config/landing"
import { SectionHeader } from "@/components/landing/section-header"

export function Process() {
  return (
    <section id="process" className="container scroll-mt-20 py-16 md:py-24">
      <SectionHeader
        eyebrow="Process"
        title="Clear steps, no surprises"
        description="You always know what is happening, what it costs and what comes next."
      />
      <ol className="mx-auto mt-12 grid max-w-[72rem] gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li key={step.title} className="relative rounded-2xl border p-6">
            <div className="flex items-center justify-between">
              <step.icon
                className="h-6 w-6 text-indigo-500"
                aria-hidden="true"
              />
              <span className="font-heading text-3xl text-muted-foreground/40">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-6 font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  )
}

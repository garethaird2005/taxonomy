import { GitMerge, Globe, LayoutDashboard } from "lucide-react"

import { caseStudies, type CaseStudy } from "@/config/landing"
import { SectionHeader } from "@/components/landing/section-header"

const categoryStyles: Record<
  CaseStudy["category"],
  { icon: typeof Globe; gradient: string }
> = {
  Dashboard: {
    icon: LayoutDashboard,
    gradient: "from-indigo-500/20 to-sky-400/20",
  },
  Automation: {
    icon: GitMerge,
    gradient: "from-violet-500/20 to-fuchsia-400/20",
  },
  Website: { icon: Globe, gradient: "from-sky-400/20 to-emerald-400/20" },
}

export function Showcase() {
  return (
    <section
      id="work"
      className="scroll-mt-20 border-y bg-slate-50 py-16 dark:bg-transparent md:py-24"
    >
      <div className="container">
        <SectionHeader
          eyebrow="Selected work"
          title="Built to be used every day"
          description="A taste of the kind of projects delivered. Every one is measured by the time it saves or the revenue it brings in."
        />
        <div className="mx-auto mt-12 grid max-w-[72rem] gap-6 md:grid-cols-3">
          {caseStudies.map((study) => {
            const { icon: CategoryIcon, gradient } =
              categoryStyles[study.category]
            return (
              <article
                key={study.title}
                className="flex flex-col overflow-hidden rounded-2xl border bg-background"
              >
                <div
                  className={`relative flex h-40 items-center justify-center bg-gradient-to-br ${gradient}`}
                >
                  <CategoryIcon
                    className="h-12 w-12 text-foreground/70"
                    aria-hidden="true"
                  />
                  {study.sample ? (
                    <span className="absolute right-3 top-3 rounded-full border bg-background/80 px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                      Sample
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {study.category} · {study.client}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold">{study.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">
                    {study.summary}
                  </p>
                  <p className="mt-4 border-t pt-4 text-sm font-medium">
                    {study.result}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

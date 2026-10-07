import { caseStudies } from "@/config/landing"
import { DitherArt } from "@/components/landing/dither-art"
import { SectionHeader } from "@/components/landing/section-header"

export function Work() {
  return (
    <section id="work" className="container scroll-mt-24 pb-24 md:pb-36">
      <SectionHeader
        index="04"
        eyebrow="Selected work"
        title="Built to be used every day."
        description="The kind of work we do, shown as samples. Real client projects replace these as they launch."
      />
      <div className="mt-14 grid gap-x-6 gap-y-14 md:mt-20 md:grid-cols-3">
        {caseStudies.map((study, i) => (
          <article
            key={study.title}
            data-reveal
            style={{ "--i": i } as React.CSSProperties}
            className="group"
          >
            <div className="theme-night relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-night">
              <DitherArt
                seed={study.seed}
                className="transition-transform ease-smooth [transition-duration:1400ms] group-hover:scale-[1.04]"
              />
              <div className="absolute inset-x-5 top-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-paper/80">
                <span>{study.category}</span>
                {study.sample ? (
                  <span className="rounded-full border border-paper/30 px-2.5 py-1">
                    Sample
                  </span>
                ) : null}
              </div>
              <p className="absolute inset-x-5 bottom-5 font-heading text-2xl font-light leading-tight tracking-[-0.02em] text-paper">
                {study.result}
              </p>
            </div>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              {study.client}
            </p>
            <h3 className="mt-2 font-heading text-xl tracking-[-0.02em]">
              {study.title}
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
              {study.summary}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

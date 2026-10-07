import { commitments } from "@/config/landing"
import { Eyebrow } from "@/components/landing/section-header"

// A window onto the backdrop between two paper sheets.
export function Commitments() {
  return (
    <section
      data-surface="night"
      aria-labelledby="commitments-title"
      className="container py-28 text-paper md:py-40"
    >
      <Eyebrow data-reveal className="text-sky/70">
        In writing
      </Eyebrow>
      <h2
        id="commitments-title"
        data-reveal="mask"
        className="mt-6 max-w-[16ch] font-heading text-[clamp(2.25rem,4.4vw,3.75rem)] font-light leading-[1.04] tracking-[-0.035em]"
      >
        <span>Promises you can hold us to.</span>
      </h2>
      <dl className="mt-16 grid gap-y-12 sm:grid-cols-2 md:mt-24 lg:grid-cols-4">
        {commitments.map((commitment, i) => (
          <div
            key={commitment.label}
            data-reveal
            style={{ "--i": i } as React.CSSProperties}
            className="flex flex-col-reverse border-l border-paper/15 pl-6"
          >
            <dt className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-sky/70">
              {commitment.label}
            </dt>
            <dd className="font-heading text-[clamp(2.75rem,5vw,4.5rem)] font-light leading-none tracking-[-0.04em]">
              {commitment.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

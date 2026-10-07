import { Eyebrow } from "@/components/landing/section-header"

// A second window onto the backdrop, carrying the studio's aim.
export function Statement() {
  return (
    <section
      data-surface="night"
      className="container flex flex-col items-center py-32 text-center text-paper md:py-48"
    >
      <Eyebrow data-reveal className="text-sky/70">
        Our aim
      </Eyebrow>
      <h2
        data-reveal="mask"
        className="mt-8 max-w-[19ch] font-heading text-[clamp(2.25rem,5.4vw,4.75rem)] font-light leading-[1.04] tracking-[-0.04em]"
      >
        <span>Small teams, working with the reach of big ones.</span>
      </h2>
    </section>
  )
}

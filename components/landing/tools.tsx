import { tools } from "@/config/landing"

export function Tools() {
  return (
    <section
      data-surface="night"
      aria-label="Tools we work with"
      className="pb-24 pt-8 text-paper md:pb-32"
    >
      <div className="container flex flex-col gap-6 md:flex-row md:items-center md:gap-14">
        <p
          data-reveal
          className="shrink-0 font-mono text-[11px] uppercase leading-relaxed tracking-[0.22em] text-sky/70"
        >
          Works with the tools
          <br className="hidden md:block" /> you already use
        </p>
        <div
          data-reveal
          style={{ "--i": 1 } as React.CSSProperties}
          className="mask-fade-x flex overflow-hidden"
        >
          <ul className="flex w-max shrink-0 animate-marquee items-center gap-12 pr-12 motion-reduce:animate-none">
            {[...tools, ...tools].map((tool, i) => (
              <li
                key={i}
                aria-hidden={i >= tools.length ? true : undefined}
                className="whitespace-nowrap font-heading text-2xl font-light tracking-[-0.02em] text-paper/70"
              >
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

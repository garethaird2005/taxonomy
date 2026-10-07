import { cn } from "@/lib/utils"

interface EyebrowProps extends React.HTMLAttributes<HTMLParagraphElement> {
  index?: string
}

// Small mono label above a heading: "01 —— Services".
export function Eyebrow({
  index,
  className,
  children,
  ...props
}: EyebrowProps) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground",
        className
      )}
      {...props}
    >
      {index ? <span className="text-highlight">{index}</span> : null}
      <span aria-hidden="true" className="h-px w-8 bg-current opacity-40" />
      {children}
    </p>
  )
}

interface SectionHeaderProps {
  index: string
  eyebrow: string
  title: React.ReactNode
  description?: React.ReactNode
  className?: string
}

export function SectionHeader({
  index,
  eyebrow,
  title,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("grid gap-8 md:grid-cols-12 md:items-end", className)}>
      <div className="md:col-span-7">
        <Eyebrow index={index} data-reveal>
          {eyebrow}
        </Eyebrow>
        <h2
          data-reveal="mask"
          className="mt-6 font-heading text-[clamp(2.25rem,4.4vw,3.75rem)] font-light leading-[1.04] tracking-[-0.035em]"
        >
          <span>{title}</span>
        </h2>
      </div>
      {description ? (
        <p
          data-reveal
          style={{ "--i": 2 } as React.CSSProperties}
          className="text-balance text-muted-foreground md:col-span-5 md:pb-2 md:text-lg md:leading-relaxed"
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}

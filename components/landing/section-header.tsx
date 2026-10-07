import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  eyebrow: string
  title: string
  description?: string
  className?: string
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mx-auto flex max-w-[48rem] flex-col items-center gap-4 text-center",
        className
      )}
    >
      <span className="text-sm font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
        {eyebrow}
      </span>
      <h2 className="font-heading text-3xl leading-[1.1] sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-[40rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          {description}
        </p>
      ) : null}
    </div>
  )
}

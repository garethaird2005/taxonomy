import { cn } from "@/lib/utils"

/**
 * A paper sheet that rises over the night backdrop. Every light section of
 * the site sits on one, so the move from night to paper always looks the
 * same.
 */
export function Sheet({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-sheet
      data-surface="paper"
      className={cn(
        "theme-paper relative z-10 mx-2 rounded-[1.75rem] bg-background shadow-[0_-24px_80px_-32px_rgba(0,0,0,0.65)] sm:mx-4 lg:mx-5 lg:rounded-[2.25rem]",
        className
      )}
      {...props}
    />
  )
}

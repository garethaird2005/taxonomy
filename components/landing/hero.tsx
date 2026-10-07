import Link from "next/link"

import { heroStats } from "@/config/landing"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { DashboardPreview } from "@/components/landing/dashboard-preview"

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)]" />
      <div className="absolute left-1/2 top-0 -z-10 h-[480px] w-[880px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/25 via-violet-500/20 to-sky-400/25 blur-3xl" />
      <div className="container grid items-center gap-12 pb-16 pt-12 md:pb-24 md:pt-20 lg:grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1 text-sm text-muted-foreground backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Taking on new projects
          </span>
          <h1 className="font-heading text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
            Software that makes your business{" "}
            <span className="text-gradient">run itself.</span>
          </h1>
          <p className="max-w-[36rem] text-lg leading-8 text-muted-foreground">
            Live dashboards, workflow automations and high-end websites,
            designed and built to the same standard as the site you are reading
            now.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/#contact"
              className={cn(buttonVariants({ size: "lg" }))}
            >
              Start a project
              <Icons.arrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/#work"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              See the work
            </Link>
          </div>
          <dl className="mt-4 grid w-full max-w-[32rem] grid-cols-3 gap-6 border-t pt-6">
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-xs text-muted-foreground">{stat.label}</dt>
                <dd className="mt-1 font-heading text-2xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <DashboardPreview className="lg:translate-x-6" />
      </div>
    </section>
  )
}

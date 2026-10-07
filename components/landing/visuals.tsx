import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { DitherArt } from "@/components/landing/dither-art"

// Illustrations for the three services, drawn in HTML and SVG on a night
// panel. Figures are illustrative.

const revenue = [42, 47, 45, 53, 57, 54, 62, 69, 67, 78, 85, 92]
const months = ["Oct", "Dec", "Feb", "Apr", "Jun", "Aug"]

function chartPath(values: number[], width: number, height: number) {
  const max = Math.max(...values) * 1.1
  const step = width / (values.length - 1)
  return values
    .map((value, i) => {
      const x = (i * step).toFixed(1)
      const y = (height - (value / max) * height).toFixed(1)
      return `${i ? "L" : "M"}${x} ${y}`
    })
    .join("")
}

const line = chartPath(revenue, 320, 140)
const lastY = 1 - revenue[revenue.length - 1] / (Math.max(...revenue) * 1.1)

const kpis = [
  { label: "Monthly revenue", value: "£128.4k", delta: "+12.6%" },
  { label: "Active clients", value: "342", delta: "+4.1%" },
  { label: "Hours saved", value: "1,240", delta: "this quarter" },
]

export function DashboardVisual() {
  const fill = `revenue-${React.useId().replace(/:/g, "")}`
  return (
    <div className="flex h-full flex-col gap-3 p-5 text-paper md:p-8">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/50">
          Revenue overview
        </p>
        <span className="flex items-center gap-2 rounded-full border border-paper/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-paper/70">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky motion-reduce:animate-none" />
          Live
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2 md:gap-3">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-xl border border-paper/10 bg-paper/[0.03] p-3"
          >
            <p className="truncate text-[11px] text-paper/50">{kpi.label}</p>
            <p className="mt-1.5 font-heading text-lg font-light tracking-[-0.02em] md:text-2xl">
              {kpi.value}
            </p>
            <p className="mt-1 font-mono text-[10px] text-sky">{kpi.delta}</p>
          </div>
        ))}
      </div>
      <div className="relative flex min-h-[9rem] flex-1 flex-col rounded-xl border border-paper/10 bg-paper/[0.03] p-4">
        <p className="text-[11px] text-paper/50">Revenue, last 12 months</p>
        <div className="relative mt-3 flex-1">
          <svg
            viewBox="0 0 320 140"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full overflow-visible"
          >
            <defs>
              <linearGradient id={fill} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#2A50D8" stopOpacity="0.45" />
                <stop offset="1" stopColor="#2A50D8" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[0.25, 0.5, 0.75].map((y) => (
              <line
                key={y}
                x1="0"
                x2="320"
                y1={140 * y}
                y2={140 * y}
                stroke="#F2F0EB"
                strokeOpacity="0.08"
                vectorEffect="non-scaling-stroke"
              />
            ))}
            <path d={`${line}L320 140L0 140Z`} fill={`url(#${fill})`} />
            <path
              d={line}
              fill="none"
              stroke="#A9C2FF"
              strokeWidth="2"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <span
            className="absolute right-0 h-2.5 w-2.5 -translate-y-1/2 translate-x-1/2 rounded-full border-2 border-night bg-sky"
            style={{ top: `${lastY * 100}%` }}
          />
          <span
            className="absolute right-3 translate-y-[-160%] rounded-md bg-paper px-2 py-1 font-mono text-[10px] text-ink"
            style={{ top: `${lastY * 100}%` }}
          >
            £128.4k
          </span>
        </div>
        <div className="mt-3 flex justify-between font-mono text-[10px] text-paper/40">
          {months.map((month) => (
            <span key={month}>{month}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

const flow = [
  { code: "HS", app: "HubSpot", title: "Deal marked as won", meta: "Trigger" },
  {
    code: "DS",
    app: "DocuSign",
    title: "Contract sent for signature",
    meta: "0.8s",
  },
  {
    code: "XE",
    app: "Xero",
    title: "Invoice raised and scheduled",
    meta: "1.2s",
  },
  { code: "GM", app: "Gmail", title: "Welcome pack sent", meta: "0.4s" },
]

export function FlowVisual() {
  return (
    <div className="flex h-full flex-col p-5 text-paper md:p-8">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/50">
          Client onboarding
        </p>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-sky">
          Running
        </span>
      </div>
      <div className="mt-6 flex flex-1 flex-col justify-center">
        <ol className="relative flex flex-col gap-4">
          <span
            aria-hidden="true"
            className="absolute inset-y-6 left-[1.1875rem] w-px bg-paper/15"
          >
            <span className="absolute left-[-3px] h-[7px] w-[7px] animate-flow-pulse rounded-full bg-sky shadow-[0_0_12px_2px_rgba(169,194,255,0.6)] motion-reduce:hidden" />
          </span>
          {flow.map((step) => (
            <li
              key={step.title}
              className="relative flex items-center gap-4 rounded-xl border border-paper/10 bg-night/80 p-2.5 pr-4 backdrop-blur"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-paper/15 bg-ink font-mono text-[10px] text-paper/80">
                {step.code}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px]">{step.title}</span>
                <span className="block text-[11px] text-paper/45">
                  {step.app}
                </span>
              </span>
              <span className="font-mono text-[10px] text-paper/45">
                {step.meta}
              </span>
              <Icons.check className="h-3.5 w-3.5 text-sky" />
            </li>
          ))}
        </ol>
      </div>
      <div className="mt-6 grid grid-cols-3 border-t border-paper/10 pt-4">
        {[
          ["1,284", "Runs this month"],
          ["0", "Failed"],
          ["10 hrs", "Saved weekly"],
        ].map(([value, label]) => (
          <div key={label}>
            <p className="font-heading text-lg font-light md:text-xl">
              {value}
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper/45">
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function Score({ value, label }: { value: number; label: string }) {
  const circumference = 2 * Math.PI * 15
  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-paper/10 bg-paper/[0.03] p-2.5">
      <svg viewBox="0 0 36 36" className="h-9 w-9 shrink-0 -rotate-90">
        <circle
          cx="18"
          cy="18"
          r="15"
          fill="none"
          stroke="#F2F0EB"
          strokeOpacity="0.1"
          strokeWidth="3"
        />
        <circle
          cx="18"
          cy="18"
          r="15"
          fill="none"
          stroke="#A9C2FF"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={`${(value / 100) * circumference} ${circumference}`}
        />
      </svg>
      <span className="min-w-0">
        <span className="block font-heading text-base leading-none">
          {value}
        </span>
        <span className="mt-1 block truncate text-[10px] text-paper/50">
          {label}
        </span>
      </span>
    </div>
  )
}

export function SiteVisual() {
  return (
    <div className="flex h-full flex-col p-5 text-paper md:p-8">
      <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-paper/10 bg-ink">
        <div className="flex items-center gap-1.5 border-b border-paper/10 px-4 py-3">
          {[0, 1, 2].map((dot) => (
            <span key={dot} className="h-2 w-2 rounded-full bg-paper/20" />
          ))}
          <span className="mx-auto rounded-full bg-paper/5 px-4 py-1 font-mono text-[10px] text-paper/50">
            yourbrand.com
          </span>
        </div>
        <div className="relative min-h-[10rem] flex-1">
          <DitherArt seed={61} className="absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/10 to-transparent" />
          <div className="absolute inset-x-5 top-5 md:inset-x-7 md:top-6">
            <div className="flex items-center justify-between">
              <span className="h-1.5 w-14 rounded-full bg-paper/70" />
              <span className="flex gap-2">
                {[0, 1, 2].map((bar) => (
                  <span
                    key={bar}
                    className="h-1.5 w-6 rounded-full bg-paper/25"
                  />
                ))}
              </span>
            </div>
            <p className="mt-7 max-w-[13ch] font-heading text-2xl font-light leading-[1.05] tracking-[-0.03em] md:text-3xl">
              Your best work, beautifully told.
            </p>
            <span className="mt-4 inline-flex h-7 items-center rounded-full bg-paper px-3 text-[10px] font-medium text-ink">
              Book a call
            </span>
          </div>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 md:gap-3">
        <Score value={98} label="Performance" />
        <Score value={100} label="Accessibility" />
        <Score value={100} label="SEO" />
      </div>
    </div>
  )
}

export const serviceVisuals = {
  dashboards: DashboardVisual,
  automations: FlowVisual,
  websites: SiteVisual,
}

export function VisualPanel({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "theme-night relative overflow-hidden rounded-[1.25rem] bg-night ring-1 ring-inset ring-paper/5",
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(90%_60%_at_80%_0%,rgba(42,80,216,0.28),transparent_70%)]" />
      <div className="relative h-full">{children}</div>
    </div>
  )
}

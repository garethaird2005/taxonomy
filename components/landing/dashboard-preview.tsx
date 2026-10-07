import { cn } from "@/lib/utils"

// Illustrative product shot built from markup and SVG, so it stays crisp and
// adds no image weight. The figures are decorative sample data.
const kpis = [
  { label: "Revenue", value: "£84.2k", delta: "+12.4%" },
  { label: "New leads", value: "1,284", delta: "+8.1%" },
  { label: "Hours saved", value: "312", delta: "+21%" },
]

const series = [18, 24, 21, 30, 28, 36, 34, 42, 40, 51, 48, 58]

const channels = [
  { label: "Organic", share: 46 },
  { label: "Referral", share: 28 },
  { label: "Paid", share: 17 },
  { label: "Email", share: 9 },
]

function areaPath(values: number[], width: number, height: number) {
  const max = Math.max(...values) * 1.1
  const step = width / (values.length - 1)
  const points = values.map((v, i) => [i * step, height - (v / max) * height])
  const line = points.map(([x, y], i) => `${i ? "L" : "M"}${x},${y}`).join(" ")
  return { line, area: `${line} L${width},${height} L0,${height} Z` }
}

export function DashboardPreview({ className }: { className?: string }) {
  const { line, area } = areaPath(series, 400, 120)

  return (
    <div
      aria-hidden="true"
      className={cn(
        "rounded-xl border bg-background/80 p-4 shadow-2xl shadow-indigo-500/10 backdrop-blur",
        className
      )}
    >
      <div className="mb-4 flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        <span className="ml-3 text-xs text-muted-foreground">
          Revenue cockpit · Live
        </span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-lg border p-3">
            <p className="text-[11px] text-muted-foreground">{kpi.label}</p>
            <p className="mt-1 text-lg font-semibold tabular-nums">
              {kpi.value}
            </p>
            <p className="text-[11px] font-medium text-muted-foreground">
              <span className="text-emerald-600 dark:text-emerald-400">▲</span>{" "}
              {kpi.delta}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_160px]">
        <div className="rounded-lg border p-3">
          <p className="text-[11px] text-muted-foreground">
            Monthly recurring revenue
          </p>
          <svg viewBox="0 0 400 120" className="mt-2 h-28 w-full">
            <defs>
              <linearGradient id="mrr-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[30, 60, 90].map((y) => (
              <line
                key={y}
                x1="0"
                x2="400"
                y1={y}
                y2={y}
                className="stroke-border"
                strokeDasharray="2 4"
              />
            ))}
            <path d={area} fill="url(#mrr-fill)" />
            <path
              d={line}
              fill="none"
              stroke="#6366f1"
              strokeWidth="2"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
        <div className="hidden rounded-lg border p-3 sm:block">
          <p className="text-[11px] text-muted-foreground">Leads by channel</p>
          <ul className="mt-3 space-y-2.5">
            {channels.map((c) => (
              <li key={c.label}>
                <div className="flex justify-between text-[11px]">
                  <span>{c.label}</span>
                  <span className="tabular-nums text-muted-foreground">
                    {c.share}%
                  </span>
                </div>
                <div className="mt-1 h-1.5 rounded-full bg-muted">
                  <div
                    className="h-1.5 rounded-full bg-indigo-500"
                    style={{ width: `${c.share * 2}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

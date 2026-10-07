"use client"

import * as React from "react"

import { lerp, phase, useScrollProgress } from "./use-scroll-progress"

const SAMPLES = 160
const STEPS = ["Discover", "Design", "Build", "Launch"]
const NODE_X = [0.2, 0.4, 0.6, 0.8]

// Four shapes the line passes through as the page scrolls, each returning a
// vertical offset (-1 to 1) for a horizontal position x (0 to 1).
const shapes = {
  // Raw, messy data behind the hero.
  noise: (x: number) =>
    0.45 * Math.sin(x * 53 + 1) +
    0.3 * Math.sin(x * 97 + 2) +
    0.2 * Math.sin(x * 151 + 4),
  // A clean, rising chart behind services and work.
  chart: (x: number) => (0.5 - x) * 1.3 + 0.12 * Math.sin(x * 14),
  // A workflow connector stepping between the four process stages.
  flow: (x: number) => {
    const stage = Math.min(3, Math.floor(x / 0.2 - 0.5))
    const from = stage < 0 ? 0.5 : stage % 2 ? -0.35 : 0.35
    const to = stage + 1 > 3 ? 0 : (stage + 1) % 2 ? -0.35 : 0.35
    const local = x / 0.2 - 1 - stage
    return lerp(from, to, phase(local, 0.35, 0.65))
  },
  // Calm and steady, arriving at the contact form.
  calm: (x: number) => 0.05 * Math.sin(x * 4),
}

function shapeAt(p: number, x: number) {
  if (p < 0.3) return lerp(shapes.noise(x), shapes.chart(x), phase(p, 0, 0.3))
  if (p < 0.6) return lerp(shapes.chart(x), shapes.flow(x), phase(p, 0.3, 0.6))
  return lerp(shapes.flow(x), shapes.calm(x), phase(p, 0.6, 0.95))
}

export function SignalLine() {
  const svgRef = React.useRef<SVGSVGElement>(null)
  const trackRef = React.useRef<SVGPathElement>(null)
  const glowRef = React.useRef<SVGPathElement>(null)
  const litRef = React.useRef<SVGPathElement>(null)
  const haloRef = React.useRef<SVGCircleElement>(null)
  const headRef = React.useRef<SVGCircleElement>(null)
  const nodesRef = React.useRef<SVGGElement>(null)
  const endRef = React.useRef<SVGCircleElement>(null)

  useScrollProgress((p) => {
    const svg = svgRef.current
    if (!svg) return
    const width = window.innerWidth
    const height = window.innerHeight
    const mid = height * 0.7
    const amp = height * 0.14
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`)

    const point = (x: number) => [x * width, mid + shapeAt(p, x) * amp]
    const track: string[] = []
    const lit: string[] = []
    for (let i = 0; i <= SAMPLES; i++) {
      const x = i / SAMPLES
      const [px, py] = point(x)
      const cmd = `${i ? "L" : "M"}${px.toFixed(1)},${py.toFixed(1)}`
      track.push(cmd)
      if (x <= p + 0.0001) lit.push(cmd)
    }
    const [hx, hy] = point(Math.max(p, 0.002))
    lit.push(`L${hx.toFixed(1)},${hy.toFixed(1)}`)
    trackRef.current?.setAttribute("d", track.join(" "))
    for (const el of [glowRef.current, litRef.current]) {
      el?.setAttribute("d", lit.join(" "))
    }
    for (const el of [haloRef.current, headRef.current]) {
      el?.setAttribute("cx", String(hx))
      el?.setAttribute("cy", String(hy))
    }

    const showNodes = phase(p, 0.45, 0.58) * (1 - phase(p, 0.72, 0.85))
    nodesRef.current?.setAttribute("opacity", String(showNodes))
    nodesRef.current?.querySelectorAll("g").forEach((node, i) => {
      const [nx, ny] = point(NODE_X[i])
      node.setAttribute("transform", `translate(${nx},${ny})`)
    })

    const [ex, ey] = point(1)
    endRef.current?.setAttribute("cx", String(ex - 24))
    endRef.current?.setAttribute("cy", String(ey))
    endRef.current?.setAttribute("opacity", String(phase(p, 0.85, 1)))
  }, 1)

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-20 h-full w-full"
    >
      <defs>
        <linearGradient id="signal-stroke" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>
        <filter id="signal-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>
      <path
        ref={trackRef}
        fill="none"
        stroke="#818cf8"
        strokeOpacity="0.22"
        strokeWidth="1.5"
      />
      <path
        ref={glowRef}
        fill="none"
        stroke="url(#signal-stroke)"
        strokeOpacity="0.5"
        strokeWidth="8"
        filter="url(#signal-glow)"
      />
      <path
        ref={litRef}
        fill="none"
        stroke="url(#signal-stroke)"
        strokeOpacity="0.8"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <g ref={nodesRef} opacity="0">
        {STEPS.map((step) => (
          <g key={step}>
            <circle
              r="6"
              className="fill-background stroke-sky-400"
              strokeWidth="2"
            />
            <text
              y="-16"
              textAnchor="middle"
              className="fill-muted-foreground text-[11px] uppercase tracking-widest"
            >
              {step}
            </text>
          </g>
        ))}
      </g>
      <circle
        ref={endRef}
        r="14"
        fill="none"
        className="stroke-sky-400"
        strokeWidth="1.5"
        opacity="0"
      />
      <circle
        ref={haloRef}
        r="5"
        className="fill-sky-300"
        filter="url(#signal-glow)"
      />
      <circle ref={headRef} r="2.5" className="fill-white" />
    </svg>
  )
}

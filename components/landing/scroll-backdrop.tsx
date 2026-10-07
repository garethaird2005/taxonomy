"use client"

import * as React from "react"

type Point = [number, number]

const NODE_COUNT = 14

// Each section reshapes the same set of data points into a picture of what it
// is about: data becomes a live chart, then an automation network, a website
// layout, a project timeline, rising price tiers, and finally converges on
// the contact form. Coordinates are 0–1 fractions of the viewport.
const scenes: Record<string, { points: Point[]; glow: Point; hue: string }> = {
  top: {
    // Live chart: a rising, slightly noisy revenue line.
    points: Array.from({ length: NODE_COUNT }, (_, i) => [
      0.05 + (i / (NODE_COUNT - 1)) * 0.9,
      0.78 - (i / (NODE_COUNT - 1)) * 0.5 + (i % 3 === 1 ? 0.06 : 0),
    ]),
    glow: [0.7, 0.2],
    hue: "99 102 241",
  },
  services: {
    // Automation network: three connected clusters, one per service.
    points: Array.from({ length: NODE_COUNT }, (_, i) => {
      const cluster = Math.min(2, Math.floor(i / 5))
      const centres: Point[] = [
        [0.2, 0.3],
        [0.5, 0.72],
        [0.8, 0.3],
      ]
      const angle = (i % 5) * ((Math.PI * 2) / 5) + cluster
      return [
        centres[cluster][0] + Math.cos(angle) * 0.08,
        centres[cluster][1] + Math.sin(angle) * 0.12,
      ]
    }),
    glow: [0.5, 0.6],
    hue: "139 92 246",
  },
  work: {
    // Website wireframe: content blocks laid out on a grid.
    points: Array.from({ length: NODE_COUNT }, (_, i) => {
      const row = Math.floor(i / 4)
      const col = row % 2 ? 3 - (i % 4) : i % 4
      return [0.15 + col * 0.233, 0.18 + row * 0.22]
    }),
    glow: [0.25, 0.5],
    hue: "56 189 248",
  },
  process: {
    // Timeline: a steady path left to right with four beats.
    points: Array.from({ length: NODE_COUNT }, (_, i) => [
      0.05 + (i / (NODE_COUNT - 1)) * 0.9,
      0.5 + Math.sin((i / (NODE_COUNT - 1)) * Math.PI * 4) * 0.08,
    ]),
    glow: [0.5, 0.45],
    hue: "99 102 241",
  },
  pricing: {
    // Three tiers stepping upwards.
    points: Array.from({ length: NODE_COUNT }, (_, i) => {
      const tier = Math.min(2, Math.floor(i / 5))
      return [0.1 + (i / (NODE_COUNT - 1)) * 0.8, 0.75 - tier * 0.22]
    }),
    glow: [0.5, 0.35],
    hue: "139 92 246",
  },
  faq: {
    // A closed loop: every question has an answer.
    points: Array.from({ length: NODE_COUNT }, (_, i) => {
      const angle = (i / NODE_COUNT) * Math.PI * 2
      return [0.5 + Math.cos(angle) * 0.22, 0.5 + Math.sin(angle) * 0.3]
    }),
    glow: [0.5, 0.5],
    hue: "56 189 248",
  },
  contact: {
    // Everything converges on one point: your enquiry.
    points: Array.from({ length: NODE_COUNT }, (_, i) => {
      const t = i / (NODE_COUNT - 1)
      const angle = t * Math.PI * 3
      return [
        0.68 + Math.cos(angle) * 0.3 * (1 - t),
        0.5 + Math.sin(angle) * 0.35 * (1 - t),
      ]
    }),
    glow: [0.68, 0.5],
    hue: "99 102 241",
  },
}

function toPath(points: Point[], width: number, height: number) {
  return points
    .map(([x, y], i) => `${i ? "L" : "M"}${x * width},${y * height}`)
    .join(" ")
}

export function ScrollBackdrop() {
  const [scene, setScene] = React.useState("top")
  const pathRef = React.useRef<SVGPathElement>(null)
  const pulseRef = React.useRef<SVGCircleElement>(null)
  const nodeRefs = React.useRef<(SVGCircleElement | null)[]>([])
  const svgRef = React.useRef<SVGSVGElement>(null)
  const target = React.useRef<Point[]>(scenes.top.points)

  // Pick the scene of whichever section crosses the middle of the viewport.
  React.useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section[id]")
    ).filter((el) => el.id in scenes)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible) setScene(visible.target.id)
      },
      { rootMargin: "-45% 0px -45% 0px" }
    )
    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  React.useEffect(() => {
    target.current = scenes[scene].points
  }, [scene])

  // One animation loop eases the points towards the active scene and sends a
  // pulse along the line, like data moving through the system.
  React.useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    const current = target.current.map(([x, y]) => [x, y] as Point)
    let frame = 0
    const start = performance.now()

    function draw(now: number) {
      const svg = svgRef.current
      const path = pathRef.current
      if (!svg || !path) return
      const width = window.innerWidth
      const height = window.innerHeight
      svg.setAttribute("viewBox", `0 0 ${width} ${height}`)

      const ease = reduceMotion ? 1 : 0.06
      current.forEach((point, i) => {
        point[0] += (target.current[i][0] - point[0]) * ease
        point[1] += (target.current[i][1] - point[1]) * ease
        const node = nodeRefs.current[i]
        node?.setAttribute("cx", String(point[0] * width))
        node?.setAttribute("cy", String(point[1] * height))
      })
      path.setAttribute("d", toPath(current, width, height))

      const pulse = pulseRef.current
      if (pulse && !reduceMotion) {
        const length = path.getTotalLength()
        const progress = ((now - start) / 5000) % 1
        const { x, y } = path.getPointAtLength(progress * length)
        pulse.setAttribute("cx", String(x))
        pulse.setAttribute("cy", String(y))
      }

      frame = requestAnimationFrame(draw)
    }

    frame = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(frame)
  }, [])

  const { glow, hue } = scenes[scene]

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-20 overflow-hidden"
    >
      <div
        className="absolute h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-3xl transition-all duration-1000 ease-out motion-reduce:transition-none dark:opacity-30"
        style={{
          left: `${glow[0] * 100}%`,
          top: `${glow[1] * 100}%`,
          backgroundColor: `rgb(${hue})`,
        }}
      />
      <svg ref={svgRef} className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="backdrop-line" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>
        <path
          ref={pathRef}
          fill="none"
          stroke="url(#backdrop-line)"
          strokeWidth="1.5"
          strokeLinejoin="round"
          className="opacity-30 dark:opacity-40"
        />
        {Array.from({ length: NODE_COUNT }, (_, i) => (
          <circle
            key={i}
            ref={(el) => (nodeRefs.current[i] = el)}
            r="4"
            className="fill-indigo-500/50 dark:fill-indigo-400/60"
          />
        ))}
        <circle
          ref={pulseRef}
          r="5"
          className="fill-sky-400 opacity-80 motion-reduce:hidden"
          style={{ filter: "drop-shadow(0 0 6px rgb(56 189 248))" }}
        />
      </svg>
    </div>
  )
}

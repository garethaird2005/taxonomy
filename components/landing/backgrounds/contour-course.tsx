"use client"

import * as React from "react"

import { lerp, phase, useScrollProgress } from "./use-scroll-progress"

const LEVELS = 14
const CELL = 18
// The plotted course: start top-left, through three waypoints, to the
// destination beside the contact form. Fractions of the viewport.
const ROUTE: [number, number][] = [
  [0.06, 0.2],
  [0.3, 0.38],
  [0.22, 0.68],
  [0.55, 0.78],
  [0.74, 0.52],
]

// Height of the terrain at (x, y), measured in viewport heights. `calm` runs
// 0→1 down the page: tangled, choppy contours smooth out into wide even
// bands around a single peak at the destination.
function height(
  x: number,
  y: number,
  drift: number,
  calm: number,
  aspect: number
) {
  const yy = y + drift
  const base =
    Math.sin(x * 2.1 + yy * 1.3) * 0.6 + Math.cos(x * 1.2 - yy * 2.4) * 0.5
  const rough =
    Math.sin(x * 7.3 + yy * 5.1) * 0.35 +
    Math.sin(x * 11.7 - yy * 9.3 + 1.7) * 0.22 +
    Math.cos(x * 17.1 + yy * 13.9) * 0.12
  const dx = x - ROUTE[4][0] * aspect
  const dy = y - ROUTE[4][1]
  const peak = 1.6 * Math.exp(-(dx * dx + dy * dy) / 0.12)
  return base * (1 - calm * 0.6) + rough * (1 - calm) + peak * calm
}

export function ContourCourse() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  useScrollProgress((p) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return
    const width = window.innerWidth
    const h = window.innerHeight
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    if (canvas.width !== Math.round(width * dpr)) {
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(h * dpr)
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, width, h)

    // Sample the terrain on a coarse grid, then trace each contour level
    // with marching squares.
    const cols = Math.ceil(width / CELL) + 1
    const rows = Math.ceil(h / CELL) + 1
    const calm = phase(p, 0.05, 0.9)
    const drift = p * 1.2
    const grid = new Float32Array(cols * rows)
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        grid[j * cols + i] = height(
          (i * CELL) / h,
          (j * CELL) / h,
          drift,
          calm,
          width / h
        )
      }
    }

    for (let l = 0; l < LEVELS; l++) {
      const level = -1.4 + (l / (LEVELS - 1)) * 3
      ctx.beginPath()
      for (let j = 0; j < rows - 1; j++) {
        for (let i = 0; i < cols - 1; i++) {
          const a = grid[j * cols + i]
          const b = grid[j * cols + i + 1]
          const c = grid[(j + 1) * cols + i + 1]
          const d = grid[(j + 1) * cols + i]
          const pts: number[] = []
          const edge = (
            v1: number,
            v2: number,
            x1: number,
            y1: number,
            x2: number,
            y2: number
          ) => {
            if (v1 < level !== v2 < level) {
              const t = (level - v1) / (v2 - v1)
              pts.push(lerp(x1, x2, t) * CELL, lerp(y1, y2, t) * CELL)
            }
          }
          edge(a, b, i, j, i + 1, j)
          edge(b, c, i + 1, j, i + 1, j + 1)
          edge(d, c, i, j + 1, i + 1, j + 1)
          edge(a, d, i, j, i, j + 1)
          for (let k = 0; k + 3 < pts.length; k += 4) {
            ctx.moveTo(pts[k], pts[k + 1])
            ctx.lineTo(pts[k + 2], pts[k + 3])
          }
        }
      }
      ctx.strokeStyle =
        l % 4 === 0 ? "rgb(129 140 248 / 0.4)" : "rgb(129 140 248 / 0.2)"
      ctx.lineWidth = l % 4 === 0 ? 1.2 : 1
      ctx.stroke()
    }

    // The course plots itself as the visitor scrolls.
    const route = ROUTE.map(([x, y]) => [x * width, y * h] as const)
    const segments = route.length - 1
    const travelled = phase(p, 0.08, 0.95) * segments
    ctx.save()
    ctx.setLineDash([2, 7])
    ctx.lineCap = "round"
    ctx.strokeStyle = "rgb(186 230 253 / 0.8)"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(route[0][0], route[0][1])
    let head = route[0]
    for (let s = 0; s < segments && s < travelled; s++) {
      const t = Math.min(1, travelled - s)
      head = [
        lerp(route[s][0], route[s + 1][0], t),
        lerp(route[s][1], route[s + 1][1], t),
      ]
      ctx.lineTo(head[0], head[1])
    }
    ctx.stroke()
    ctx.restore()

    route.forEach(([x, y], i) => {
      if (i > travelled + 0.001) return
      const final = i === route.length - 1
      ctx.beginPath()
      ctx.arc(x, y, final ? 7 : 4, 0, Math.PI * 2)
      ctx.strokeStyle = "rgb(125 211 252 / 0.9)"
      ctx.lineWidth = 1.5
      ctx.stroke()
      if (final) {
        ctx.beginPath()
        ctx.arc(x, y, 18, 0, Math.PI * 2)
        ctx.strokeStyle = "rgb(125 211 252 / 0.35)"
        ctx.stroke()
      }
    })
    ctx.beginPath()
    ctx.arc(head[0], head[1], 3.5, 0, Math.PI * 2)
    ctx.fillStyle = "rgb(255 255 255 / 0.95)"
    ctx.shadowColor = "rgb(56 189 248)"
    ctx.shadowBlur = 12
    ctx.fill()
    ctx.shadowBlur = 0
  }, 0.5)

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-20 h-full w-full"
    />
  )
}

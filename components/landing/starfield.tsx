"use client"

import * as React from "react"

type Star = { x: number; y: number; r: number; a: number; color: string }

const STAR_COUNT = 2600
// Radians of clockwise rotation per pixel scrolled.
const TURN_PER_PX = 0.00022
const BAND_ANGLE = -0.45
const COLORS = ["255 255 255", "191 219 254", "254 243 199", "221 214 254"]

// Small seeded PRNG so the sky is identical on every visit.
function random(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }
}

function gaussian(rand: () => number) {
  return (
    Math.sqrt(-2 * Math.log(rand() || 1e-9)) * Math.cos(2 * Math.PI * rand())
  )
}

// Stars live on a unit disc: 70% crowd into a Milky Way band through the
// centre, the rest are scattered across the whole sky.
function createStars(): Star[] {
  const rand = random(42)
  return Array.from({ length: STAR_COUNT }, (_, i) => {
    let x: number
    let y: number
    if (i % 10 < 7) {
      const along = rand() * 2 - 1
      const across = gaussian(rand) * 0.09 * (1 - Math.abs(along) * 0.4)
      x = along * Math.cos(BAND_ANGLE) - across * Math.sin(BAND_ANGLE)
      y = along * Math.sin(BAND_ANGLE) + across * Math.cos(BAND_ANGLE)
    } else {
      const angle = rand() * Math.PI * 2
      const radius = Math.sqrt(rand())
      x = Math.cos(angle) * radius
      y = Math.sin(angle) * radius
    }
    const bright = rand() > 0.97
    return {
      x,
      y,
      r: bright ? 1.1 + rand() * 0.8 : 0.4 + rand() * 0.6,
      a: bright ? 0.9 : 0.25 + rand() * 0.55,
      color: COLORS[Math.floor(rand() * COLORS.length)],
    }
  })
}

// The soft glow of the galactic band, painted once at low resolution.
function createNebula() {
  const size = 256
  const canvas = document.createElement("canvas")
  canvas.width = canvas.height = size
  const ctx = canvas.getContext("2d")
  if (!ctx) return canvas
  const rand = random(7)
  ctx.translate(size / 2, size / 2)
  ctx.rotate(BAND_ANGLE)
  for (let i = 0; i < 40; i++) {
    const x = (rand() * 2 - 1) * size * 0.45
    const y = gaussian(rand) * size * 0.03
    const radius = size * (0.05 + rand() * 0.08)
    const hue = rand() > 0.5 ? "129 140 248" : "167 139 250"
    const glow = ctx.createRadialGradient(x, y, 0, x, y, radius)
    glow.addColorStop(0, `rgb(${hue} / 0.18)`)
    glow.addColorStop(1, `rgb(${hue} / 0)`)
    ctx.fillStyle = glow
    ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2)
  }
  return canvas
}

export function Starfield() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const stars = createStars()
    const nebula = createNebula()
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    let angle = reduceMotion ? 0 : window.scrollY * TURN_PER_PX
    let frame = 0

    function draw() {
      if (!canvas || !ctx) return
      const width = window.innerWidth
      const height = window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr
        canvas.height = height * dpr
      }
      // Radius of the sky disc: large enough that rotation never shows an edge.
      const radius = Math.hypot(width, height) / 2

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, height)
      ctx.translate(width / 2, height / 2)
      ctx.rotate(angle)
      ctx.drawImage(nebula, -radius, -radius, radius * 2, radius * 2)
      for (const star of stars) {
        ctx.fillStyle = `rgb(${star.color} / ${star.a})`
        ctx.beginPath()
        ctx.arc(star.x * radius, star.y * radius, star.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Ease towards the scroll position so the sky keeps turning briefly
    // after the visitor stops, like a slow, heavy wheel.
    function tick() {
      const target = window.scrollY * TURN_PER_PX
      const delta = target - angle
      angle = Math.abs(delta) < 0.0001 ? target : angle + delta * 0.08
      draw()
      frame = angle === target ? 0 : requestAnimationFrame(tick)
    }

    function onScroll() {
      if (!reduceMotion && !frame) frame = requestAnimationFrame(tick)
    }

    draw()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", draw)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", draw)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-20 h-full w-full"
    />
  )
}

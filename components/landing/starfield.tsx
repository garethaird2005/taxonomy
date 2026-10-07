"use client"

import * as React from "react"

type Star = { x: number; y: number; r: number; fill: string; glow: number }

type Sky = {
  pole: { x: number; y: number }
  radius: number
  stars: Star[]
  haze: HTMLCanvasElement
}

// Radians of clockwise rotation per pixel scrolled.
const TURN_PER_PX = 0.00015
// The band's tilt before any scrolling.
const BAND_ANGLE = -0.5
// Stars per square pixel outside the band.
const FIELD_DENSITY = 0.0007
const BAND_STARS = 6000
// Real star colours, from hot blue-white through to cool orange, weighted
// towards white.
const STAR_COLORS = [
  "255 255 255",
  "255 255 255",
  "248 247 255",
  "202 215 255",
  "255 244 234",
  "255 210 161",
]

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

function createStar(rand: () => number, x: number, y: number): Star {
  // Most stars are faint; only a handful are bright enough to glow.
  const magnitude = Math.pow(rand(), 3)
  const color = STAR_COLORS[Math.floor(rand() * STAR_COLORS.length)]
  return {
    x,
    y,
    r: 0.35 + magnitude * 0.9,
    fill: `rgb(${color} / ${(0.25 + magnitude * 0.75).toFixed(2)})`,
    glow: magnitude > 0.85 ? magnitude : 0,
  }
}

// Builds the sky around a celestial pole above the viewport, so scrolling
// turns the Milky Way in a wide arc across the screen, as the real one moves
// across the night. Coordinates are pixels relative to the pole.
function createSky(width: number, height: number): Sky {
  const rand = random(42)
  const pole = { x: width * 0.5, y: -height * 0.3 }
  const radius = Math.hypot(width * 0.5, height - pole.y) + 40
  const diag = Math.hypot(width, height)

  // The band is thickest at its core and tapers towards both ends.
  const core = { x: width * 0.1, y: height * 0.78 - pole.y }
  const dir = { x: Math.cos(BAND_ANGLE), y: Math.sin(BAND_ANGLE) }
  const midWidth = diag * 0.0675
  const endWidth = diag * 0.02
  const taper = diag * 0.35
  const widthAt = (along: number) =>
    endWidth + (midWidth - endWidth) * Math.exp(-((along / taper) ** 2))
  const bandPoint = (along: number, across: number) => ({
    x: core.x + dir.x * along - dir.y * across,
    y: core.y + dir.y * along + dir.x * across,
  })

  const stars: Star[] = []
  const fieldCount = Math.round(Math.PI * radius * radius * FIELD_DENSITY)
  for (let i = 0; i < fieldCount; i++) {
    const angle = rand() * Math.PI * 2
    const dist = Math.sqrt(rand()) * radius
    stars.push(createStar(rand, Math.cos(angle) * dist, Math.sin(angle) * dist))
  }
  // Rejection sampling keeps the band's star density even as it widens.
  for (let placed = 0; placed < BAND_STARS; ) {
    const along = (rand() * 2 - 1) * radius * 1.4
    if (rand() > widthAt(along) / midWidth) continue
    const p = bandPoint(along, gaussian(rand) * widthAt(along))
    const star = createStar(rand, p.x, p.y)
    star.r *= 0.8
    stars.push(star)
    placed++
  }

  // The unresolved glow of the galaxy, with darker dust lanes along its
  // spine, painted once at low resolution and stretched over the sky.
  const size = 640
  const scale = size / (radius * 2)
  const haze = document.createElement("canvas")
  haze.width = haze.height = size
  const ctx = haze.getContext("2d")
  if (ctx) {
    const blob = (x: number, y: number, r: number, color: string) => {
      const cx = (x + radius) * scale
      const cy = (y + radius) * scale
      const cr = Math.max(r * scale, 1)
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr)
      g.addColorStop(0, color)
      g.addColorStop(1, "rgb(0 0 0 / 0)")
      ctx.fillStyle = g
      ctx.fillRect(cx - cr, cy - cr, cr * 2, cr * 2)
    }
    for (let i = 0; i < 1200; i++) {
      const along = (rand() * 2 - 1) * radius * 1.4
      const w = widthAt(along)
      const p = bandPoint(along, gaussian(rand) * w * 0.7)
      const nearCore = Math.exp(-((along / taper) ** 2))
      const tone = rand() < nearCore ? "255 232 204" : "220 228 240"
      blob(p.x, p.y, w * (0.6 + rand() * 0.8), `rgb(${tone} / 0.065)`)
    }
    ctx.globalCompositeOperation = "destination-out"
    for (let i = 0; i < 260; i++) {
      const along = (rand() * 2 - 1) * radius * 1.2
      const w = widthAt(along)
      const p = bandPoint(along, w * (0.1 + gaussian(rand) * 0.18))
      blob(p.x, p.y, w * (0.15 + rand() * 0.3), "rgb(0 0 0 / 0.35)")
    }
  }

  return { pole, radius, stars, haze }
}

export function Starfield() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    let skyWidth = window.innerWidth
    let sky = createSky(skyWidth, window.innerHeight)
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
      const { pole, radius, stars, haze } = sky
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, height)
      ctx.save()
      ctx.translate(pole.x, pole.y)
      ctx.rotate(angle)
      ctx.drawImage(haze, -radius, -radius, radius * 2, radius * 2)
      ctx.restore()

      for (const star of stars) {
        const x = pole.x + star.x * cos - star.y * sin
        const y = pole.y + star.x * sin + star.y * cos
        if (x < -4 || y < -4 || x > width + 4 || y > height + 4) continue
        ctx.fillStyle = star.fill
        ctx.beginPath()
        ctx.arc(x, y, star.r, 0, Math.PI * 2)
        ctx.fill()
        if (star.glow) {
          ctx.globalAlpha = star.glow * 0.15
          ctx.beginPath()
          ctx.arc(x, y, star.r * 3, 0, Math.PI * 2)
          ctx.fill()
          ctx.globalAlpha = 1
        }
      }
    }

    // Ease towards the scroll position so the sky glides on briefly after
    // the visitor stops, rather than jumping with every wheel tick.
    function tick() {
      const target = window.scrollY * TURN_PER_PX
      const delta = target - angle
      angle = Math.abs(delta) < 0.00005 ? target : angle + delta * 0.05
      draw()
      frame = angle === target ? 0 : requestAnimationFrame(tick)
    }

    function onScroll() {
      if (!reduceMotion && !frame) frame = requestAnimationFrame(tick)
    }

    // Mobile browsers resize the height as their toolbars hide, so only a
    // width change rebuilds the sky.
    function onResize() {
      if (window.innerWidth !== skyWidth) {
        skyWidth = window.innerWidth
        sky = createSky(skyWidth, window.innerHeight)
      }
      draw()
    }

    draw()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
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

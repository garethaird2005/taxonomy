"use client"

import * as React from "react"

import {
  paintRidge,
  random,
  type RidgeLayer,
} from "@/components/landing/dither"

// Size of one art pixel in CSS pixels: chunky enough to read as dithering,
// fine enough to stay quiet behind the content.
const PIXEL = 3

// Far to near: each range darker than the last, with light from the horizon
// catching its ridge line. `depth` is how far each range sinks over the whole
// page, in viewport heights (vh), so nearer ranges move more.
const ridges: (RidgeLayer & { depth: number })[] = [
  {
    seed: 11,
    base: 0.4,
    amp: 0.34,
    freq: 6,
    tone: 2.7,
    rim: 2,
    falloff: 8,
    shade: 0.6,
    depth: 10,
  },
  {
    seed: 29,
    base: 0.56,
    amp: 0.3,
    freq: 4.4,
    tone: 1.9,
    rim: 2,
    falloff: 6,
    shade: 0.6,
    depth: 18,
  },
  {
    seed: 47,
    base: 0.72,
    amp: 0.24,
    freq: 3.2,
    tone: 1.2,
    rim: 2,
    falloff: 5,
    shade: 0.5,
    depth: 28,
  },
  {
    seed: 83,
    base: 0.88,
    amp: 0.18,
    freq: 2.3,
    tone: 0.5,
    rim: 1.9,
    falloff: 4,
    shade: 0.4,
    depth: 40,
  },
]

// A fixed, seeded star field, so server and client render the same markup.
const stars = (() => {
  const rand = random(5)
  return Array.from({ length: 110 }, () => {
    const size = rand()
    return {
      x: rand() * 100,
      y: Math.pow(rand(), 1.3) * 55,
      r: size > 0.96 ? 1.2 : size > 0.8 ? 0.85 : 0.55,
      opacity: 0.2 + rand() * 0.6,
    }
  })
})()

/**
 * The night landscape behind the whole site. It never scrolls away: as the
 * page moves, the mountains sink, the stars fade and first light rises on the
 * horizon, while Polaris holds its place. Scroll effects drive `--sink`
 * (0 at the top of the page, 1 at the bottom).
 */
export function Backdrop() {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const ridgeRefs = React.useRef<(HTMLCanvasElement | null)[]>([])

  React.useEffect(() => {
    let painted = { width: 0, height: 0 }
    let timer: number | undefined

    function paint() {
      const width = window.innerWidth
      const height = window.innerHeight
      // Mobile browser bars resize the viewport while scrolling. Only
      // repaint when the size really changes.
      if (
        Math.abs(width - painted.width) < 2 &&
        Math.abs(height - painted.height) < 160
      ) {
        return
      }
      painted = { width, height }

      ridgeRefs.current.forEach((canvas, i) => {
        if (!canvas) return
        const w = Math.ceil(canvas.clientWidth / PIXEL)
        const h = Math.ceil(canvas.clientHeight / PIXEL)
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext("2d")
        if (ctx) ctx.putImageData(paintRidge(ctx, w, h, ridges[i]), 0, 0)
      })
      rootRef.current?.setAttribute("data-painted", "")
    }

    function onResize() {
      window.clearTimeout(timer)
      timer = window.setTimeout(paint, 150)
    }

    paint()
    window.addEventListener("resize", onResize)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return (
    <div
      ref={rootRef}
      data-backdrop
      aria-hidden="true"
      className="group pointer-events-none fixed inset-x-0 top-0 -z-10 h-screen overflow-hidden bg-ink supports-[height:100lvh]:h-[100lvh]"
    >
      {/* Night sky, brightest just above the far range */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#04090F_0%,#061127_34%,#0D2350_54%,#183880_68%,#183880_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(55%_30%_at_62%_62%,rgba(64,104,214,0.32),transparent_70%)]" />

      {/* First light, rising as the page is read */}
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,transparent_16%,rgba(42,80,216,0.3)_42%,rgba(169,194,255,0.42)_58%,rgba(242,240,235,0.34)_72%)]"
        style={{ opacity: "var(--sink, 0)" }}
      />

      {/* Stars, fading towards dawn */}
      <svg
        className="absolute inset-0 h-full w-full"
        style={{ opacity: "calc(1 - var(--sink, 0) * 0.75)" }}
      >
        {stars.map((star, i) => (
          <circle
            key={i}
            cx={`${star.x}%`}
            cy={`${star.y}%`}
            r={star.r}
            fill="#DCE5FF"
            opacity={star.opacity}
          />
        ))}
      </svg>

      {/* Polaris holds its place while everything else moves */}
      <div className="absolute right-[16%] top-[15%] md:right-[21%] md:top-[19%]">
        <div className="relative -translate-y-1/2 translate-x-1/2">
          <span className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(169,194,255,0.26),transparent_62%)]" />
          <svg
            viewBox="-50 -50 100 100"
            className="relative h-12 w-12 animate-twinkle text-[#EEF2FF] motion-reduce:animate-none md:h-16 md:w-16"
          >
            <path
              d="M0-50Q2.2-2.2 50 0Q2.2 2.2 0 50Q-2.2 2.2-50 0Q-2.2-2.2 0-50Z"
              fill="currentColor"
            />
            <path
              d="M0-20Q1-1 20 0Q1 1 0 20Q-1 1-20 0Q-1-1 0-20Z"
              fill="currentColor"
              opacity="0.5"
              transform="rotate(45)"
            />
            <circle r="3.4" fill="#fff" />
          </svg>
        </div>
        {/* The label shows only at the very top and bottom of the page. */}
        <div
          className="absolute left-10 top-7 hidden items-center gap-3 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.22em] text-sky/50 md:flex"
          style={{
            opacity:
              "max(0, 1 - var(--sink, 0) * 25, (var(--sink, 0) - 0.96) * 25)",
          }}
        >
          <span className="h-px w-10 bg-sky/30" />
          Polaris &middot; North star
        </div>
      </div>

      {/* Mountain ranges, far to near */}
      <div className="absolute inset-x-0 bottom-0 h-[52%] opacity-0 transition-opacity ease-smooth [transition-duration:1600ms] group-data-[painted]:opacity-100">
        {ridges.map((ridge, i) => (
          <canvas
            key={ridge.seed}
            ref={(el) => (ridgeRefs.current[i] = el)}
            data-depth
            className="pixelated absolute inset-0 h-full w-full will-change-transform"
            style={{
              transform: `translate3d(0, calc(var(--sink, 0) * ${ridge.depth}vh), 0)`,
            }}
          />
        ))}
      </div>

      <div className="grain absolute inset-0 opacity-[0.06]" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_35%,transparent_55%,rgba(3,7,15,0.6)_100%)]" />
    </div>
  )
}

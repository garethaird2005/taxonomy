"use client"

import * as React from "react"

import { lerp, phase, useScrollProgress } from "./use-scroll-progress"

// A light source sits just above the screen, the North Star implied but never
// drawn. As the page scrolls its beam narrows from a wide haze, swings like a
// sundial through the sections, and focuses to a point beside the contact
// form: from searching to certain.
export function FixedLight() {
  const beamRef = React.useRef<HTMLDivElement>(null)
  const focusRef = React.useRef<HTMLDivElement>(null)

  useScrollProgress((p) => {
    const beam = beamRef.current
    const focus = focusRef.current
    if (!beam || !focus) return
    const spread = lerp(70, 7, phase(p, 0, 0.9))
    // Swing left, back through centre, then settle pointing at the form.
    const aim =
      lerp(18, -14, phase(p, 0, 0.45)) + lerp(0, -12, phase(p, 0.45, 0.9))
    const haze = lerp(0.38, 0.1, phase(p, 0, 0.8))
    const glow = lerp(0.14, 0.45, phase(p, 0.2, 0.9))

    beam.style.background = [
      `conic-gradient(from ${180 + aim - spread / 2}deg at 50% -12%,
        rgb(199 210 254 / 0) 0deg,
        rgb(199 210 254 / ${glow}) ${spread / 2}deg,
        rgb(199 210 254 / 0) ${spread}deg,
        rgb(199 210 254 / 0) 360deg)`,
      `conic-gradient(from ${180 + aim - spread}deg at 50% -12%,
        rgb(199 210 254 / 0) 0deg,
        rgb(199 210 254 / ${glow * 0.35}) ${spread}deg,
        rgb(199 210 254 / 0) ${spread * 2}deg,
        rgb(199 210 254 / 0) 360deg)`,
      `radial-gradient(ellipse 70% 55% at 50% -12%, rgb(165 180 252 / ${haze}), transparent 70%)`,
    ].join(",")

    const end = phase(p, 0.82, 1)
    // The beam's centre line points down, turned by `aim` degrees.
    const angle = (aim * Math.PI) / 180
    const reach = window.innerHeight * 0.75
    focus.style.left = `calc(50% + ${-Math.sin(angle) * reach}px)`
    focus.style.top = `calc(-12vh + ${Math.cos(angle) * reach}px)`
    focus.style.opacity = String(end)
  }, 0.5)

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-20 overflow-hidden"
    >
      <div
        ref={beamRef}
        className="absolute inset-0 [mask-image:radial-gradient(ellipse_120%_100%_at_50%_0%,black_35%,transparent_85%)]"
      />
      <div
        ref={focusRef}
        className="absolute h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0"
        style={{
          background:
            "radial-gradient(circle, rgb(224 231 255 / 0.9) 0, rgb(165 180 252 / 0.35) 6%, transparent 60%)",
        }}
      />
    </div>
  )
}

"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { paintRidge, paintSky, random } from "@/components/landing/dither"

const PIXEL = 3

// Far to near: each range darker, with a brighter rim of light.
const ranges = [
  {
    base: 0.62,
    amp: 0.3,
    freq: 2.6,
    tone: 2.6,
    rim: 2,
    falloff: 6,
    shade: 0.5,
  },
  {
    base: 0.76,
    amp: 0.26,
    freq: 2,
    tone: 1.6,
    rim: 1.8,
    falloff: 5,
    shade: 0.5,
  },
  {
    base: 0.9,
    amp: 0.2,
    freq: 1.6,
    tone: 0.6,
    rim: 1.6,
    falloff: 4,
    shade: 0.4,
  },
]

interface DitherArtProps extends React.HTMLAttributes<HTMLCanvasElement> {
  seed: number
}

/** A small dithered landscape, generated from a seed to fit its box. */
export function DitherArt({ seed, className, ...props }: DitherArtProps) {
  const ref = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    let painted = ""

    function paint() {
      if (!canvas) return
      const width = Math.max(1, Math.ceil(canvas.clientWidth / PIXEL))
      const height = Math.max(1, Math.ceil(canvas.clientHeight / PIXEL))
      if (`${width}x${height}` === painted) return
      painted = `${width}x${height}`
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const rand = random(seed)
      const image = paintSky(ctx, width, height, {
        top: 0.6,
        bottom: 3.4,
        glow: [0.2 + rand() * 0.6, 0.55],
        glowTone: 2.6,
        spread: 0.05,
      })
      ranges.forEach((range, i) =>
        paintRidge(ctx, width, height, { seed: seed * 13 + i, ...range }, image)
      )
      ctx.putImageData(image, 0, 0)
    }

    paint()
    const observer = new ResizeObserver(paint)
    observer.observe(canvas)
    return () => observer.disconnect()
  }, [seed])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={cn("pixelated block h-full w-full", className)}
      {...props}
    />
  )
}

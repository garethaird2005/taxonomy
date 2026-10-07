"use client"

import * as React from "react"

// Calls `onProgress` with page scroll progress from 0 (top) to 1 (bottom),
// eased so motion glides instead of stepping with each wheel tick. Visitors
// who prefer reduced motion get one still frame at `stillAt`.
export function useScrollProgress(
  onProgress: (progress: number) => void,
  stillAt = 0.5
) {
  const callback = React.useRef(onProgress)
  callback.current = onProgress

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      callback.current(stillAt)
      const redraw = () => callback.current(stillAt)
      window.addEventListener("resize", redraw)
      return () => window.removeEventListener("resize", redraw)
    }

    const target = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      return max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
    }
    let current = target()
    let frame = 0

    function tick() {
      const goal = target()
      current += (goal - current) * 0.12
      if (Math.abs(goal - current) < 0.0005) current = goal
      callback.current(current)
      frame = current === goal ? 0 : requestAnimationFrame(tick)
    }
    function wake() {
      if (!frame) frame = requestAnimationFrame(tick)
    }

    callback.current(current)
    window.addEventListener("scroll", wake, { passive: true })
    window.addEventListener("resize", wake)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", wake)
      window.removeEventListener("resize", wake)
    }
  }, [stillAt])
}

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t

// 0→1 as `p` moves from `start` to `end`, smoothed at both ends.
export function phase(p: number, start: number, end: number) {
  const t = Math.min(1, Math.max(0, (p - start) / (end - start)))
  return t * t * (3 - 2 * t)
}

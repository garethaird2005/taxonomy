"use client"

import * as React from "react"
import { usePathname } from "next/navigation"

const clamp = (value: number) => Math.min(1, Math.max(0, value))

/**
 * One place for every scroll-linked effect, so they share a single frame
 * loop and the same timing:
 * - `data-reveal` elements get `data-revealed` once they enter the viewport.
 * - `[data-backdrop]` gets `--sink`, the page's scroll progress (0–1).
 * - `[data-sheet]` gets `--enter` as it rises into view.
 * - `[data-scroll-progress]` gets `--progress` as it passes through view.
 * - `[data-site-header]` gets `data-tone` from the `data-surface` section
 *   beneath it ("top" while the page is at rest).
 */
export function ScrollEffects() {
  const pathname = usePathname()

  React.useEffect(() => {
    const root = document.documentElement
    const elements = document.querySelectorAll<HTMLElement>(
      "[data-reveal]:not([data-revealed])"
    )
    root.setAttribute("data-reveal-ready", "")

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.setAttribute("data-revealed", ""))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.setAttribute("data-revealed", "")
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [pathname])

  React.useEffect(() => {
    const backdrop = document.querySelector<HTMLElement>("[data-backdrop]")
    const header = document.querySelector<HTMLElement>("[data-site-header]")
    const surfaces = Array.from(
      document.querySelectorAll<HTMLElement>("[data-surface]")
    )
    const sheets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-sheet]")
    )
    const tracks = Array.from(
      document.querySelectorAll<HTMLElement>("[data-scroll-progress]")
    )
    let frame = 0

    function update() {
      frame = 0
      const viewport = window.innerHeight
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - viewport

      backdrop?.style.setProperty(
        "--sink",
        (max > 0 ? clamp(y / max) : 0).toFixed(4)
      )

      for (const sheet of sheets) {
        const { top } = sheet.getBoundingClientRect()
        sheet.style.setProperty(
          "--enter",
          clamp((viewport - top) / (viewport * 0.55)).toFixed(4)
        )
      }

      for (const track of tracks) {
        const { top, height } = track.getBoundingClientRect()
        track.style.setProperty(
          "--progress",
          clamp((viewport * 0.85 - top) / (height + viewport * 0.3)).toFixed(4)
        )
      }

      if (header) {
        // Sample the section under the middle of the navigation pill.
        const probe = header.getBoundingClientRect().bottom - 28
        let surface = "night"
        for (const element of surfaces) {
          const { top, bottom } = element.getBoundingClientRect()
          if (top <= probe && bottom >= probe) {
            surface = element.dataset.surface ?? surface
          }
        }
        header.dataset.tone =
          surface === "paper" ? "paper" : y > 8 ? "night" : "top"
      }
    }

    function schedule() {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
    }
  }, [pathname])

  return null
}

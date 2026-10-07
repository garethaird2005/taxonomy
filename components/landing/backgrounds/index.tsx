"use client"

import * as React from "react"

import { ContourCourse } from "./contour-course"
import { FixedLight } from "./fixed-light"
import { SignalLine } from "./signal-line"

const backgrounds = {
  signal: SignalLine,
  contour: ContourCourse,
  light: FixedLight,
}

type BackgroundName = keyof typeof backgrounds

// Preview switch while the final background is chosen: add ?bg=signal,
// ?bg=contour or ?bg=light to any page URL.
export function SiteBackground() {
  const [name, setName] = React.useState<BackgroundName>("signal")

  React.useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("bg")
    if (requested && requested in backgrounds) {
      setName(requested as BackgroundName)
    }
  }, [])

  const Background = backgrounds[name]
  return <Background key={name} />
}

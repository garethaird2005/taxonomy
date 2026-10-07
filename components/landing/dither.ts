// Ordered-dither renderer for the site's landscape artwork. Everything is
// generated from seeds at runtime, so the art is crisp at any size and adds
// no image weight.
//
// Each pixel gets a continuous tone, measured in steps along a palette, and
// an 8×8 Bayer matrix decides whether it rounds down or up. Neighbouring
// palette colours are close, so the pattern reads as fine print texture
// rather than noise.

export type Rgb = [number, number, number]

// Night palette, darkest to lightest.
export const NIGHT: Rgb[] = [
  [5, 11, 22],
  [8, 19, 41],
  [11, 27, 58],
  [16, 38, 79],
  [23, 52, 103],
  [34, 70, 135],
  [54, 94, 172],
  [96, 130, 208],
  [150, 175, 232],
]

const BAYER = [
  0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26, 12, 44, 4, 36,
  14, 46, 6, 38, 60, 28, 52, 20, 62, 30, 54, 22, 3, 35, 11, 43, 1, 33, 9, 41,
  51, 19, 59, 27, 49, 17, 57, 25, 15, 47, 7, 39, 13, 45, 5, 37, 63, 31, 55,
  23, 61, 29, 53, 21,
].map((v) => (v + 0.5) / 64)

export function random(seed: number) {
  let t = seed >>> 0
  return () => {
    t += 0x6d2b79f5
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r)
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

function valueNoise(seed: number) {
  const rand = random(seed)
  const values = Float32Array.from({ length: 256 }, rand)
  return (x: number) => {
    const i = Math.floor(x)
    const f = x - i
    const a = values[i & 255]
    const b = values[(i + 1) & 255]
    return a + (b - a) * f * f * (3 - 2 * f)
  }
}

// Writes the palette colour for tone `tone` at pixel (x, y).
function plot(
  data: Uint8ClampedArray,
  palette: Rgb[],
  x: number,
  y: number,
  width: number,
  tone: number
) {
  const threshold = BAYER[((y & 7) << 3) | (x & 7)]
  const level = Math.min(
    palette.length - 1,
    Math.max(0, Math.floor(tone + threshold))
  )
  const c = palette[level]
  const i = (y * width + x) << 2
  data[i] = c[0]
  data[i + 1] = c[1]
  data[i + 2] = c[2]
  data[i + 3] = 255
}

export type RidgeLayer = {
  seed: number
  // Ridge baseline and peak height, as fractions of the canvas height.
  base: number
  amp: number
  // Roughly how many peaks fit across the canvas.
  freq: number
  // Tone of the mountain face, in palette steps.
  tone: number
  // Extra tone where light from behind catches the ridge line, and how many
  // pixels it takes to fade.
  rim: number
  falloff: number
  // Tone lost from the top of the canvas to the bottom.
  shade: number
}

// Height of the ridge line (fraction of canvas height) for every column.
function ridgeProfile(layer: RidgeLayer, width: number) {
  const n1 = valueNoise(layer.seed)
  const n2 = valueNoise(layer.seed + 101)
  const n3 = valueNoise(layer.seed + 202)
  const crease = (v: number) => 1 - Math.abs(v * 2 - 1)
  const profile = new Float32Array(width)
  for (let x = 0; x < width; x++) {
    const u = (x / width) * layer.freq
    const h =
      crease(n1(u)) * 0.6 +
      crease(n2(u * 2.3 + 3.1)) * 0.28 +
      n3(u * 5.7) * 0.12
    profile[x] = layer.base - layer.amp * h
  }
  return profile
}

export function paintRidge(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  layer: RidgeLayer,
  image = ctx.createImageData(width, height),
  palette = NIGHT
) {
  const profile = ridgeProfile(layer, width)
  for (let x = 0; x < width; x++) {
    const top = Math.max(0, Math.floor(profile[x] * height))
    const prev = profile[Math.max(0, x - 1)]
    const next = profile[Math.min(width - 1, x + 1)]
    // Steep faces catch less of the light from behind the range.
    const catchLight = 1 - Math.min(0.6, Math.abs(next - prev) * height * 0.25)
    for (let y = top; y < height; y++) {
      const tone =
        layer.tone +
        layer.rim * catchLight * Math.exp(-(y - top) / layer.falloff) -
        layer.shade * (y / height)
      plot(image.data, palette, x, y, width, tone)
    }
  }
  return image
}

// A dithered sky: a vertical gradient between two tones, plus a soft glow.
export function paintSky(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  options: {
    top: number
    bottom: number
    // Centre of the glow, as fractions of the canvas, and its strength.
    glow: [number, number]
    glowTone: number
    spread?: number
  },
  palette = NIGHT
) {
  const { top, bottom, glowTone, spread = 0.06 } = options
  const [gx, gy] = options.glow
  const image = ctx.createImageData(width, height)
  for (let y = 0; y < height; y++) {
    const fromTop = y / height
    const base = top + (bottom - top) * Math.pow(fromTop, 1.5)
    for (let x = 0; x < width; x++) {
      const dx = x / width - gx
      const dy = (fromTop - gy) * 1.6
      const glow = glowTone * Math.exp(-(dx * dx + dy * dy) / spread)
      plot(image.data, palette, x, y, width, base + glow)
    }
  }
  return image
}

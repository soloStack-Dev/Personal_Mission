/**
 * Generates monochrome PNG icons (black bg + white lightning bolt)
 * to match the site's theme. Pure Node — uses only zlib, no dependencies.
 *
 * Usage:  node scripts/make-icons.mjs
 * Output: public/apple-touch-icon.png (180x180)
 *         public/favicon-32x32.png, public/favicon-16x16.png
 */
import { deflateSync } from 'node:zlib'
import { writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '..', 'public')

/* ---------- PNG encoding helpers ---------- */

// CRC32 (IEEE) lookup table
const CRC_TABLE = (() => {
  const table = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    table[n] = c >>> 0
  }
  return table
})()

function crc32(buf) {
  let crc = 0xffffffff
  for (let i = 0; i < buf.length; i++) crc = CRC_TABLE[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8)
  return (crc ^ 0xffffffff) >>> 0
}

/** One PNG chunk: length + type + data + crc. */
function chunk(type, data) {
  const length = Buffer.alloc(4)
  length.writeUInt32BE(data.length)
  const typeBuf = Buffer.from(type, 'ascii')
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])))
  return Buffer.concat([length, typeBuf, data, crc])
}

/**
 * Build a full RGBA PNG from raw pixel data (rows of [r,g,b,a]).
 */
function encodePng(width, height, rgba) {
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])

  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8 // bit depth
  ihdr[9] = 6 // color type RGBA
  ihdr[10] = 0
  ihdr[11] = 0
  ihdr[12] = 0

  // Each scanline is prefixed with a filter byte (0 = none)
  const raw = Buffer.alloc((width * 4 + 1) * height)
  for (let y = 0; y < height; y++) {
    raw[y * (width * 4 + 1)] = 0
    rgba.copy(raw, y * (width * 4 + 1) + 1, y * width * 4, (y + 1) * width * 4)
  }
  const idat = deflateSync(raw)

  return Buffer.concat([signature, chunk('IHDR', ihdr), chunk('IDAT', idat), chunk('IEND', Buffer.alloc(0))])
}

/* ---------- Icon drawing ---------- */

/**
 * Lightning bolt as a polygon (defined on a 180x180 canvas).
 * Even-odd rule is used to decide which pixels are inside the bolt.
 */
const BOLT_180 = [
  [120, 16],
  [54, 104],
  [92, 104],
  [60, 164],
  [128, 76],
  [88, 76],
  [126, 16],
]

/** Is (px, py) inside the polygon? (ray casting / even-odd) */
function insidePolygon(px, py, poly) {
  let inside = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i]
    const [xj, yj] = poly[j]
    const intersect =
      yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi
    if (intersect) inside = !inside
  }
  return inside
}

/** Render a lightning bolt icon at the given size. */
function renderIcon(size) {
  const scale = size / 180
  const bolt = BOLT_180.map(([x, y]) => [x * scale, y * scale])
  const rgba = Buffer.alloc(size * size * 4)

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4
      // Sample the pixel center
      const on = insidePolygon(x + 0.5, y + 0.5, bolt)
      rgba[i] = on ? 255 : 0 // r
      rgba[i + 1] = on ? 255 : 0 // g
      rgba[i + 2] = on ? 255 : 0 // b
      rgba[i + 3] = 255 // a
    }
  }
  return encodePng(size, size, rgba)
}

/* ---------- Write the files ---------- */
mkdirSync(outDir, { recursive: true })
writeFileSync(join(outDir, 'apple-touch-icon.png'), renderIcon(180))
writeFileSync(join(outDir, 'favicon-32x32.png'), renderIcon(32))
writeFileSync(join(outDir, 'favicon-16x16.png'), renderIcon(16))
console.log('Icons written to', outDir)

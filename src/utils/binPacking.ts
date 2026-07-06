interface PlacedBox {
  id?: string
  x: number; y: number; z: number
  w: number; h: number; d: number
}

function overlaps(a: PlacedBox, b: PlacedBox) {
  return (
    a.x < b.x + b.w && a.x + a.w > b.x &&
    a.y < b.y + b.h && a.y + a.h > b.y &&
    a.z < b.z + b.d && a.z + a.d > b.z
  )
}

export interface PackResult {
  x: number; y: number; z: number
  w: number; h: number; d: number
  success: boolean
}

export function packBox(
  cargoL: number, cargoW: number, cargoH: number,
  truckL: number, truckW: number, truckH: number,
  placed: { x: number; y: number; z: number; w: number; h: number; d: number }[]
): PackResult {
  const orientations = [
    [cargoL, cargoH, cargoW],
    [cargoW, cargoH, cargoL]
  ]

  let best: PackResult | null = null
  let bestScore = Infinity

  const step = 0.1
  const y = 0

  for (const [w, h, d] of orientations) {
    if (h > truckH) continue
    if (w > truckL || d > truckW) continue
    for (let x = 0; x <= truckL - w; x += step) {
      for (let z = 0; z <= truckW - d; z += step) {
        const candidate: PlacedBox = { id: '', x, y, z, w, h, d }
        let ok = true
        for (const p of placed) {
          if (overlaps(candidate, p)) { ok = false; break }
        }
        if (ok) {
          const widthWaste = truckW - d
          const score = x + z + widthWaste
          if (score < bestScore) {
            bestScore = score
            best = { x, y, z, w, h, d, success: true }
          }
        }
      }
    }
  }

  return best || { x: 0, y: 0, z: 0, w: cargoL, h: cargoH, d: cargoW, success: false }
}

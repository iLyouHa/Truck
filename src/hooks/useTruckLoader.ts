import { useCallback, useState } from 'react'
import type { CargoItem, TruckDimensions } from '../types'
import { randColor } from '../utils/helpers'
import { packBox } from '../utils/binPacking'
import { getTotalVolume, getTotalMass, getVolume } from '../utils/helpers'

let nextId = 1

function clampPos(pos: { x: number; y: number; z: number }, item: { length: number; width: number; height: number }, truck: TruckDimensions) {
  const maxX = Math.max(0, truck.length - item.length)
  const maxY = Math.max(0, truck.height - item.height)
  const maxZ = Math.max(0, truck.width - item.width)
  return {
    x: Math.max(0, Math.min(pos.x, maxX)),
    y: Math.max(0, Math.min(pos.y, maxY)),
    z: Math.max(0, Math.min(pos.z, maxZ))
  }
}

function overlaps3D(a: CargoItem, b: CargoItem) {
  return (
    a.position.x < b.position.x + b.length && a.position.x + a.length > b.position.x &&
    a.position.y < b.position.y + b.height && a.position.y + a.height > b.position.y &&
    a.position.z < b.position.z + b.width && a.position.z + a.width > b.position.z
  )
}

function hasOverlaps(item: CargoItem, others: CargoItem[]) {
  for (const other of others) {
    if (other.id !== item.id && overlaps3D(item, other)) return true
  }
  return false
}

function isInBounds(item: CargoItem, truck: TruckDimensions) {
  return (
    item.position.x >= 0 && item.position.x + item.length <= truck.length &&
    item.position.y >= 0 && item.position.y + item.height <= truck.height &&
    item.position.z >= 0 && item.position.z + item.width <= truck.width
  )
}

export function useTruckLoader() {
  const [truck, setTruck] = useState<TruckDimensions>({
    length: 13.6, width: 2.45, height: 2.45
  })
  const [cargos, setCargos] = useState<CargoItem[]>([])
  const [mode, setMode] = useState<'manual' | 'auto'>('manual')

  const addCargo = useCallback((partial: Partial<CargoItem>) => {
    setCargos(prev => {
      const l = partial.length || 1.2
      const w = partial.width || 0.8
      const h = partial.height || 0.8
      const item: CargoItem = {
        id: `cargo-${nextId++}`,
        name: partial.name || `Груз ${nextId - 1}`,
        length: l,
        width: w,
        height: h,
        mass: partial.mass || 50,
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        color: partial.color || randColor(),
        rotatable: true
      }
      if (!isInBounds(item, truck)) return prev
      // try to find free spot
      const placed3D = prev.map(c => ({
        x: c.position.x, y: c.position.y, z: c.position.z,
        w: c.length, h: c.height, d: c.width
      }))
      const result = packBox(l, w, h, truck.length, truck.width, truck.height, placed3D)
      if (!result.success) return prev
      return [...prev, {
        ...item,
        length: result.w,
        width: result.d,
        height: result.h,
        position: { x: result.x, y: result.y, z: result.z }
      }]
    })
  }, [truck])

  const removeCargo = useCallback((id: string) => {
    setCargos(prev => prev.filter(c => c.id !== id))
  }, [])

  const updateCargoPosition = useCallback((id: string, pos: { x: number; y: number; z: number }) => {
    setCargos(prev => prev.map(c =>
      c.id === id ? { ...c, position: clampPos(pos, c, truck) } : c
    ))
  }, [truck])

  const autoPack = useCallback(() => {
    const placed: { x: number; y: number; z: number; w: number; h: number; d: number }[] = []
    const sorted = [...cargos].sort((a, b) =>
      b.length * b.width * b.height - a.length * a.width * a.height
    )
    const updated = sorted
      .map(c => {
        const result = packBox(c.length, c.width, c.height, truck.length, truck.width, truck.height, placed)
        if (!result.success) return null
        placed.push({ x: result.x, y: result.y, z: result.z, w: result.w, h: result.h, d: result.d })
        return {
          ...c,
          length: result.w,
          width: result.d,
          height: result.h,
          position: { x: result.x, y: result.y, z: result.z },
          rotation: { x: 0, y: 0, z: 0 }
        }
      })
      .filter((c): c is CargoItem => c !== null)

    if (updated.every(c => isInBounds(c, truck) && !hasOverlaps(c, updated))) {
      setCargos(updated)
    }
  }, [cargos, truck])

  const truckVol = getVolume(truck.length, truck.width, truck.height)
  const occupiedVol = getTotalVolume(cargos)
  const occupiedLength = cargos.length > 0
    ? Math.max(...cargos.map(c => c.position.x + c.length))
    : 0
  const stats = {
    totalVolume: truckVol,
    occupiedVolume: occupiedVol,
    occupiedLength,
    totalMass: getTotalMass(cargos),
    utilizationPercent: truckVol > 0 ? (occupiedVol / truckVol) * 100 : 0
  }

  return {
    truck,
    setTruck,
    cargos,
    setCargos,
    mode,
    setMode,
    addCargo,
    removeCargo,
    updateCargoPosition,
    autoPack,
    stats
  }
}

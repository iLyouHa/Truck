import type { CargoItem } from '../types'

export const getVolume = (l: number, w: number, h: number) => l * w * h

export const getTotalVolume = (items: CargoItem[]) =>
  items.reduce((s, c) => s + getVolume(c.length, c.width, c.height), 0)

export const getTotalMass = (items: CargoItem[]) =>
  items.reduce((s, c) => s + c.mass, 0)

export const randColor = () => Math.floor(Math.random() * 0xffffff)

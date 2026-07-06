export interface CargoItem {
  id: string
  name: string
  length: number
  width: number
  height: number
  mass: number
  position: { x: number; y: number; z: number }
  rotation: { x: number; y: number; z: number }
  color: number
  rotatable: boolean
}

export interface TruckDimensions {
  length: number
  width: number
  height: number
}

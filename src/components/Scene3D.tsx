import * as THREE from 'three'
import { useRef } from 'react'
import { Text } from '@react-three/drei'

export function SceneLights({ truckLength, truckWidth }: { truckLength: number; truckWidth: number }) {
  const halfSize = Math.max(Math.ceil((truckLength + 6) / 2), Math.ceil((truckWidth + 6) / 2))
  const size = halfSize * 2
  const divisions = size
  const gx = Math.round(truckLength / 2)
  const gz = Math.round(truckWidth / 2)
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[50, 80, 50]} intensity={1} />
      <directionalLight position={[-50, 30, -50]} intensity={0.4} />
      <group position={[gx, 0, gz]}>
        <gridHelper args={[size, divisions, '#666', '#333']} />
      </group>
    </>
  )
}

export function TruckBody({ length, width, height }: { length: number; width: number; height: number }) {
  const edges = new THREE.EdgesGeometry(new THREE.BoxGeometry(length, height, width))
  return (
    <group position={[length / 2, height / 2, width / 2]}>
      <mesh frustumCulled={false}>
        <boxGeometry args={[length, height, width]} />
        <meshBasicMaterial color="#88aacc" transparent opacity={0.15} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      <lineSegments geometry={edges} frustumCulled={false}>
        <lineBasicMaterial color="#3a7bd5" />
      </lineSegments>
    </group>
  )
}

export function CargoBox({ item }: { item: { id: string; length: number; width: number; height: number; position: { x: number; y: number; z: number }; color: number; name: string } }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const cx = item.position.x + item.length / 2
  const cy = item.position.y + item.height / 2
  const cz = item.position.z + item.width / 2

  return (
    <group>
      <mesh
        ref={meshRef}
        position={[cx, cy, cz]}
        frustumCulled={false}
      >
        <boxGeometry args={[item.length, item.height, item.width]} />
        <meshStandardMaterial color={item.color} transparent opacity={0.85} />
      </mesh>
      <Text
        position={[cx, item.position.y + item.height + 0.05, cz]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="bottom"
        outlineWidth={0.03}
        outlineColor="#000"
        frustumCulled={false}
      >
        {item.name}
      </Text>
    </group>
  )
}

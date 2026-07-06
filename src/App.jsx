import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useTruckLoader } from './hooks/useTruckLoader'
import { SceneLights, TruckBody, CargoBox } from './components/Scene3D'
import { Sidebar } from './components/Sidebar'
import './styles.css'

export default function App() {
  const {
    truck, setTruck,
    cargos, setCargos,
    mode, setMode,
    addCargo, removeCargo, updateCargoPosition,
    autoPack,
    stats
  } = useTruckLoader()

  return (
    <div className="app">
      <Sidebar
        truck={truck}
        onTruckChange={setTruck}
        cargos={cargos}
        mode={mode}
        onModeChange={setMode}
        onAddCargo={addCargo}
        onRemoveCargo={removeCargo}
        onAutoPack={autoPack}
        stats={stats}
      />
      <div className="canvas-wrap">
        <Canvas camera={{ position: [12, 8, 12], fov: 50 }}>
          <Suspense fallback={null}>
            <OrbitControls enableDamping />
            <SceneLights truckLength={truck.length} truckWidth={truck.width} />
            <TruckBody length={truck.length} width={truck.width} height={truck.height} />
            {cargos.map(c => (
              <CargoBox key={c.id} item={c} />
            ))}
          </Suspense>
        </Canvas>
      </div>
    </div>
  )
}

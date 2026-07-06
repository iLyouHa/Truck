import { useState } from 'react'
import type { CargoItem, TruckDimensions } from '../types'
import { EquipmentCatalog } from './EquipmentCatalog'

interface SidebarProps {
  truck: TruckDimensions
  onTruckChange: (d: TruckDimensions) => void
  cargos: CargoItem[]
  mode: 'manual' | 'auto'
  onModeChange: (m: 'manual' | 'auto') => void
  onAddCargo: (c: Partial<CargoItem>) => void
  onRemoveCargo: (id: string) => void
  onAutoPack: () => void
  stats: {
    totalVolume: number
    occupiedVolume: number
    occupiedLength: number
    totalMass: number
    utilizationPercent: number
  }
}

export function Sidebar({
  truck, onTruckChange,
  cargos, mode, onModeChange,
  onAddCargo, onRemoveCargo, onAutoPack,
  stats
}: SidebarProps) {
  const [inputMode, setInputMode] = useState<'manual' | 'catalog'>('catalog')
  const [form, setForm] = useState({ name: '', length: 1.2, width: 0.8, height: 0.8, mass: 50 })
  const [truckForm, setTruckForm] = useState(truck)

  const handleAdd = () => {
    if (!form.length || !form.width || !form.height) return
    onAddCargo({ ...form, name: form.name || `Груз ${cargos.length + 1}` })
  }

  const handleCatalogAdd = (items: { name: string; length: number; width: number; height: number; mass: number }[]) => {
    items.forEach(item => onAddCargo(item))
  }

  const handleTruckUpdate = () => {
    onTruckChange({ ...truckForm })
  }

  return (
    <div className="sidebar">
      <h1>Truck Loader</h1>

      <div className="section">
        <h2>Кузов</h2>
        <label>Длина (X):
          <span className="input-row">
            <input type="number" step="0.01" value={truckForm.length}
              onChange={e => setTruckForm({...truckForm, length: +e.target.value})} />
            <span className="unit">м</span>
          </span>
        </label>
        <label>Ширина (Z):
          <span className="input-row">
            <input type="number" step="0.01" value={truckForm.width}
              onChange={e => setTruckForm({...truckForm, width: +e.target.value})} />
            <span className="unit">м</span>
          </span>
        </label>
        <label>Высота (Y):
          <span className="input-row">
            <input type="number" step="0.01" value={truckForm.height}
              onChange={e => setTruckForm({...truckForm, height: +e.target.value})} />
            <span className="unit">м</span>
          </span>
        </label>
        <button onClick={handleTruckUpdate}>Применить</button>
      </div>

      <div className="section">
        <h2>Добавить груз</h2>
        <div className="toggle-row">
          <button
            className={inputMode === 'catalog' ? 'toggle-active' : ''}
            onClick={() => setInputMode('catalog')}
          >
            Из каталога
          </button>
          <button
            className={inputMode === 'manual' ? 'toggle-active' : ''}
            onClick={() => setInputMode('manual')}
          >
            Ручной ввод
          </button>
        </div>

        {inputMode === 'manual' ? (
          <div className="manual-form">
            <label>Название:
              <input type="text" value={form.name}
                onChange={e => setForm({...form, name: e.target.value})} />
            </label>
            <label>Длина (X):
              <span className="input-row">
                <input type="number" step="0.01" value={form.length}
                  onChange={e => setForm({...form, length: +e.target.value})} />
                <span className="unit">м</span>
              </span>
            </label>
            <label>Ширина (Z):
              <span className="input-row">
                <input type="number" step="0.01" value={form.width}
                  onChange={e => setForm({...form, width: +e.target.value})} />
                <span className="unit">м</span>
              </span>
            </label>
            <label>Высота (Y):
              <span className="input-row">
                <input type="number" step="0.01" value={form.height}
                  onChange={e => setForm({...form, height: +e.target.value})} />
                <span className="unit">м</span>
              </span>
            </label>
            <label>Масса:
              <span className="input-row">
                <input type="number" step="1" value={form.mass}
                  onChange={e => setForm({...form, mass: +e.target.value})} />
                <span className="unit">кг</span>
              </span>
            </label>
            <button onClick={handleAdd}>+ Добавить</button>
          </div>
        ) : (
          <EquipmentCatalog onAddItems={handleCatalogAdd} />
        )}
      </div>

      <div className="section">
        <h2>Режим</h2>
        <select value={mode} onChange={e => onModeChange(e.target.value as any)}>
          <option value="manual">Ручной</option>
          <option value="auto">Автоматический</option>
        </select>
        <button className="btn-primary" onClick={onAutoPack}>
          Авто загрузка
        </button>
      </div>

      <div className="section">
        <h2>Статистика</h2>
        <p>Объём кузова: {stats.totalVolume.toFixed(2)} м³</p>
        <p>Занято: {stats.occupiedVolume.toFixed(2)} м³ ({stats.utilizationPercent.toFixed(1)}%)</p>
        <p>Занято по длине: {stats.occupiedLength.toFixed(2)} / {truck.length.toFixed(2)} м</p>
        <p>Масса: {stats.totalMass.toFixed(1)} кг</p>
      </div>

      <div className="section">
        <h2>Грузы ({cargos.length})</h2>
        <ul>
          {cargos.map(c => (
            <li key={c.id}>
              <span style={{ color: '#' + c.color.toString(16).padStart(6, '0') }}>■</span>
              <span>{c.name}</span>
              <button className="small" onClick={() => onRemoveCargo(c.id)}>x</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { equipmentCatalog, type CatalogItem, type CatalogCategory } from '../data/equipmentCatalog'

interface EquipmentCatalogProps {
  onAddItems: (items: { name: string; length: number; width: number; height: number; mass: number }[]) => void
}

export function EquipmentCatalog({ onAddItems }: EquipmentCatalogProps) {
  const [selectedCat, setSelectedCat] = useState<string | null>(null)
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({})

  const category = equipmentCatalog.find(c => c.name === selectedCat)

  const toggle = (itemName: string) => {
    setCheckedMap(prev => ({ ...prev, [itemName]: !prev[itemName] }))
  }

  const selectedItems = category
    ? category.items.filter(i => checkedMap[i.name])
    : []

  const totalVolume = selectedItems.reduce((s, i) => s + i.volume, 0)
  const totalMass = selectedItems.reduce((s, i) => s + i.mass, 0)

  const handleAdd = () => {
    if (selectedItems.length === 0) return
    onAddItems(selectedItems.map(i => ({
      name: i.name,
      length: i.length || 0.5,
      width: i.width || 0.5,
      height: i.height || 0.5,
      mass: i.mass,
    })))
    setCheckedMap({})
  }

  return (
    <div className="catalog">
      <label>Комплекс / категория:
        <select value={selectedCat || ''} onChange={e => { setSelectedCat(e.target.value || null); setCheckedMap({}) }}>
          <option value="">— выберите —</option>
          {equipmentCatalog.map(c => (
            <option key={c.name} value={c.name}>{c.name}</option>
          ))}
        </select>
      </label>

      {category && (
        <>
          <div className="catalog-items">
            {category.items.map(item => (
              <label key={item.name} className="catalog-item-row">
                <input type="checkbox" checked={!!checkedMap[item.name]} onChange={() => toggle(item.name)} />
                <span className="item-name">{item.name}</span>
                <span className="item-dims">{item.length > 0 ? `${item.length}×${item.width}×${item.height} м` : '—'}</span>
                <span className="item-mass">{item.mass > 0 ? `${item.mass} кг` : '—'}</span>
              </label>
            ))}
          </div>

          {selectedItems.length > 0 && (
            <div className="catalog-summary">
              <p>Выбрано: {selectedItems.length} шт</p>
              <p>Сумм. объём: {totalVolume.toFixed(2)} м³</p>
              <p>Сумм. масса: {totalMass.toFixed(0)} кг</p>
              <button onClick={handleAdd}>+ Добавить выбранное</button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

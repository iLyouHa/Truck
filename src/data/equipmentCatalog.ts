export interface CatalogItem {
  name: string
  length: number
  width: number
  height: number
  volume: number
  mass: number
}

export interface CatalogCategory {
  name: string
  items: CatalogItem[]
}

export const equipmentCatalog: CatalogCategory[] = [
  {
    name: 'УПТ-250С',
    items: [
      { name: 'УПТ-250С', length: 2.5, width: 1.75, height: 1.7, volume: 7.4, mass: 1550 },
      { name: 'Пакет рольгангов', length: 2.45, width: 1.0, height: 0.9, volume: 2.26, mass: 590 },
      { name: 'ВЦП-6,3М', length: 1.45, width: 0.75, height: 1.0, volume: 1.09, mass: 160 },
    ]
  },
  {
    name: 'УПТ-280',
    items: [
      { name: 'УПТ-280КС', length: 2.5, width: 1.75, height: 1.8, volume: 0, mass: 3120 },
      { name: 'Пристрой', length: 0.82, width: 0.99, height: 0.8, volume: 0.65, mass: 850 },
      { name: 'Пакет рольгангов', length: 2.6, width: 1.0, height: 1.25, volume: 3.25, mass: 0 },
      { name: 'ВЦП-6,3М', length: 1.45, width: 0.75, height: 1.0, volume: 1.09, mass: 160 },
    ]
  },
  {
    name: 'АСПБ-300',
    items: [
      { name: 'Кантователь', length: 3.5, width: 1.3, height: 1.4, volume: 6.37, mass: 1050 },
      { name: 'Разобщитель', length: 3.2, width: 1.7, height: 1.2, volume: 6.53, mass: 650 },
      { name: 'Эстакада', length: 3.05, width: 1.9, height: 1.1, volume: 6.37, mass: 1350 },
    ]
  },
  {
    name: 'АЛРБ-300',
    items: [
      { name: 'Стол', length: 4.31, width: 0.7, height: 1.51, volume: 4.56, mass: 500 },
      { name: 'ТС-3', length: 1.7, width: 1.1, height: 1.78, volume: 3.33, mass: 500 },
    ]
  },
  {
    name: 'ОЦС-1',
    items: [
      { name: 'Каретка оцс-1м', length: 1.25, width: 1.0, height: 1.35, volume: 1.69, mass: 600 },
      { name: 'Ферма (рельсы)', length: 2.6, width: 1.17, height: 1.25, volume: 3.8, mass: 1000 },
    ]
  },
  {
    name: 'ОЦС-2',
    items: [
      { name: 'Каретка оцс-2а', length: 1.3, width: 1.16, height: 1.06, volume: 1.6, mass: 750 },
      { name: 'Ферма (рельсы)', length: 2.6, width: 1.1, height: 1.25, volume: 3.6, mass: 1050 },
      { name: 'Торцовочный станок', length: 1.7, width: 0.8, height: 1.2, volume: 1.6, mass: 370 },
      { name: 'Рольганг 12м', length: 3.2, width: 0.85, height: 0.85, volume: 2.3, mass: 250 },
    ]
  },
  {
    name: 'ОЦС-3',
    items: [
      { name: 'Каретка оцс-3а', length: 1.5, width: 1.1, height: 1.6, volume: 2.6, mass: 1100 },
      { name: 'Ферма (рельсы)', length: 2.6, width: 1.1, height: 1.25, volume: 3.6, mass: 1050 },
    ]
  },
  {
    name: 'ОЦС-4',
    items: [
      { name: 'Каретка оцс-4', length: 1.6, width: 1.8, height: 1.3, volume: 3.7, mass: 1300 },
      { name: 'Ферма оцс-4', length: 2.6, width: 1.2, height: 1.7, volume: 5.3, mass: 1300 },
    ]
  },
  {
    name: 'ЛПУ',
    items: [
      { name: 'Каретка', length: 2.04, width: 0.84, height: 1.7, volume: 2.9, mass: 500 },
      { name: 'Рельсы', length: 2.3, width: 1.12, height: 0.6, volume: 1.55, mass: 570 },
    ]
  },
  {
    name: 'Прочее',
    items: [
      { name: 'УЧС-2М', length: 1.7, width: 1.4, height: 1.3, volume: 3.1, mass: 500 },
      { name: 'Транспортер (15м)', length: 2.64, width: 0.95, height: 0.83, volume: 2.08, mass: 725 },
      { name: 'ЗС-1000', length: 0.8, width: 0.6, height: 0.35, volume: 0.17, mass: 50 },
      { name: 'Стол УПТ-250', length: 2.47, width: 0.7, height: 0.64, volume: 1.1, mass: 431 },
      { name: 'УЧС-3АМ', length: 2.3, width: 1.66, height: 1.05, volume: 4.01, mass: 500 },
      { name: 'Секция ОЦС', length: 2.55, width: 1.15, height: 0.5, volume: 1.47, mass: 350 },
      { name: 'Рольганг', length: 3.2, width: 1.05, height: 0.85, volume: 2.86, mass: 500 },
      { name: 'Рольганг (2)', length: 3.2, width: 1.05, height: 0.85, volume: 2.86, mass: 500 },
      { name: 'Транспортер', length: 2.75, width: 1.0, height: 1.0, volume: 2.75, mass: 725 },
    ]
  },
]

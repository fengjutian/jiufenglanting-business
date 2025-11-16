import { typeList } from '../type/businessType.ts'
import { BusinessSeedEntry } from './business.ts'

export const duckSeedEntries: BusinessSeedEntry[] = [
  {
    id: 'duck-1',
    name: '水西门老卤鸭',
    email: '',
    address: '南京市江宁区新医路28-10号',
    type: typeList.烤鸭,
    contact: '19951759647',
    rating: null,
    latitude: 31.952592,
    longitude: 118.849039,
    otherInfo: null,
    imageBase64: null,
    description: null
  },
]
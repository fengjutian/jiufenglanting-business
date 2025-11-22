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
  {
    id: 'duck-2',
    name: '陈林鸭子店(义乌总店)',
    email: '',
    address: '南京市江宁区天元东路999号天景山商业中心08幢142-2号',
    type: typeList.烤鸭,
    contact: '13914486757',
    rating: null,
    latitude: 31.939878,
    longitude: 118.875171,
    otherInfo: null,
    imageBase64: null,
    description: null
  },
  {
    id: 'duck-3',
    name: '金陵烤鸭店',
    email: '',
    address: '南京市江宁区万安西路天云小区-南区',
    type: typeList.烤鸭,
    contact: '',
    rating: null,
    latitude: 31.959268,
    longitude: 118.883031,
    otherInfo: null,
    imageBase64: null,
    description: null
  },
]
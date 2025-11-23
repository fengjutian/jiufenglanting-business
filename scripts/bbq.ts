import { typeList } from '../type/businessType.ts'
import { BusinessSeedEntry } from './business.ts'

export const bbqList: BusinessSeedEntry[] = [
  {
    id: 'bbq-1',
    name: '久明烧烤(康馨公寓店)',
    email: '',
    address: '南京市江宁区东山街道校前路康馨公寓03幢101室',
    type: typeList.烧烤,
    contact: '18602504193',
    rating: null,
    latitude: 31.956068,
    longitude: 118.882775,
    otherInfo: null,
    imageBase64: null,
    description: null
  },
  {
    id: 'bbq-2',
    name: '肥肥龙虾烧烤',
    email: '',
    address: '南京市江宁区天宁路与园中路交叉口北80米',
    type: typeList.烧烤,
    contact: '',
    rating: null,
    latitude: 31.956006,
    longitude: 118.885404,
    otherInfo: null,
    imageBase64: null,
    description: null
  },
]
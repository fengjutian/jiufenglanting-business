import { typeList } from '../type/businessType.ts'
import { BusinessSeedEntry } from './business.ts'

export const pharmacySeedEntries: BusinessSeedEntry[] = [
  {
    id: 'pharmacy-1',
    name: '齐康堂大药房',
    email: '',
    address: '南京市江宁区龙昌路9号106室',
    type: typeList.药店,
    contact: '025-52756360',
    rating: null,
    latitude: 31.964815,
    longitude: 118.878998,
    otherInfo: null,
    imageBase64: null,
    description: null
  },
  {
    id: 'pharmacy-2',
    name: '正心堂大药房(龙昌路店)',
    email: '',
    address: '南京市江宁区万安西路与龙昌路交汇处',
    type: typeList.药店,
    contact: '025-87731980 13814029361',
    rating: null,
    latitude: 31.964391,
    longitude: 118.877905,
    otherInfo: null,
    imageBase64: null,
    description: null
  },
]
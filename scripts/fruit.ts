import { typeList } from '../type/businessType.ts'
import { BusinessSeedEntry } from './business.ts'

export const fruitSeedEntries: BusinessSeedEntry[] = [
  {
    id: 'fruit-1',
    name: '百果园(云靖花园店)',
    email: '',
    address: '南京市江宁区东山街道龙昌路9号107室',
    type: typeList.水果店,
    contact: '025-86153775',
    rating: null,
    latitude: 31.964755,
    longitude: 118.878873,
    otherInfo: null,
    imageBase64: null,
    description: null
  },
  {
    id: 'fruit-2',
    name: '御品轩水果超市(融侨·悦城店)',
    email: '',
    address: '南京市江宁区万安南路9号融侨悦城',
    type: typeList.水果店,
    contact: '13816599228',
    rating: null,
    latitude: 31.957113,
    longitude: 118.880469,
    otherInfo: null,
    imageBase64: null,
    description: null
  },
]
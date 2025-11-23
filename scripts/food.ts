import { typeList } from '../type/businessType.ts'
import { BusinessSeedEntry } from './business.ts'

export const foodSeedEntries: BusinessSeedEntry[] = [
  {
    id: 'food-1',
    name: '包吉多',
    email: '',
    address: '南京市江宁区天云南街与万安西路交叉口西40米',
    type: typeList.餐饮,
    contact: '',
    rating: null,
    latitude: 31.959221,
    longitude: 118.883072,
    otherInfo: null,
    imageBase64: null,
    description: null
  },
 {
    id: 'food-2',
    name: '安庆馄饨(天云小区南区店)',
    email: '',
    address: '南京市江宁区天云小区南区东北门旁',
    type: typeList.餐饮,
    contact: '15150577683',
    rating: null,
    latitude: 31.959333,
    longitude: 118.882672,
    otherInfo: null,
    imageBase64: null,
    description: null
  },
]
import { typeList } from '../type/businessType.ts'
import { BusinessSeedEntry } from './business.ts'

export const bakeryList: BusinessSeedEntry[] = [
  {
    id: 'bakery-1',
    name: '泸溪河桃酥(江宁万达店)',
    email: '',
    address: '南京市江宁区竹山路志宁花园65-1号(万达广场对面)',
    type: typeList.糕点,
    contact: '17715247353',
    rating: null,
    latitude: 31.950226,
    longitude: 118.845206,
    otherInfo: null,
    imageBase64: null,
    description: null
  },
  {
    id: 'bakery-2',
    name: '泸溪河桃酥(南京义乌小商品城店)',
    email: '',
    address: '南京市江宁区淳化街道江宁区天元东路388号义乌小商品城A区10幢31号)',
    type: typeList.糕点,
    contact: '18061601757 4008271718',
    rating: null,
    latitude: 31.939325,
    longitude: 118.876682,
    otherInfo: null,
    imageBase64: null,
    description: null
  },
]
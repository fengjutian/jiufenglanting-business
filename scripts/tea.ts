import { typeList } from '../type/businessType.ts'
import { BusinessSeedEntry } from './business.ts'

export const teaSeedEntries: BusinessSeedEntry[] = [
  {
    id: 'tea-1',
    name: '蜜雪冰城(南京义乌小商品城店)',
    email: '',
    address: '南京市江宁区天元东路义乌小商品城A座5栋6号',
    type: typeList.奶茶,
    contact: '18838105290',
    rating: null,
    latitude: 31.939416,
    longitude: 118.876467,
    otherInfo: null,
    imageBase64: null,
    description: null
  },
  {
    id: 'tea-2',
    name: '蜜雪冰城',
    email: '',
    address: '',
    type: typeList.蜜雪冰城,
    contact: '',
    rating: null,
    latitude: 31.962031,
    longitude: 118.861116,
    otherInfo: null,
    imageBase64: null,
    description: null
  },
 {
    id: 'tea-3',
    name: 'CHAGEE霸王茶姬(江苏南京江宁义乌小商品)',
    email: '',
    address: '南京市江宁区秣陵街道天元东路388号义乌小商品城11幢1层101号',
    type: typeList.蜜雪冰城,
    contact: '4008788359',
    rating: null,
    latitude: 31.939315,
    longitude: 118.877022,
    otherInfo: null,
    imageBase64: null,
    description: null
  },
]
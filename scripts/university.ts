import { typeList } from '../type/businessType.ts'
import { BusinessSeedEntry } from './business.ts'

export const universitySeedEntries: BusinessSeedEntry[] = [
  {
    id: 'university-1',
    name: '南京农业大学(卫岗校区)',
    email: '',
    address: '南京市玄武区童卫路1号',
    type: typeList.大学,
    contact: '025-84396458 025-84395366',
    rating: null,
    latitude: 32.033227,
    longitude: 118.843115,
    otherInfo: null,
    imageBase64: null,
    description: null
  },
  {
    id: 'university-2',
    name: '南京理工大学(南京孝陵卫校区)',
    email: '',
    address: '南京市玄武区孝陵卫街200号',
    type: typeList.大学,
    contact: '025-84315114 025-84315205',
    rating: null,
    latitude: 32.028905,
    longitude: 118.855665,
    otherInfo: null,
    imageBase64: null,
    description: null
  },
  {
    id: 'university-3',
    name: '南京航空航天大学(明故宫校区)',
    email: '',
    address: '南京市秦淮区御道街29号',
    type: typeList.大学,
    contact: '025-84892435 025-84892899',
    rating: null,
    latitude: 32.035215,
    longitude: 118.820529,
    otherInfo: null,
    imageBase64: null,
    description: null
  },
  {
    id: 'university-4',
    name: '东南大学(四牌楼校区)太平北路122号院',
    email: '',
    address: '南京市玄武区太平北路122号(浮桥地铁站1号口步行240米)',
    type: typeList.大学,
    contact: '',
    rating: null,
    latitude: 32.051868,
    longitude: 118.798109,
    otherInfo: null,
    imageBase64: null,
    description: null
  },
]
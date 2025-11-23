import { typeList } from '../type/businessType.ts'
import { BusinessSeedEntry } from './business.ts'

export const electricCarList: BusinessSeedEntry[] = [
  {
    id: 'electric-car-1',
    name: '爱玛电动车(天宁雅居店)',
    email: '',
    address: '南京市江宁区园中路18号天宁雅居',
    type: typeList.电动车,
    contact: '13913817584',
    rating: null,
    latitude: 31.956068,
    longitude: 118.882775,
    otherInfo: null,
    imageBase64: null,
    description: null
  },
  {
    id: 'electric-car-2',
    name: '雅迪电动车啊辉车业天宁路',
    email: '',
    address: '南京市江宁区天宁雅居东北门旁',
    type: typeList.电动车,
    contact: '13358517302',
    rating: null,
    latitude: 31.956156,
    longitude: 118.885465,
    otherInfo: null,
    imageBase64: null,
    description: null
  },
]
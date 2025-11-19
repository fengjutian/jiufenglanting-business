import { typeList } from '../type/businessType.ts'
import { BusinessSeedEntry } from './business.ts'

export const massageList: BusinessSeedEntry[] = [
  {
    id: 'massage-1',
    name: '艺师傅盲人按摩(东山分店)',
    email: '',
    address: '南京市江宁区招商街商城园中园8栋109',
    type: typeList.按摩,
    contact: '',
    rating: null,
    latitude: 31.951352,
    longitude: 118.832261,
    otherInfo: null,
    imageBase64: null,
    description: null
  },
  {
    id: 'massage-2',
    name: '苏康盲人推拿(园中园雅仕居小区西区店)',
    email: '',
    address: '南京市江宁区招商街99号(苏宁店附近)南京市江宁区城墟路双赢花园12栋106室',
    type: typeList.按摩,
    contact: '025-52197113',
    rating: null,
    latitude: 31.95116,
    longitude: 118.832661,
    otherInfo: null,
    imageBase64: null,
    description: null
  },
  {
    id: 'massage-3',
    name: '友诚足韵',
    email: '',
    address: '南京市江宁区上元大街招商街88号一楼',
    type: typeList.按摩,
    contact: '',
    rating: null,
    latitude: 31.951266,
    longitude: 118.832957,
    otherInfo: null,
    imageBase64: null,
    description: null
  },
]
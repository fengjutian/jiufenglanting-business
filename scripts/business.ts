import { typeList } from '../type/businessType'

export type BusinessSeedEntry = {
  id?: number
  name: string
  email: string
  address?: string
  type?: typeList
  contact?: string
  rating?: number | null
  latitude?: number | null
  longitude?: number | null
  otherInfo?: string | null
}

export const raw: BusinessSeedEntry[] = [
  {
    id: 1,
    name: '联品优选(玖峰兰庭店)',
    email: '1',
    address: '南京市江宁区瑞宁路与万安南路交叉口东100米',
    type: typeList.超市,
    contact: '1',
    rating: null,
    latitude: 31.96211,
    longitude: 118.881618,
    otherInfo: null
  },
  {
    id: 2,
    name: '购好生活超市(祈泽佳苑店)',
    email: '',
    address: '南京市江宁区东山街道祈泽佳苑9幢一楼102-105室',
    type: typeList.超市,
    contact: '',
    rating: null,
    latitude: 31.967829,
    longitude: 118.877457,
    otherInfo: null
  },
  {
    id: 3,
    name: '老街大排档',
    email: '',
    address: '南京市江宁区东山街道祈泽佳苑9幢一楼102-105室',
    type: typeList.餐饮,
    contact: '',
    rating: null,
    latitude: 31.967994,
    longitude: 118.877369,
    otherInfo: null
  },
  {
    id: 4,
    name: '川福楼私房菜',
    email: '',
    address: '南京市江宁区东山街道祈泽佳苑9幢一楼102-105室',
    type: typeList.餐饮,
    contact: '',
    rating: null,
    latitude: 31.967915,
    longitude: 118.877252,
    otherInfo: null
  },
  {
    id: 5,
    name: '上访天云门诊',
    email: '',
    address: '南京市江宁区东山街道瑞宁路32-7号',
    type: typeList.小诊所,
    contact: '',
    rating: null,
    latitude: 31.962192,
    longitude: 118.880968,
    otherInfo: null
  },
  {
    id: 6,
    name: '肯德基(南京上坊店)',
    email: '',
    address: '南京市江宁区东山街道文靖东路333号1幢104室一层',
    type: typeList.小诊所,
    contact: '',
    rating: null,
    latitude: 31.968904,
    longitude: 118.876375,
    otherInfo: null
  },
  {
    id: 7,
    name: '上访天云门诊',
    email: '',
    address: '南京市江宁区东山街道祈泽佳苑9幢一楼102-105室',
    type: typeList.肯德基,
    contact: '',
    rating: null,
    latitude: 31.9689,
    longitude: 118.876378,
    otherInfo: null
  },
  {
    id: 8,
    name: '孙北北面包(江宁金茂悦店)',
    email: '',
    address: '南京市江宁区瑞宁路188号',
    type: typeList.糕点,
    contact: '15195808604',
    rating: null,
    latitude: 31.960703,
    longitude: 118.888914,
    otherInfo: null
  }
]
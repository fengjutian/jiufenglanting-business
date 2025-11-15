import { typeList } from '../type/businessType.ts'

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
  imageBase64?: string | null
  description?: string | null
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
    otherInfo: null,
    imageBase64: null,
    description: null
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
    otherInfo: null,
    imageBase64: null,
    description: null
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
    otherInfo: null,
    imageBase64: null,
    description: null
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
    otherInfo: null,
    imageBase64: null,
    description: null
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
    otherInfo: null,
    imageBase64: null,
    description: null
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
    otherInfo: null,
    imageBase64: null,
    description: null
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
    otherInfo: null,
    imageBase64: null,
    description: null
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
    otherInfo: null,
    imageBase64: null,
    description: null
  },
  {
    id: 9,
    name: '俏皮嘴烧烤(武成路店)',
    email: '',
    address: '南京市江宁区武成路66号2幢103',
    type: typeList.烧烤,
    contact: '15151839814',
    rating: null,
    latitude: 31.961125,
    longitude: 118.889874,
    otherInfo: null,
    imageBase64: null,
    description: null
  },
  {
    id: 10,
    name: '张府园大碗面(上坊店)',
    email: '',
    address: '南京市江宁区武城路66号2-112',
    type: typeList.面馆,
    contact: '13951638803',
    rating: null,
    latitude: 31.961031,
    longitude: 118.89074,
    otherInfo: null,
    imageBase64: null,
    description: null
  },
  {
    id: 11,
    name: '肯德基(天景山店)',
    email: '',
    address: '南京市江宁区湖东路29号一层(1-181-17-2)号',
    type: typeList.肯德基,
    contact: '025-52151290',
    rating: null,
    latitude: 31.942106,
    longitude: 118.874569,
    otherInfo: null,
    imageBase64: null,
    description: null
  },
  {
    id: 12,
    name: '老翟版面',
    email: '',
    address: '',
    type: typeList.面馆,
    contact: '',
    rating: null,
    latitude: 31.948508,
    longitude: 118.869598,
    otherInfo: null,
    imageBase64: null,
    description: null
  },
  {
    id: 13,
    name: '棋乐用生鲜',
    email: '',
    address: '',
    type: typeList.菜市场,
    contact: '',
    rating: null,
    latitude: 31.950036,
    longitude: 118.871171,
    otherInfo: null,
    imageBase64: null,
    description: null
  },
  {
    id: 14,
    name: '华润苏果',
    email: '',
    address: '',
    type: typeList.超市,
    contact: '',
    rating: null,
    latitude: 31.95837,
    longitude: 118.864491,
    otherInfo: null,
    imageBase64: null,
    description: null
  },
  {
    id: 15,
    name: '一个卷饼',
    email: '',
    address: '',
    type: typeList.餐饮,
    contact: '',
    rating: null,
    latitude: 31.958403,
    longitude: 118.864391,
    otherInfo: null,
    imageBase64: null,
    description: null
  }
]
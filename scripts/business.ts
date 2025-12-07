import { typeList } from '../type/businessType.ts'
import { supermarketList } from './supermarket.ts'
import { pharmacySeedEntries } from './pharmacy.ts'
import { fruitSeedEntries } from './fruit.ts'
import { chineseSeedEntries } from './chinese.ts'
import { hotelSeedEntries } from './hotel.ts'
import { kfcSeedEntries } from './kfc.ts'
import { bakeryList } from './bakery.ts'
import { duckSeedEntries } from './duck.ts'
import { teaSeedEntries } from './tea.ts'
import { wangkaList } from './wangka.ts'
import { bankList } from './bank.ts'
import { coffeeSeedEntries } from './coffee.ts'
import { beautySeedEntries } from './beauty.ts'
import { massageList } from './massage.ts'
import { westernSeedEntry } from './western.ts'
import { clothingList } from './clothing.ts'
import { chessSeedEntries } from './chess.ts'
import { foodSeedEntries } from './food.ts'
import { graphicSeedEntries } from './graphic.ts'
import { flowerSeedEntries } from './flower.ts'
import { bbqList } from './bbq.ts'
import { electricCarList } from './electric_car.ts'
import { houseRentalList } from './house_rental.ts'
import { gasStationSeedEntries } from './gas_station.ts'
import { attractionSeedEntries } from './attraction.ts'
import { universitySeedEntries } from './university.ts'



export type BusinessSeedEntry = {
  id?: string | number
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
  ...attractionSeedEntries,
  ...gasStationSeedEntries,
  ...houseRentalList,
  ...hotelSeedEntries,
  ...kfcSeedEntries,
  ...bakeryList,
  ...duckSeedEntries,
  ...wangkaList,
  ...bankList,
  ...coffeeSeedEntries,
  ...beautySeedEntries,
  ...massageList,
  ...westernSeedEntry,
  ...clothingList,
  ...chessSeedEntries,
  ...foodSeedEntries,
  ...graphicSeedEntries,
  ...flowerSeedEntries,
  ...bbqList,
  ...electricCarList,
  ...universitySeedEntries,
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
  },
  {
    id: 16,
    name: '金宝城东农贸',
    email: '',
    address: '南京市江宁区天印大道597号',
    type: typeList.菜市场,
    contact: '15850620471',
    rating: null,
    latitude: 31.961027,
    longitude: 118.861195,
    otherInfo: null,
    imageBase64: null,
    description: null
  },
  {
    id: 20,
    name: '华莱士·全鸡汉堡(天元吉第城)',
    email: '',
    address: '南京市江宁区天元吉第城东门8栋104门面房',
    type: typeList.餐饮,
    contact: '15996346267 17327787277',
    rating: null,
    latitude: 31.947389,
    longitude: 118.875076,
    otherInfo: null,
    imageBase64: null,
    description: null
  },
  {
    id: 21,
    name: '水西门瘦型鸭(天元吉第城店)',
    email: '',
    address: '南京市江宁区科学园湖山路369号天元吉第城86幢102室',
    type: typeList.烤鸭,
    contact: '13236522130',
    rating: null,
    latitude: 31.945542,
    longitude: 118.874019,
    otherInfo: null,
    imageBase64: null,
    description: null
  },
  {
    id: 22,
    name: '泸溪河桃酥(文靖路店)',
    email: '',
    address: '南京市江宁区文靖路399号',
    type: typeList.糕点,
    contact: '19052821064',
    rating: null,
    latitude: 31.960668,
    longitude: 118.851463,
    otherInfo: null,
    imageBase64: null,
    description: null
  },
  {
    id: 23,
    name: '蓝眼泪',
    email: '',
    address: '南京市江宁区上佘路1号',
    type: typeList.景点,
    contact: '',
    rating: null,
    latitude: 31.990658,
    longitude: 118.925163,
    otherInfo: null,
    imageBase64: null,
    description: null
  },
  {
    id: 25,
    name: '华润燃气客户服务中心',
    email: '',
    address: '',
    type: typeList.燃气,
    contact: '',
    rating: null,
    latitude: 31.958917,
    longitude: 118.862188,
    otherInfo: null,
    imageBase64: null,
    description: null
  },
  {
    id: 26,
    name: '楠鲸口腔',
    email: '',
    address: '',
    type: typeList.口腔,
    contact: '',
    rating: null,
    latitude: 31.958933,
    longitude: 118.862504,
    otherInfo: null,
    imageBase64: null,
    description: null
  },
  {
    id: 27,
    name: '彭城老拾烧烤(湖山路直营店)',
    email: '',
    address: '南京市江宁区湖山路360-1号',
    type: typeList.烧烤,
    contact: '15261877770',
    rating: null,
    latitude: 31.946339,
    longitude: 118.869195,
    otherInfo: null,
    imageBase64: null,
    description: null
  },
  {
    id: 29,
    name: '乐喜面馆(天元吉第城店)',
    email: '',
    address: '南京市江宁区天元吉第城39幢103室',
    type: typeList.面馆,
    contact: '13585111192',
    rating: null,
    latitude: 31.945231,
    longitude: 118.871311,
    otherInfo: null,
    imageBase64: null,
    description: null
  },
  {
    id: 30,
    name: '思本轩水煎包(天元吉第城店)',
    email: '',
    address: '南京市江宁区湖山路369号天元吉第城商业9幢105-1室',
    type: typeList.早餐,
    contact: '15951721225',
    rating: null,
    latitude: 31.947699,
    longitude: 118.87508,
    otherInfo: null,
    imageBase64: null,
    description: null
  },
  ...supermarketList,
  {
    id: '35',
    name: '四个朋友·自助棋牌(江宁金茂悦店)',
    email: '',
    address: '南京市江宁区东山街道瑞宁路186号101-1室2F-S-05铺',
    type: typeList.棋牌,
    contact: '18705155632 4000017788',
    rating: null,
    latitude: 31.960674,
    longitude: 118.888723,
    otherInfo: null,
    imageBase64: null,
    description: null
  },
  {
    id: '36',
    name: '好想来零食乐园(南京江宁区金茂悦店)',
    email: '',
    address: '南京市江宁区东山街道瑞宁路192号龙茂嘉苑小区101室',
    type: typeList.零食,
    contact: '4000107777',
    rating: null,
    latitude: 31.960469,
    longitude: 118.890096,
    otherInfo: null,
    imageBase64: null,
    description: null
  },
  {
    id: '38',
    name: '瑾晨·瑜伽普拉提生活馆',
    email: '',
    address: '南京市江宁区武成路66号3楼302室',
    type: typeList.瑜伽,
    contact: '18013871880',
    rating: null,
    latitude: 31.961452,
    longitude: 118.889871,
    otherInfo: null,
    imageBase64: null,
    description: null
  },
  {
    id: '39',
    name: '徐州烧烤龙虾碳锅大排档',
    email: '',
    address: '南京市江宁区武成路68号111-2室',
    type: typeList.烧烤,
    contact: '',
    rating: null,
    latitude: 31.960989,
    longitude: 118.89065,
    otherInfo: null,
    imageBase64: null,
    description: null
  },
  {
    id: '40',
    name: '紫燕百味鸡(江宁龙昌路店)',
    email: '',
    address: '南京市江宁区东山街道龙昌路7号云靖花园18栋101室',
    type: typeList.餐饮,
    contact: '13851609099',
    rating: null,
    latitude: 31.964836,
    longitude: 118.879622,
    otherInfo: null,
    imageBase64: null,
    description: null
  },
  {
    id: '41',
    name: '香呱呱炒货(都会学府店)',
    email: '',
    address: '南京市江宁区江宁云靖花园',
    type: typeList.炒货,
    contact: '18762232768',
    rating: null,
    latitude: 31.964978,
    longitude: 118.879426,
    otherInfo: null,
    imageBase64: null,
    description: null
  },
  ...teaSeedEntries,
  ...pharmacySeedEntries,
  ...fruitSeedEntries,
  ...chineseSeedEntries
]
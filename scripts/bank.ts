import { typeList } from '../type/businessType.ts'
import { BusinessSeedEntry } from './business.ts'

export const bankList: BusinessSeedEntry[] = [
  {
    id: 'bank-1',
    name: '紫金农商银行(上元支行)',
    email: '',
    address: '南京市江宁区天元东路865号(龙眠大道地铁站1号口步行230米)',
    type: typeList.银行,
    contact: '025-52180242',
    rating: null,
    latitude: 31.940032,
    longitude: 118.875329,
    otherInfo: null,
    imageBase64: null,
    description: null
  },
]
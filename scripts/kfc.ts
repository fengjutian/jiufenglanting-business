import { typeList } from '../type/businessType.ts'
import { BusinessSeedEntry } from './business.ts'

export const kfcSeedEntries: BusinessSeedEntry[] = [
  {
    id: 'kfc-1',
    name: '肯德基(东山店)',
    email: '',
    address: '南京市江宁区东山镇土山路2号(华意泰富广场南)',
    type: typeList.肯德基,
    contact: '025-52188133',
    rating: null,
    latitude: 31.954265,
    longitude: 118.843611,
    otherInfo: null,
    imageBase64: null,
    description: null
  },
]
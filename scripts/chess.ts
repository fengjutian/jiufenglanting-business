import { typeList } from '../type/businessType.ts'
import { BusinessSeedEntry } from './business.ts'

export const chessSeedEntries: BusinessSeedEntry[] = [
  {
    id: 'chess-1',
    name: '四个朋友.自助棋牌(玖峰兰庭店)',
    email: '',
    address: '南京市江宁区东山街道瑞宁路32-7号楼二楼002室',
    type: typeList.棋牌,
    contact: '13372015242',
    rating: null,
    latitude: 31.962148,
    longitude: 118.881172,
    otherInfo: null,
    imageBase64: null,
    description: null
  },
  {
    id: 'chess-2',
    name: '云游棋牌',
    email: '',
    address: '南京市江宁区东山街道石麟路东城金茂悦2期门面房S1号楼2楼201室',
    type: typeList.棋牌,
    contact: '13914778674',
    rating: null,
    latitude: 31.963944,
    longitude: 118.890926,
    otherInfo: null,
    imageBase64: null,
    description: null
  },
]
import { create } from 'zustand'

const mapThemeList = [
  {
    name: '标准',
    label: 'normal',
    theme: 'amap://styles/normal'
  },
  {
    name: '幻影黑',
    label: 'dark',
    theme: 'amap://styles/dark'
  },
  {
    name: '月光银',
    label: 'light',
    theme: 'amap://styles/light'
  },
    {
    name: '远山黛',
    label: 'whitesmoke',
    theme: 'amap://styles/whitesmoke'
  },
    {
    name: '草色青',
    label: 'fresh',
    theme: 'amap://styles/fresh'
  },
    {
    name: '雅士灰',
    label: 'grey',
    theme: 'amap://styles/grey'
  },
    {
    name: '涂鸦',
    label: 'graffiti',
    theme: 'amap://styles/graffiti'
  },
    {
    name: '马卡龙',
    label: 'macaron',
    theme: 'amap://styles/macaron'
  },
    {
    name: '靛青蓝',
    label: 'blue',
    theme: 'amap://styles/blue'
  },
  {
    name: '极夜蓝',
    label: 'darkblue',
    theme: 'amap://styles/darkblue'
  },
  {
    name: '酱籽',
    label: 'wine',
    theme: 'amap://styles/wine'
  }
]

export const useConfigStore = create((set) => ({
  mapTheme: {
    store: mapThemeList,
    mapThemeByName: mapThemeList.reduce((acc, cur) => {
      acc[cur.label] = cur.theme
      return acc
    }, {} as Record<string, string>)
  },
}))
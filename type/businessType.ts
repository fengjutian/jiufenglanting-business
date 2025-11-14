export const typeList = {
  超市: 'supermarket',
  餐饮: 'food',
  小诊所: 'clinic',
  医院: 'hospital',
  水果店: 'fruit',
  麦当劳: 'mcdonalds',
  菜市场: 'market',
  炒货: 'roasted',
  早餐: 'breakfast',
  糕点: 'bakery',
  烧烤: 'bbq',
  肯德基: 'kfc',
} as const

export type typeList = typeof typeList[keyof typeof typeList]
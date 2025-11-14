const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const raw = [
  {
    id: 1,
    name: '联品优选(玖峰兰庭店)',
    email: '1',
    address: '南京市江宁区瑞宁路与万安南路交叉口东100米',
    type: '1',
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
    type: '',
    contact: '',
    rating: null,
    latitude: 31.967829,
    longitude: 118.877457,
    otherInfo: null
  },
  {
    id: 3,
    name: '购好生活超市(祈泽佳苑店)123',
    email: '',
    address: '南京市江宁区东山街道祈泽佳苑9幢一楼102-105室',
    type: '',
    contact: '',
    rating: null,
    latitude: 31.067829,
    longitude: 118.977457,
    otherInfo: null
  }
]

async function run() {
  try {
    const normalized = raw.map((b, i) => ({
      name: b.name,
      email: (b.email && b.email.trim() !== '') ? `seed+${b.email}@example.com` : `seed-${i + 1}@example.com`,
      address: b.address || '',
      type: b.type || '',
      contact: b.contact || '',
      rating: b.rating,
      latitude: b.latitude,
      longitude: b.longitude,
      otherInfo: b.otherInfo
    }))

    const existing = await prisma.business.findMany({ select: { name: true, address: true } })
    const existingKeys = new Set(existing.map(b => `${b.name}|${b.address}`))
    const toInsert = normalized.filter(b => !existingKeys.has(`${b.name}|${b.address}`))

    if (toInsert.length > 0) {
      await prisma.business.createMany({ data: toInsert })
      console.log('inserted:', toInsert.length)
    } else {
      console.log('no new rows to insert')
    }
  } catch (e) {
    console.error('seed business error:', e)
  } finally {
    await prisma.$disconnect()
  }
}

run()
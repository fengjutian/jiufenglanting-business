import type { Prisma } from '@prisma/client'
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

type RawEntry = {
  id?: number
  name: string
  email: string
  address?: string
  type?: string
  contact?: string
  rating?: number | null
  latitude?: number | null
  longitude?: number | null
  otherInfo?: string | null
}

const { raw }: { raw: RawEntry[] } = require('./business.ts')

async function run(): Promise<void> {
  try {
    const normalized: Prisma.BusinessCreateManyInput[] = raw.map((b, i) => ({
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

    const existing: { name: string; address: string }[] = await prisma.business.findMany({ select: { name: true, address: true } })
    const existingKeys = new Set(existing.map((b) => `${b.name}|${b.address}`))
    const toInsert: Prisma.BusinessCreateManyInput[] = normalized.filter((b) => !existingKeys.has(`${b.name}|${b.address}`))

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
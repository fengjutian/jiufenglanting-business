const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function run() {
  try {
    const businessCount = await prisma.business.count()
    const shopCount = await prisma.shop.count()
    console.log('business count:', businessCount)
    console.log('shop count:', shopCount)
    const sample = await prisma.business.findMany({ take: 3, orderBy: { id: 'asc' } })
    console.log('business sample:', sample)
  } catch (e) {
    console.error('check error:', e)
  } finally {
    await prisma.$disconnect()
  }
}

run()
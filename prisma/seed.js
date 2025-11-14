const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const count = await prisma.shop.count()
  if (count === 0) {
    await prisma.shop.createMany({
      data: [
        {
          name: '九峰兰亭电子',
          owner: '张三',
          phone: '13800000000',
          address: '杭州市西湖区',
          status: 1,
          rating: 4.5,
          review: '服务很好',
          latitude: 30.2741,
          longitude: 120.1551,
          shopType: 'electronics',
          description: '主营数码产品'
        },
        {
          name: '兰亭花坊',
          owner: '李四',
          phone: '13900000000',
          address: '杭州市拱墅区',
          status: 1,
          rating: 4.2,
          review: '花材新鲜',
          latitude: 30.31,
          longitude: 120.16,
          shopType: 'flower',
          description: '鲜花礼品'
        },
        {
          name: '味道小馆',
          owner: '王五',
          phone: '13700000000',
          address: '杭州市滨江区',
          status: 1,
          rating: 4.0,
          review: '菜品不错',
          latitude: 30.206,
          longitude: 120.212,
          shopType: 'food',
          description: '家常菜与特色小吃'
        },
        {
          name: '衣尚时装店',
          owner: '赵六',
          phone: '13600000000',
          address: '杭州市上城区',
          status: 1,
          rating: 3.8,
          review: '款式新颖',
          latitude: 30.241,
          longitude: 120.171,
          shopType: 'fashion',
          description: '潮流服饰与配件'
        },
        {
          name: '萌宠之家',
          owner: '钱七',
          phone: '13500000000',
          address: '杭州市余杭区',
          status: 1,
          rating: 4.3,
          review: '宠物用品齐全',
          latitude: 30.424,
          longitude: 120.301,
          shopType: 'pet',
          description: '宠物用品与护理'
        },
        {
          name: '知书书店',
          owner: '孙八',
          phone: '13400000000',
          address: '杭州市临平区',
          status: 1,
          rating: 4.1,
          review: '环境安静适合阅读',
          latitude: 30.42,
          longitude: 120.3,
          shopType: 'book',
          description: '文学与科技类图书'
        }
      ]
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
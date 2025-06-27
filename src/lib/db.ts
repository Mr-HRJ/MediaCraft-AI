// Mock数据库客户端 - 用于演示目的
// 在生产环境中，您可以配置真实的数据库

export const prisma = {
  // Mock数据库操作
  content: {
    create: async (data: any) => {
      console.log('Mock DB: Creating content', data)
      return { id: Date.now(), ...data }
    },
    findMany: async () => {
      console.log('Mock DB: Finding content')
      return []
    }
  }
} 
import { ContentGenerator } from '@/components/ContentGenerator'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            MediaCraft AI
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            专为内容创作者打造的AI工具，输入标签即可生成爆款选题、精彩脚本和吸睛文案
          </p>
        </div>
        
        <ContentGenerator />
      </div>
      <Footer />
    </main>
  )
} 
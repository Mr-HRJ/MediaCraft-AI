import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MediaCraft AI - 新媒体内容生成工具',
  description: '专为内容创作者打造的AI工具，根据标签智能生成选题、脚本和文案',
  keywords: '新媒体,内容创作,AI写作,短视频脚本,文案生成',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
          {children}
        </div>
      </body>
    </html>
  )
} 
'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { MessageSquare, Copy, Download, Wand2, Hash, ThumbsUp } from 'lucide-react'
import type { Platform, ContentStyle, GeneratedCopy } from '@/types'

interface CopyGeneratorProps {
  content: string
  platform: Platform
  style: ContentStyle
  modelId: string
  providerId: string
  onCopyGenerated: (copy: GeneratedCopy) => void
  copy?: GeneratedCopy
}

export function CopyGenerator({ 
  content, 
  platform, 
  style, 
  modelId,
  providerId,
  onCopyGenerated,
  copy 
}: CopyGeneratorProps) {
  const [isLoading, setIsLoading] = useState(false)

  const generateCopy = async () => {
    if (!content) {
      alert('请先选择一个选题')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/generate/copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, platform, style, modelId, providerId })
      })

      if (!response.ok) {
        throw new Error('生成失败')
      }

      const data = await response.json()
      onCopyGenerated(data.copy)
    } catch (error) {
      console.error('Error generating copy:', error)
      alert('生成文案失败，请重试')
    } finally {
      setIsLoading(false)
    }
  }

  const copyCopyText = () => {
    if (!copy) return
    
    const copyText = `${copy.main_text}

${copy.hashtags.map(tag => `#${tag}`).join(' ')}

---
文案长度：${copy.length}
互动建议：${copy.engagement_tips}
表情建议：${copy.emojis_suggestion}
`.trim()

    navigator.clipboard.writeText(copyText)
    alert('文案已复制到剪贴板')
  }

  if (!content) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageSquare className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold mb-2 text-gray-600">等待内容确认</h3>
        <p className="text-gray-500">
          请先完成前面的步骤，选择选题或生成脚本，然后回到这里生成文案
        </p>
      </div>
    )
  }

  if (!copy) {
    return (
      <div className="text-center py-12">
        <div className="mb-6">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">AI文案创作</h3>
          <p className="text-gray-600 max-w-md mx-auto mb-4">
            基于你的内容和平台特性，AI将为你创作适合{platform}的{style}风格文案
          </p>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 max-w-md mx-auto mb-6">
            <p className="text-sm text-purple-800">
              <span className="font-medium">内容主题：</span>{content}
            </p>
            <p className="text-sm text-purple-600 mt-1">
              平台：{platform} | 风格：{style}
            </p>
          </div>
        </div>

        <Button 
          onClick={generateCopy}
          disabled={isLoading}
          className="mx-auto flex items-center space-x-2"
          size="lg"
        >
          <Wand2 className="h-4 w-4" />
          <span>{isLoading ? '正在创作中...' : '生成文案'}</span>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-5 w-5 text-purple-600" />
          <h3 className="text-lg font-semibold">生成的文案</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            onClick={copyCopyText}
            variant="outline"
            size="sm"
          >
            <Copy className="h-4 w-4 mr-2" />
            复制文案
          </Button>
          <Button 
            onClick={generateCopy}
            disabled={isLoading}
            variant="outline"
            size="sm"
          >
            <Wand2 className="h-4 w-4 mr-2" />
            重新生成
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {/* 主要文案 */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
          <h4 className="text-lg font-bold text-purple-900 mb-4 flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            {platform}平台文案
          </h4>
          <div className="bg-white border border-purple-300 rounded-md p-4">
            <pre className="text-gray-800 whitespace-pre-wrap font-sans text-base leading-relaxed">
              {copy.main_text}
            </pre>
          </div>
        </div>

        {/* 话题标签 */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
            <Hash className="h-4 w-4 mr-2" />
            推荐话题标签
          </h5>
          <div className="flex flex-wrap gap-2 mb-4">
            {copy.hashtags.map((tag, index) => (
              <span 
                key={index}
                className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium cursor-pointer hover:bg-blue-200 transition-colors"
                onClick={() => navigator.clipboard.writeText(`#${tag}`)}
              >
                #{tag}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-500">点击标签可单独复制</p>
        </div>

        {/* 文案统计与建议 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h5 className="font-semibold text-gray-900 mb-2">文案统计</h5>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">字数统计：</span>
                <span className="font-medium">{copy.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">平台风格：</span>
                <span className="font-medium">{style}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">话题数量：</span>
                <span className="font-medium">{copy.hashtags.length}个</span>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
              <ThumbsUp className="h-4 w-4 mr-2" />
              互动建议
            </h5>
            <p className="text-sm text-gray-600 leading-relaxed">
              {copy.engagement_tips}
            </p>
          </div>
        </div>

        {/* 表情符号建议 */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h5 className="font-semibold text-gray-900 mb-2">表情符号建议</h5>
          <p className="text-sm text-gray-700">
            {copy.emojis_suggestion}
          </p>
        </div>

        {/* 平台特性提示 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h5 className="font-semibold text-blue-900 mb-2">平台发布小贴士</h5>
          <div className="text-sm text-blue-800">
            {platform === '抖音' && (
              <p>• 发布时间建议：19:00-22:00，周末效果更佳<br/>• 记得添加定位信息增加曝光<br/>• 可配合当下热门BGM</p>
            )}
            {platform === '小红书' && (
              <p>• 建议配图4-9张，封面图要有吸引力<br/>• 多使用表情符号和换行<br/>• 可添加相关的地点标签</p>
            )}
            {platform === '微博' && (
              <p>• 适合配合热门话题发布<br/>• 可@相关博主或品牌<br/>• 注意字数限制，精简有力</p>
            )}
            {platform === 'B站' && (
              <p>• 文案可以更详细专业<br/>• 适合添加时间轴导航<br/>• 可引导用户点赞投币收藏</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 
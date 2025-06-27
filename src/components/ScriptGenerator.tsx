'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { FileText, Clock, Play, Copy, Download, Wand2 } from 'lucide-react'
import type { Platform, VideoDuration, GeneratedScript } from '@/types'

interface ScriptGeneratorProps {
  topic?: string
  platform: Platform
  duration: VideoDuration
  modelId: string
  providerId: string
  onScriptGenerated: (script: GeneratedScript) => void
  script?: GeneratedScript
}

export function ScriptGenerator({ 
  topic, 
  platform, 
  duration, 
  modelId,
  providerId,
  onScriptGenerated,
  script 
}: ScriptGeneratorProps) {
  const [isLoading, setIsLoading] = useState(false)

  const generateScript = async () => {
    if (!topic) {
      alert('请先选择一个选题')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/generate/script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, platform, duration, modelId, providerId })
      })

      if (!response.ok) {
        throw new Error('生成失败')
      }

      const data = await response.json()
      onScriptGenerated(data.script)
    } catch (error) {
      console.error('Error generating script:', error)
      alert('生成脚本失败，请重试')
    } finally {
      setIsLoading(false)
    }
  }

  const copyScript = () => {
    if (!script) return
    
    const scriptText = `
标题：${script.title}

开场：${script.hook}

正文：
${script.main_content.map((item, index) => 
  `${item.timestamp} - ${item.content}${item.visual_note ? '\n视觉提示：' + item.visual_note : ''}`
).join('\n\n')}

结尾：${script.call_to_action}

推荐标签：${script.hashtags.join(' ')}
`.trim()

    navigator.clipboard.writeText(scriptText)
    alert('脚本已复制到剪贴板')
  }

  if (!topic) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold mb-2 text-gray-600">等待选题确认</h3>
        <p className="text-gray-500">
          请先在"选题生成"标签页中选择一个选题，然后回到这里生成脚本
        </p>
      </div>
    )
  }

  if (!script) {
    return (
      <div className="text-center py-12">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">AI脚本创作</h3>
          <p className="text-gray-600 max-w-md mx-auto mb-4">
            基于选定的选题，AI将为你创作一个完整的{duration}视频脚本
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto mb-6">
            <p className="text-sm text-blue-800">
              <span className="font-medium">选定选题：</span>{topic}
            </p>
            <p className="text-sm text-blue-600 mt-1">
              平台：{platform} | 时长：{duration}
            </p>
          </div>
        </div>

        <Button 
          onClick={generateScript}
          disabled={isLoading}
          className="mx-auto flex items-center space-x-2"
          size="lg"
        >
          <Wand2 className="h-4 w-4" />
          <span>{isLoading ? '正在创作中...' : '生成脚本'}</span>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileText className="h-5 w-5 text-green-600" />
          <h3 className="text-lg font-semibold">生成的脚本</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            onClick={copyScript}
            variant="outline"
            size="sm"
          >
            <Copy className="h-4 w-4 mr-2" />
            复制脚本
          </Button>
          <Button 
            onClick={generateScript}
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
        {/* 脚本标题 */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h4 className="text-xl font-bold text-green-900 mb-2">{script.title}</h4>
          <div className="flex items-center space-x-4 text-sm text-green-700">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Play className="h-4 w-4" />
              <span>{platform}平台</span>
            </div>
          </div>
        </div>

        {/* 开场吸引 */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
            <span className="w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center mr-2">1</span>
            开场吸引（前3秒）
          </h5>
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <p className="text-gray-800">{script.hook}</p>
          </div>
        </div>

        {/* 主要内容 */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h5 className="font-semibold text-gray-900 mb-4 flex items-center">
            <span className="w-6 h-6 bg-blue-500 text-white rounded-full text-xs flex items-center justify-center mr-2">2</span>
            主要内容
          </h5>
          <div className="space-y-4">
            {script.main_content.map((item, index) => (
              <div key={index} className="border-l-4 border-blue-400 bg-blue-50 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-800">
                    {item.timestamp}
                  </span>
                </div>
                <p className="text-gray-800 mb-2">{item.content}</p>
                {item.visual_note && (
                  <div className="mt-2 p-2 bg-yellow-100 border border-yellow-300 rounded text-sm">
                    <span className="font-medium text-yellow-800">视觉提示：</span>
                    <span className="text-yellow-700">{item.visual_note}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 结尾召唤 */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
            <span className="w-6 h-6 bg-green-500 text-white rounded-full text-xs flex items-center justify-center mr-2">3</span>
            结尾召唤
          </h5>
          <div className="bg-green-50 border-l-4 border-green-400 p-4">
            <p className="text-gray-800">{script.call_to_action}</p>
          </div>
        </div>

        {/* 推荐标签 */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h5 className="font-semibold text-gray-900 mb-3">推荐话题标签</h5>
          <div className="flex flex-wrap gap-2">
            {script.hashtags.map((tag, index) => (
              <span 
                key={index}
                className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 
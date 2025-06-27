'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { Lightbulb, Wand2, ThumbsUp, Eye } from 'lucide-react'
import type { Platform, GeneratedTopic } from '@/types'

interface TopicGeneratorProps {
  tags: string[]
  platform: Platform
  modelId: string
  providerId: string
  onTopicsGenerated: (topics: GeneratedTopic[]) => void
  onTopicSelected: (topic: string) => void
  topics?: GeneratedTopic[]
}

export function TopicGenerator({ 
  tags, 
  platform, 
  modelId,
  providerId,
  onTopicsGenerated, 
  onTopicSelected,
  topics 
}: TopicGeneratorProps) {
  const [isLoading, setIsLoading] = useState(false)

  const generateTopics = async () => {
    if (tags.length === 0) {
      alert('请至少选择一个标签')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/generate/topics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tags, platform, modelId, providerId })
      })

      if (!response.ok) {
        throw new Error('生成失败')
      }

      const data = await response.json()
      onTopicsGenerated(data.topics)
    } catch (error) {
      console.error('Error generating topics:', error)
      alert('生成选题失败，请重试')
    } finally {
      setIsLoading(false)
    }
  }

  if (!topics || topics.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lightbulb className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">AI智能选题生成</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            基于你选择的标签和平台特性，AI将为你生成5个具有爆款潜力的内容选题
          </p>
        </div>

        <div className="space-y-4">
          {tags.length === 0 ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800 text-sm">
                请先在上方选择标签，然后点击生成选题
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                将基于标签: <span className="font-medium text-blue-600">{tags.join(', ')}</span> 
                为<span className="font-medium text-blue-600">{platform}</span>平台生成选题
              </p>
              <Button 
                onClick={generateTopics}
                disabled={isLoading}
                className="mx-auto flex items-center space-x-2"
                size="lg"
              >
                <Wand2 className="h-4 w-4" />
                <span>{isLoading ? '正在生成中...' : '生成选题'}</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Lightbulb className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold">生成的选题</h3>
          <span className="text-sm text-gray-500">({topics.length}个)</span>
        </div>
        <Button 
          onClick={generateTopics}
          disabled={isLoading}
          variant="outline"
          size="sm"
        >
          <Wand2 className="h-4 w-4 mr-2" />
          重新生成
        </Button>
      </div>

      <div className="grid gap-4">
        {topics.map((topic, index) => (
          <div 
            key={index}
            className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow bg-white"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <h4 className="text-lg font-semibold text-gray-900 flex-1">
                  {topic.title}
                </h4>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Eye className="h-4 w-4" />
                  <span>预估热度</span>
                  <div className="flex space-x-1">
                    {[1,2,3,4,5].map(i => (
                      <div 
                        key={i} 
                        className={`w-2 h-2 rounded-full ${
                          i <= Math.floor(Math.random() * 2) + 4 
                            ? 'bg-red-400' 
                            : 'bg-gray-200'
                        }`} 
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm leading-relaxed">
                {topic.description}
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                <div className="flex items-start space-x-2">
                  <ThumbsUp className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">推荐理由</p>
                    <p className="text-sm text-blue-700">{topic.reason}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  onClick={() => onTopicSelected(topic.title)}
                  className="flex items-center space-x-2"
                >
                  <span>选择这个选题</span>
                  <span>→</span>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 
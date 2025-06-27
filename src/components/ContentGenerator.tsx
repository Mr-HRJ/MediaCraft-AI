'use client'

import { useState } from 'react'
import { TagInput } from './TagInput'
import { TopicGenerator } from './TopicGenerator'
import { ScriptGenerator } from './ScriptGenerator'
import { CopyGenerator } from './CopyGenerator'
import { AIModelSelector } from './AIModelSelector'
import { Button } from './ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  Lightbulb, 
  FileText, 
  MessageSquare,
  Settings,
  Save
} from 'lucide-react'
import type { Platform, ContentStyle, VideoDuration } from '@/types'

interface GeneratedContent {
  topics?: any[]
  selectedTopic?: string
  script?: any
  copy?: any
}

export function ContentGenerator() {
  const [tags, setTags] = useState<string[]>([])
  const [platform, setPlatform] = useState<Platform>('抖音')
  const [contentStyle, setContentStyle] = useState<ContentStyle>('活泼有趣')
  const [videoDuration, setVideoDuration] = useState<VideoDuration>('60秒')
  const [content, setContent] = useState<GeneratedContent>({})
  const [activeTab, setActiveTab] = useState('topics')
  const [isLoading, setIsLoading] = useState(false)
  
  // AI模型配置
  const [selectedModel, setSelectedModel] = useState('deepseek-chat')
  const [selectedProvider, setSelectedProvider] = useState('deepseek')

  const platforms: Platform[] = ['抖音', '小红书', '微博', 'B站', 'Instagram', 'YouTube']
  const styles: ContentStyle[] = ['活泼有趣', '专业严谨', '温暖治愈', '幽默搞笑', '知识科普', '情感共鸣']
  const durations: VideoDuration[] = ['15秒', '30秒', '60秒', '3分钟', '5分钟+']

  const handleTagsChange = (newTags: string[]) => {
    setTags(newTags)
  }

  const handleModelChange = (modelId: string, providerId: string) => {
    setSelectedModel(modelId)
    setSelectedProvider(providerId)
  }

  const handleTopicsGenerated = (topics: any[]) => {
    setContent(prev => ({ ...prev, topics }))
    setActiveTab('topics')
  }

  const handleTopicSelected = (topic: string) => {
    setContent(prev => ({ ...prev, selectedTopic: topic }))
    setActiveTab('script')
  }

  const handleScriptGenerated = (script: any) => {
    setContent(prev => ({ ...prev, script }))
    setActiveTab('copy')
  }

  const handleCopyGenerated = (copy: any) => {
    setContent(prev => ({ ...prev, copy }))
  }

  const saveContent = async () => {
    if (!content.topics?.length) return
    
    try {
      setIsLoading(true)
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tags,
          platform,
          topic: content.selectedTopic,
          script: JSON.stringify(content.script),
          copy: JSON.stringify(content.copy),
        })
      })

      if (response.ok) {
        alert('内容已保存成功！')
      } else {
        throw new Error('保存失败')
      }
    } catch (error) {
      console.error('Save error:', error)
      alert('保存失败，请重试')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* 配置面板 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Settings className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-semibold">内容配置</h2>
        </div>
        
        {/* AI模型选择 */}
        <div className="mb-6">
          <AIModelSelector 
            selectedModel={selectedModel}
            onModelChange={handleModelChange}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">目标平台</label>
            <select 
              value={platform} 
              onChange={(e) => setPlatform(e.target.value as Platform)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {platforms.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">内容风格</label>
            <select 
              value={contentStyle} 
              onChange={(e) => setContentStyle(e.target.value as ContentStyle)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {styles.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">视频时长</label>
            <select 
              value={videoDuration} 
              onChange={(e) => setVideoDuration(e.target.value as VideoDuration)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {durations.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        <TagInput tags={tags} onTagsChange={handleTagsChange} />
      </div>

      {/* 内容生成面板 */}
      <div className="bg-white rounded-lg shadow-md">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="topics" className="flex items-center space-x-2">
              <Lightbulb className="h-4 w-4" />
              <span>选题生成</span>
            </TabsTrigger>
            <TabsTrigger value="script" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>脚本创作</span>
            </TabsTrigger>
            <TabsTrigger value="copy" className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>文案生成</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="topics" className="p-6">
            <TopicGenerator 
              tags={tags}
              platform={platform}
              modelId={selectedModel}
              providerId={selectedProvider}
              onTopicsGenerated={handleTopicsGenerated}
              onTopicSelected={handleTopicSelected}
              topics={content.topics}
            />
          </TabsContent>

          <TabsContent value="script" className="p-6">
            <ScriptGenerator 
              topic={content.selectedTopic}
              platform={platform}
              duration={videoDuration}
              modelId={selectedModel}
              providerId={selectedProvider}
              onScriptGenerated={handleScriptGenerated}
              script={content.script}
            />
          </TabsContent>

          <TabsContent value="copy" className="p-6">
            <CopyGenerator 
              content={content.selectedTopic || ''}
              platform={platform}
              style={contentStyle}
              modelId={selectedModel}
              providerId={selectedProvider}
              onCopyGenerated={handleCopyGenerated}
              copy={content.copy}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* 保存按钮 */}
      {content.topics && content.topics.length > 0 && (
        <div className="flex justify-center">
          <Button 
            onClick={saveContent}
            disabled={isLoading}
            className="flex items-center space-x-2"
            size="lg"
          >
            <Save className="h-4 w-4" />
            <span>{isLoading ? '保存中...' : '保存内容'}</span>
          </Button>
        </div>
      )}
    </div>
  )
} 
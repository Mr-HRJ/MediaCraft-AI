// 内容生成相关类型
export interface GeneratedTopic {
  title: string
  description: string
  reason: string
}

export interface TopicsResponse {
  topics: GeneratedTopic[]
}

export interface ScriptSegment {
  timestamp: string
  content: string
  visual_note: string
}

export interface GeneratedScript {
  title: string
  hook: string
  main_content: ScriptSegment[]
  call_to_action: string
  hashtags: string[]
}

export interface ScriptResponse {
  script: GeneratedScript
}

export interface GeneratedCopy {
  main_text: string
  hashtags: string[]
  emojis_suggestion: string
  length: string
  engagement_tips: string
}

export interface CopyResponse {
  copy: GeneratedCopy
}

// 平台类型
export type Platform = '抖音' | '小红书' | '微博' | 'B站' | 'Instagram' | 'YouTube'

// 内容风格类型
export type ContentStyle = '活泼有趣' | '专业严谨' | '温暖治愈' | '幽默搞笑' | '知识科普' | '情感共鸣'

// 视频时长类型
export type VideoDuration = '15秒' | '30秒' | '60秒' | '3分钟' | '5分钟+'

// 标签分类
export interface TagCategory {
  name: string
  tags: string[]
  color: string
}

// 内容保存数据结构
export interface SavedContent {
  id: string
  createdAt: Date
  updatedAt: Date
  tags: string[]
  topic?: string
  script?: string
  copy?: string
  platform?: string
  title?: string
  description?: string
  category?: string
}

// API 响应类型
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
} 
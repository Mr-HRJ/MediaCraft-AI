import OpenAI from 'openai'

// AI提供商配置
export interface AIProvider {
  id: string
  name: string
  models: AIModel[]
  apiKey: string
  baseURL?: string
}

export interface AIModel {
  id: string
  name: string
  provider: string
  maxTokens: number
  costPer1kTokens: number
}

// 支持的AI提供商配置
export const aiProviders: Record<string, AIProvider> = {
  openai: {
    id: 'openai',
    name: 'OpenAI',
    models: [
      {
        id: 'gpt-4-turbo-preview',
        name: 'GPT-4 Turbo',
        provider: 'openai',
        maxTokens: 4096,
        costPer1kTokens: 0.03
      },
      {
        id: 'gpt-4',
        name: 'GPT-4',
        provider: 'openai', 
        maxTokens: 8192,
        costPer1kTokens: 0.06
      },
      {
        id: 'gpt-3.5-turbo',
        name: 'GPT-3.5 Turbo',
        provider: 'openai',
        maxTokens: 4096,
        costPer1kTokens: 0.002
      }
    ],
    apiKey: process.env.OPENAI_API_KEY || '',
    baseURL: undefined
  },
  deepseek: {
    id: 'deepseek',
    name: 'DeepSeek',
    models: [
      {
        id: 'deepseek-chat',
        name: 'DeepSeek Chat',
        provider: 'deepseek',
        maxTokens: 4096,
        costPer1kTokens: 0.0014
      },
      {
        id: 'deepseek-coder',
        name: 'DeepSeek Coder',
        provider: 'deepseek',
        maxTokens: 4096,
        costPer1kTokens: 0.0014
      }
    ],
    apiKey: process.env.DEEPSEEK_API_KEY || '',
    baseURL: 'https://api.deepseek.com/v1'
  }
}

// 创建AI客户端
function createAIClient(providerId: string): OpenAI {
  const provider = aiProviders[providerId]
  if (!provider) {
    throw new Error(`Unsupported AI provider: ${providerId}`)
  }

  if (!provider.apiKey) {
    throw new Error(`API key not configured for provider: ${provider.name}`)
  }

  return new OpenAI({
    apiKey: provider.apiKey,
    baseURL: provider.baseURL
  })
}

// AI 提示词模板
export const prompts = {
  // 选题生成提示词
  topicGeneration: (tags: string[], platform: string) => `
你是一位专业的新媒体策划师，擅长创造爆款内容选题。

任务：根据用户提供的标签，为${platform}平台生成5个具有爆款潜力的内容选题。

用户标签：${tags.join('、')}

要求：
1. 选题要紧跟热点，具有话题性和讨论度
2. 标题要有吸引力，能引起用户好奇心
3. 内容要贴近目标受众，具有实用价值或娱乐性
4. 考虑${platform}平台的内容特点和用户喜好
5. 每个选题都要包含标题和简短的内容概述

请以JSON格式返回，结构如下：
{
  "topics": [
    {
      "title": "选题标题",
      "description": "内容概述",
      "reason": "推荐理由"
    }
  ]
}
`,

  // 脚本生成提示词
  scriptGeneration: (topic: string, platform: string, duration: string) => `
你是一位专业的短视频脚本编剧，擅长创作引人入胜的${platform}内容。

任务：为以下选题创作一个${duration}的视频脚本。

选题：${topic}
平台：${platform}
时长：${duration}

脚本要求：
1. 开头3秒要抓住观众注意力（黄金3秒原则）
2. 内容结构清晰，逻辑流畅
3. 语言生动有趣，符合平台调性
4. 包含互动元素，提升完播率
5. 结尾要有明确的行动召唤

请以JSON格式返回，结构如下：
{
  "script": {
    "title": "视频标题",
    "hook": "开头吸引段落",
    "main_content": [
      {
        "timestamp": "时间节点",
        "content": "具体内容",
        "visual_note": "视觉提示"
      }
    ],
    "call_to_action": "结尾召唤",
    "hashtags": ["相关话题标签"]
  }
}
`,

  // 文案生成提示词
  copyGeneration: (content: string, platform: string, style: string) => `
你是一位专业的新媒体文案策划师，擅长创作各平台的优质文案。

任务：为以下内容创作适合${platform}的${style}风格文案。

内容概述：${content}
目标平台：${platform}
文案风格：${style}

平台特点：
- 抖音：简洁有力，节奏感强，多用短句
- 小红书：生活化，种草感强，多用表情符号
- 微博：话题性强，容易传播，适合热点结合
- B站：深度内容，专业性强，长文案

文案要求：
1. 符合平台用户习惯和内容调性
2. 包含恰当的话题标签和关键词
3. 具有传播性和互动性
4. 字数控制在平台最佳范围内
5. 包含适当的表情符号和特殊符号

请以JSON格式返回，结构如下：
{
  "copy": {
    "main_text": "主要文案内容",
    "hashtags": ["话题标签"],
    "emojis_suggestion": "表情符号建议",
    "length": "文案字数",
    "engagement_tips": "互动建议"
  }
}
`
}

// 通用AI生成函数
async function generateWithAI(
  prompt: string,
  modelId: string,
  providerId: string,
  temperature: number = 0.7,
  maxTokens: number = 2000
) {
  const client = createAIClient(providerId)
  const provider = aiProviders[providerId]
  const model = provider.models.find(m => m.id === modelId)
  
  if (!model) {
    throw new Error(`Model ${modelId} not found for provider ${providerId}`)
  }

  try {
    const response = await client.chat.completions.create({
      model: modelId,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature,
      max_tokens: Math.min(maxTokens, model.maxTokens),
    })

    const content = response.choices[0]?.message?.content
    if (!content) throw new Error('No content generated')

    // 提取JSON内容，处理可能的代码块格式
    let jsonContent = content.trim()
    if (jsonContent.startsWith('```json')) {
      jsonContent = jsonContent.replace(/^```json\s*/, '').replace(/\s*```$/, '')
    } else if (jsonContent.startsWith('```')) {
      jsonContent = jsonContent.replace(/^```\s*/, '').replace(/\s*```$/, '')
    }

    return JSON.parse(jsonContent)
  } catch (error) {
    console.error(`Error generating with ${providerId}/${modelId}:`, error)
    throw new Error(`生成失败，请检查${provider.name}配置或重试`)
  }
}

// AI 生成函数
export async function generateTopics(
  tags: string[], 
  platform: string = '抖音',
  modelId: string = 'deepseek-chat',
  providerId: string = 'deepseek'
) {
  const prompt = prompts.topicGeneration(tags, platform)
  return await generateWithAI(prompt, modelId, providerId, 0.8, 2000)
}

export async function generateScript(
  topic: string, 
  platform: string = '抖音', 
  duration: string = '60秒',
  modelId: string = 'deepseek-chat',
  providerId: string = 'deepseek'
) {
  const prompt = prompts.scriptGeneration(topic, platform, duration)
  return await generateWithAI(prompt, modelId, providerId, 0.7, 3000)
}

export async function generateCopy(
  content: string, 
  platform: string = '抖音', 
  style: string = '活泼有趣',
  modelId: string = 'deepseek-chat',
  providerId: string = 'deepseek'
) {
  const prompt = prompts.copyGeneration(content, platform, style)
  return await generateWithAI(prompt, modelId, providerId, 0.7, 1500)
}

// 获取所有可用的AI模型
export function getAvailableModels(): AIModel[] {
  const models: AIModel[] = []
  Object.values(aiProviders).forEach(provider => {
    if (provider.apiKey) {
      models.push(...provider.models)
    }
  })
  return models
}

// 检查提供商是否可用
export function isProviderAvailable(providerId: string): boolean {
  const provider = aiProviders[providerId]
  return provider && !!provider.apiKey
} 
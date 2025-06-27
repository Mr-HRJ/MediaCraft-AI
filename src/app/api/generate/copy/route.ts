import { NextRequest, NextResponse } from 'next/server'
import { generateCopy } from '@/lib/ai'

export async function POST(request: NextRequest) {
  try {
    const { content, platform, style, modelId, providerId } = await request.json()

    if (!content) {
      return NextResponse.json(
        { error: '请提供内容' },
        { status: 400 }
      )
    }

    const result = await generateCopy(
      content, 
      platform || '抖音', 
      style || '活泼有趣',
      modelId || 'deepseek-chat',
      providerId || 'deepseek'
    )
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Copy generation error:', error)
    return NextResponse.json(
      { error: '生成文案失败，请重试' },
      { status: 500 }
    )
  }
} 
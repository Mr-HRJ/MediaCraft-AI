import { NextRequest, NextResponse } from 'next/server'
import { generateTopics } from '@/lib/ai'

export async function POST(request: NextRequest) {
  try {
    const { tags, platform } = await request.json()

    if (!tags || !Array.isArray(tags) || tags.length === 0) {
      return NextResponse.json(
        { error: '请提供有效的标签' },
        { status: 400 }
      )
    }

    const result = await generateTopics(tags, platform)
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Topics generation error:', error)
    return NextResponse.json(
      { error: '生成选题失败，请重试' },
      { status: 500 }
    )
  }
} 
import { NextRequest, NextResponse } from 'next/server'
import { generateCopy } from '@/lib/ai'

// 添加 CORS 支持
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

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
    
    return NextResponse.json(result, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    })
  } catch (error) {
    console.error('Copy generation error:', error)
    return NextResponse.json(
      { error: '生成文案失败，请重试' },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      }
    )
  }
} 
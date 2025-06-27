import { NextRequest, NextResponse } from 'next/server'
import { generateScript } from '@/lib/ai'

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
    const { topic, platform, duration, modelId, providerId } = await request.json()

    if (!topic) {
      return NextResponse.json(
        { error: '请提供选题' },
        { status: 400 }
      )
    }

    const result = await generateScript(
      topic, 
      platform || '抖音', 
      duration || '60秒',
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
    console.error('Script generation error:', error)
    return NextResponse.json(
      { error: '生成脚本失败，请重试' },
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
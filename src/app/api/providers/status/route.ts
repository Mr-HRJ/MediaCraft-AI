import { NextRequest, NextResponse } from 'next/server'
import { isProviderAvailable, aiProviders } from '@/lib/ai'

// 添加 CORS 支持
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

export async function GET() {
  try {
    const providerStatus = Object.keys(aiProviders).reduce((acc, providerId) => {
      acc[providerId] = {
        available: isProviderAvailable(providerId),
        name: aiProviders[providerId].name,
        models: aiProviders[providerId].models
      }
      return acc
    }, {} as Record<string, any>)

    return NextResponse.json(providerStatus, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    })
  } catch (error) {
    console.error('Provider status check error:', error)
    return NextResponse.json(
      { error: '检查提供商状态失败' },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      }
    )
  }
} 
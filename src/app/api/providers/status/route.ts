import { NextResponse } from 'next/server'
import { isProviderAvailable, aiProviders } from '@/lib/ai'

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

    return NextResponse.json(providerStatus)
  } catch (error) {
    console.error('Provider status check error:', error)
    return NextResponse.json(
      { error: '检查提供商状态失败' },
      { status: 500 }
    )
  }
} 
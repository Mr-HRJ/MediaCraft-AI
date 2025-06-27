'use client'

import { useState, useEffect } from 'react'
import { Bot, Zap, DollarSign, Cpu } from 'lucide-react'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectSeparator
} from './ui/select'
import { aiProviders, getAvailableModels, isProviderAvailable, type AIModel } from '@/lib/ai'

interface AIModelSelectorProps {
  selectedModel: string
  onModelChange: (modelId: string, providerId: string) => void
}

export function AIModelSelector({ selectedModel, onModelChange }: AIModelSelectorProps) {
  const [availableModels, setAvailableModels] = useState<AIModel[]>([])
  const [currentProvider, setCurrentProvider] = useState<string>('')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const models = getAvailableModels()
    setAvailableModels(models)
    
    // 设置默认模型
    if (models.length > 0 && !selectedModel) {
      const defaultModel = models.find(m => m.provider === 'deepseek') || models[0]
      onModelChange(defaultModel.id, defaultModel.provider)
      setCurrentProvider(defaultModel.provider)
    } else if (selectedModel) {
      const model = models.find(m => m.id === selectedModel)
      if (model) {
        setCurrentProvider(model.provider)
      }
    }
  }, [selectedModel, onModelChange])

  if (!isClient) {
    return (
      <div className="space-y-3">
        <div className="flex items-center space-x-2 mb-2">
          <Bot className="h-5 w-5 text-purple-600" />
          <h3 className="text-lg font-semibold">AI模型选择</h3>
        </div>
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  const handleModelChange = (value: string) => {
    const [providerId, modelId] = value.split('/')
    onModelChange(modelId, providerId)
    setCurrentProvider(providerId)
  }

  const getModelDisplayName = (model: AIModel) => {
    const provider = aiProviders[model.provider]
    return `${provider.name} - ${model.name}`
  }

  const getCurrentModel = () => {
    return availableModels.find(m => m.id === selectedModel)
  }

  const formatCost = (cost: number) => {
    return cost < 0.01 ? '< $0.01' : `$${cost.toFixed(3)}`
  }

  const currentModel = getCurrentModel()

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2 mb-2">
        <Bot className="h-5 w-5 text-purple-600" />
        <h3 className="text-lg font-semibold">AI模型选择</h3>
      </div>

      <Select 
        value={currentProvider && selectedModel ? `${currentProvider}/${selectedModel}` : ''}
        onValueChange={handleModelChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="选择AI模型..." />
        </SelectTrigger>
        <SelectContent>
          {Object.values(aiProviders).map((provider) => {
            if (!isProviderAvailable(provider.id)) return null
            
            return (
              <SelectGroup key={provider.id}>
                <SelectLabel className="flex items-center space-x-2">
                  <span>{provider.name}</span>
                  {provider.id === 'deepseek' && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                      推荐
                    </span>
                  )}
                </SelectLabel>
                {provider.models.map((model) => (
                  <SelectItem 
                    key={`${provider.id}/${model.id}`}
                    value={`${provider.id}/${model.id}`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span>{model.name}</span>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span className="flex items-center space-x-1">
                          <DollarSign className="h-3 w-3" />
                          <span>{formatCost(model.costPer1kTokens)}/1K</span>
                        </span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
                <SelectSeparator />
              </SelectGroup>
            )
          })}
        </SelectContent>
      </Select>

      {/* 当前模型信息 */}
      {currentModel && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-purple-900">
              {getModelDisplayName(currentModel)}
            </h4>
            <div className="flex items-center space-x-1 text-xs text-purple-700 bg-purple-100 px-2 py-1 rounded-full">
              <Zap className="h-3 w-3" />
              <span>已激活</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Cpu className="h-4 w-4 text-purple-600" />
              <span className="text-gray-600">最大令牌:</span>
              <span className="font-medium">{currentModel.maxTokens.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-purple-600" />
              <span className="text-gray-600">成本:</span>
              <span className="font-medium">{formatCost(currentModel.costPer1kTokens)}/1K tokens</span>
            </div>
          </div>

          {/* 成本估算 */}
          <div className="mt-3 pt-3 border-t border-purple-200">
            <p className="text-xs text-purple-700">
              <span className="font-medium">预估成本</span> - 
              单次生成约 {formatCost(currentModel.costPer1kTokens * 2)} ~ {formatCost(currentModel.costPer1kTokens * 5)}
            </p>
          </div>
        </div>
      )}

      {/* 配置状态 */}
      <div className="grid grid-cols-2 gap-2">
        {Object.values(aiProviders).map((provider) => (
          <div 
            key={provider.id}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md border text-sm ${
              isProviderAvailable(provider.id)
                ? 'bg-green-50 border-green-200 text-green-800'
                : 'bg-gray-50 border-gray-200 text-gray-500'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${
              isProviderAvailable(provider.id) ? 'bg-green-500' : 'bg-gray-400'
            }`} />
            <span>{provider.name}</span>
            <span className="text-xs">
              {isProviderAvailable(provider.id) ? '已配置' : '未配置'}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
} 
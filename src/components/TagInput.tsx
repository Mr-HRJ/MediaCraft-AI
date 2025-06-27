'use client'

import { useState, KeyboardEvent } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { X, Plus, Hash } from 'lucide-react'

interface TagInputProps {
  tags: string[]
  onTagsChange: (tags: string[]) => void
}

// 预设标签分类
const tagCategories = [
  {
    name: '内容类型',
    tags: ['美食', '旅游', '科技', '时尚', '健身', '美妆', '教育', '娱乐', '音乐', '电影'],
    color: 'bg-blue-100 text-blue-800 border-blue-200'
  },
  {
    name: '情感调性',
    tags: ['温暖', '励志', '搞笑', '治愈', '激励', '感动', '幽默', '正能量', '温馨', '浪漫'],
    color: 'bg-pink-100 text-pink-800 border-pink-200'
  },
  {
    name: '目标人群',
    tags: ['年轻人', '职场人', '学生', '宝妈', '创业者', '白领', '00后', '90后', '中年人', '老年人'],
    color: 'bg-green-100 text-green-800 border-green-200'
  },
  {
    name: '内容形式',
    tags: ['教程', '测评', 'vlog', '开箱', '对比', '盘点', '分享', '体验', '挑战', '合集'],
    color: 'bg-purple-100 text-purple-800 border-purple-200'
  }
]

export function TagInput({ tags, onTagsChange }: TagInputProps) {
  const [inputValue, setInputValue] = useState('')

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim()
    if (trimmedTag && !tags.includes(trimmedTag)) {
      onTagsChange([...tags, trimmedTag])
    }
    setInputValue('')
  }

  const removeTag = (tagToRemove: string) => {
    onTagsChange(tags.filter(tag => tag !== tagToRemove))
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag(inputValue)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Hash className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold">选择标签</h3>
      </div>

      {/* 输入框 */}
      <div className="flex space-x-2">
        <Input
          placeholder="输入自定义标签，按回车或逗号添加..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1"
        />
        <Button 
          onClick={() => addTag(inputValue)}
          disabled={!inputValue.trim()}
          size="sm"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* 已选标签 */}
      {tags.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">已选标签：</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200"
              >
                {tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 预设标签分类 */}
      <div className="space-y-4">
        <p className="text-sm font-medium text-gray-700">快速选择：</p>
        {tagCategories.map((category) => (
          <div key={category.name} className="space-y-2">
            <h4 className="text-sm font-medium text-gray-600">{category.name}</h4>
            <div className="flex flex-wrap gap-2">
              {category.tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => addTag(tag)}
                  disabled={tags.includes(tag)}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border transition-colors
                    ${tags.includes(tag) 
                      ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' 
                      : `${category.color} hover:opacity-80 cursor-pointer`
                    }`}
                >
                  {tag}
                  {tags.includes(tag) && <X className="ml-1 h-3 w-3" />}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 
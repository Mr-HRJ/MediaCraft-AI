'use client'

import { Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-600 flex items-center justify-center space-x-1">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span>for content creators</span>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            © 2024 MediaCraft AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
} 
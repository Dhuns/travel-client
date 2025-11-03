"use client"

import React from 'react'
import dynamic from 'next/dynamic'

// Container lives in src/containers/chat/Container.tsx
const Container = dynamic(() => import('@/src/containers/chat/Container'), { ssr: false })

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Container />
    </div>
  )
}

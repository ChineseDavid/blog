import LoadingText from '@/components/loadingText'
import React from 'react'

export default function HomeLoading() {
  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <div className="flex justify-center items-center space-x-1 text-sm text-text-shallow">
        <LoadingText />
      </div>
    </div>
  )
}

import { Developer } from '@/constants';
import { Metadata } from 'next';
import React from 'react'
import ToolCard from './tool-card';

export const metadata: Metadata = {
  title: '工具 - ' + Developer.name,
  description: "努力做一个更好的前端开发",
};

const ToolList = [
  { tag: ['AI', 'DeepSeek'], title: "AI对话模型", describe: "一个ai对话模型，接入了deepseek，可以帮助你解决一些问题。", time: '2025/3/5 17:28', id: 'aichat',href: '/tool/ai-chat' },
]

export default function Tool() {
  return (
    <main className="min-h-[calc(100vh-140px)]">
      <div className="max-w-screen-xl mx-auto flex min-h-screen flex-col px-6 pb-24 pt-8">
        <div className="text-4xl font-bold">实用工具</div>
        <div className="flex flex-row flex-wrap mt-6 gap-3 justify-between">
          {ToolList.map((item) => <ToolCard key={item.id} item={item} />)}
        </div>
      </div>
    </main>
  )
}

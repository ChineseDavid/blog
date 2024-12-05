import { Developer } from '@/constants';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: '博客 - ' + Developer.name,
  description: "努力做一个更好的前端开发",
};
const ArticalList = [
  {tag:['React','项目工程化'],title:"使用Shell脚本实现自动化打包",describe:"本文介绍了如何使用Shell脚本实现自动打包前端项目并且上传到服务器上",time:Date.now(),id:1},
  {tag:['Vue','项目工程化'],title:"使用Shell脚本实现自动化打包",describe:"本文介绍了如何使用Shell脚本实现自动打包前端项目并且上传到服务器上",time:Date.now(),id:2},
]

export default function Blog() {
  return (
    <main className="min-h-[calc(100vh-140px)]">
      <div className="max-w-screen-xl mx-auto flex min-h-screen flex-col px-6 pb-24 pt-8">
        <div className="text-4xl font-bold">最新文章</div>
        <div className="flex flex-row flex-wrap mt-10">
          {ArticalList.map((item) => <div key={item.id} className="flex-1 flex flex-col gap-2 p-4">
            <div className="flex gap-2">
              {item.tag.map((tag,index) => <div key={index} className="text-sm text-text-shallow bg-bg-shallow rounded-md px-2 py-1"># {tag}</div>)}
            </div>
            <div className="text-xl font-bold">{item.title}</div>
            <div className="text-sm text-text-shallow">{item.describe}</div>
            <div className="text-sm text-text-shallow">{new Date(item.time).toLocaleDateString()}</div>
          </div>)}
        </div>
      </div>
    </main>
  )
}

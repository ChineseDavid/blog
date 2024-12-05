import { Developer } from '@/constants';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: '工具 - ' + Developer.name,
  description: "努力做一个更好的前端开发",
};

const ArticalList = [
  {tag:['React','项目工程化'],title:"抽奖",describe:"抽奖小工具，当你想举办一个有奖品的活动时，不知道吃什么时，不知道做什么时，你都可以让他来帮你决定",time:Date.now(),id:1},
  {tag:['Vue','项目工程化'],title:"备忘录",describe:"其实就是一个Todo List",time:Date.now(),id:2},
]

export default function Tool() {
  return (
    <main className="min-h-[calc(100vh-140px)]">
      <div className="max-w-screen-xl mx-auto flex min-h-screen flex-col px-6 pb-24 pt-8">
        <div className="text-4xl font-bold">实用工具</div>
        <div className="flex flex-row flex-wrap mt-6">
          {ArticalList.map((item) => <div key={item.id} className="flex-1 flex flex-col gap-2 p-4 m-4 hover:cursor-pointer hover:bg-bg-shallow rounded-xl min-w-60 justify-between">
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

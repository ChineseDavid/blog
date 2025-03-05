"use client";
import { useRouter } from 'next/navigation';
import React from 'react'

interface ToolCardProps {
  item: {
    tag: string[];
    title: string;
    describe: string;
    time: string;
    id: string;
    href: string;
  }
}

export default function ToolCard({ item }: ToolCardProps) {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-2 p-4 m-4 hover:cursor-pointer hover:bg-bg-shallow rounded-xl min-w-60 justify-between w-[45%]" onClick={() => router.push(item.href)}>
      <div className="flex gap-2">
        {item.tag.map((tag, index) => <div key={index} className="text-sm text-text-shallow bg-bg-shallower rounded-md px-2 py-1"># {tag}</div>)}
      </div>
      <div className="text-xl font-bold">{item.title}</div>
      <div className="text-sm text-text-shallow">{item.describe}</div>
      <div className="text-sm text-text-shallow">{item.time}</div>
    </div>
  )
}

import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
  title: '首页 - 后台管理系统',
  description: "努力做一个更好的前端开发",
};

export default function Admin() {
  return (
    <div className='min-h-[calc(100vh-104px)] relative'>
      <div className="flex flex-col gap-3 pt-40 mx-auto w-80">
        <div className="text-3xl">欢迎使用后台管理系统</div>
        <div className="text-text-shallower">你可能想 ··· 🧐</div>
        <div className="flex gap-3">
          <Link href='/admin/tag' className='text-bg-normal bg-text-normal rounded-md p-2 hover:bg-text-shallow transition text-sm'>管理标签</Link>
          <Link href='/admin/blog' className='text-bg-normal bg-text-normal rounded-md p-2 hover:bg-text-shallow transition text-sm'>管理博客</Link>
          <Link href='/admin/comment' className='text-bg-normal bg-text-normal rounded-md p-2 hover:bg-text-shallow transition text-sm'>管理评论</Link>
        </div>
      </div>
      <div className="absolute bottom-2 right-2 text-sm text-text-shallow">PS: 本来想放一些图表什么的，但是刚开始也没什么数据，就先这样吧·</div>
    </div>
  )
}

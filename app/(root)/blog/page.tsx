import { getBlogs } from '@/actions';
import { Developer } from '@/constants';
import { Metadata } from 'next';
import React from 'react'
import BlogCard from './blog-card';

export const metadata: Metadata = {
  title: '博客 - ' + Developer.name,
  description: "努力做一个更好的前端开发",
};

export default async function Blog() {
  const res = await getBlogs();
  return (
    <main className="min-h-[calc(100vh-140px)]">
      <div className="max-w-screen-xl mx-auto flex min-h-screen flex-col px-6 pb-24 pt-8">
        <div className="text-4xl font-bold">最新文章</div>
        <div className="flex flex-row gap-3 justify-between flex-wrap mt-10">
          {res.data.map((item) => <BlogCard key={item.id} {...item} />)}
        </div>
      </div>
    </main>
  )
}

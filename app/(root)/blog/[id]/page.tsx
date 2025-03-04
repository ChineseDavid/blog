import { getBlogById } from '@/actions';
import React from 'react'
import ViewBlogConent from './view-blog-conent';

interface ViewBlogPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ViewBlogPage({params}: ViewBlogPageProps) {
  const {id} = await params;
  const blog = await getBlogById(id);
  let body = <>查询博客数据失败</>
  if(blog) {
    body = <ViewBlogConent data={blog} />
  }
  return (
    <main className="min-h-[calc(100vh-140px)]">
      <div className="max-w-screen-lg mx-auto flex min-h-screen flex-col px-6 pb-24 pt-8">
        {body}
      </div>
    </main>
  )
}

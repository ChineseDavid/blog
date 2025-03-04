import { prisma } from '@/prisma';
import React from 'react'
import EditBlog from './edit-blog';

interface SearchPageProps {
  searchParams: Promise<{ id: string }>;
}

export default async function EditBlogPage({searchParams}: SearchPageProps) {
  const {id} = await searchParams;
  if(id){
    const getBlogById = async (id: string) => {
      return prisma.blog.findUnique({
        where: {
          id: id,
        },
        include: {
          tags: true,
        }
      })
    }
    const blog = await getBlogById(id);
    if(!blog) return <div>查询博客数据失败</div>;
    return <EditBlog data={{
      id: blog.id,
      title:blog.title,
      describe: blog.describe,
      content: blog.content,
      tags: blog.tags.map((item) => item.id).join(','),
    }}/>
  }else{
    return <EditBlog/>
  }
}

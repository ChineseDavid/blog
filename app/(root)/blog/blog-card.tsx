"use client";
import { formatDate } from '@/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'

interface BlogCardProps {
  id: string;
  title: string;
  describe: string;
  updatedAt: string | Date;
  tags: {
    name: string;
    tagImg?: string;
  }[]
}

export default function BlogCard(blog: BlogCardProps) {
  const router = useRouter();
  return (
    <div className="w-[45%] flex flex-col gap-2 p-4 hover:bg-bg-shallow hover:cursor-pointer rounded-xl" onClick={() => router.push('/blog/' + blog.id)}>
      <div className="flex gap-2">
        {blog.tags.map((tag, index) =>
          <div key={index} className="text-sm text-text-shallow bg-bg-shallower rounded-md px-2 py-1 flex items-center">
            # {tag.name}
            {tag.tagImg && <Image src={tag.tagImg} alt={'tagImg'} width={40} height={40} className='size-5 ml-1' />}
          </div>
        )}
      </div>
      <div className="text-xl font-bold">{blog.title}</div>
      <div className="text-sm text-text-shallow">{blog.describe}</div>
      <div className="text-sm text-text-shallow">{formatDate(blog.updatedAt)}</div>
    </div>
  )
}

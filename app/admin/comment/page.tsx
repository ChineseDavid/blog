import Button from '@/components/button';
import Input from '@/components/input';
import React from 'react';
import CommentTable from './comment-table';
import { getMyComment } from '@/actions';
import { formatDate } from '@/utils';


export default async function Tag() {
  const commentData = await getMyComment();
  const tableData = commentData.data?.map((item) => {
    return {
      key: item.id,
      blogName: item.blog.title,
      content: item.content,
      updateTime: formatDate(item.createdAt),
      id: item.id,
    };
  }) || [];
  return (
    <div>
      <div className="text-2xl p-3 mb-3">我的评论</div>
      <div className="flex mb-3">
        <Input />
        <Button name="搜索" icon="search" className='ml-3' />
      </div>
      <CommentTable data={tableData} />
    </div>
  )
}

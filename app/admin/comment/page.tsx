"use client";
import Button from '@/components/button';
import Input from '@/components/input';
import React, { useEffect, useState } from 'react';
import CommentTable from './comment-table';
import { getMyComment } from '@/actions';
import { formatDate } from '@/utils';
import { TableRow } from '@/components/table';



export default function Tag() {
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const [keyword, setKeyword] = useState('');
  const fetchData = async (str = '') => {
    const commentData = await getMyComment(str);
    const data = commentData.data?.map((item) => {
      return {
        key: item.id,
        blogName: item.blog.title,
        content: item.content,
        updateTime: formatDate(item.createdAt),
        id: item.id,
      };
    }) || [];
    setTableData(data);
  }
  useEffect(() => {
    fetchData();
  }, [])
  return (
    <div>
      <div className="text-2xl p-3 mb-3">我的评论</div>
      <div className="flex mb-3 flex-wrap gap-3">
        <Input value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        <Button name="搜索" icon="search" onClick={() => fetchData(keyword)} />
      </div>
      <CommentTable data={tableData} />
    </div>
  )
}

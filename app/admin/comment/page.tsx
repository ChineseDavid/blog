"use client";
import Button from '@/components/button';
import IconButton from '@/components/iconButton';
import Input from '@/components/input';
import Table from '@/components/table';
import React from 'react';

const TableData = [
  { name: "Vue", img: "无", count: 3, isByMe: '是', updateTime: "2023-09-09", key: '1' },
  { name: "React", img: "无", count: 10, isByMe: '是', updateTime: "2024-09-09", key: '2' },
  { name: "Next.js", img: "无", count: 5, isByMe: '否', updateTime: "2024-10-09", key: '3' },
]

export default function Tag() {

  const TableColumns = [
    { title: "标签名", dataKey: "name", icon: 'text', width: 100 },
    { title: "图标", dataKey: "img", icon: 'img', width: 100 },
    { title: "使用次数", dataKey: "count", icon: 'count', width: 100 },
    { title: "由我创建", dataKey: "isByMe", icon: 'geren', width: 120 },
    { title: "更新时间", dataKey: "updateTime", icon: 'time', width: 120 },
    {
      title: "", dataKey: "operate", width: 120, renderCell: () => <div className="flex gap-4">
      <IconButton name="shanchu" />
      </div>
    },
  ];


  return (
    <div>
      <div className="text-2xl p-3 mb-3">我的评论</div>
      <div className="flex mb-3">
        <Input />
        <Button name="搜索" icon="search" className='ml-3' />
      </div>
      <Table
        columns={TableColumns}
        data={TableData}
      />
    </div>
  )
}

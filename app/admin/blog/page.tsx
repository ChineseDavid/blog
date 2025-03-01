"use client";
import Button from '@/components/button';
import IconButton from '@/components/iconButton';
import Input from '@/components/input';
import Table from '@/components/table';
import React from 'react';

const TableData = [
  { blogName: "Vue核心原理", describe: "vue的核心原理是什么，怎么实现的", up: 10, down: 1, createTime: "2023-09-09", key: '1' },
  { blogName: "React渲染机制", describe: "React的渲染机制是什么，他是怎么优化性能的", up: 10, down: 1, createTime: "2023-10-09", key: '2' },
  { blogName: "前端常用的10种设计模式", describe: "前端有10种常用的设计模式，如单例模式，工厂模式，等··", up: 10, down: 1, createTime: "2024-08-09", key: '3' },
]

export default function Blog() {

  const TableColumns = [
    { title: "博客名称", dataKey: "blogName", icon: 'blog', width: 200 },
    { title: "描述", dataKey: "describe", icon: 'text', width: 400 },
    { title: "赞", dataKey: "up", icon: 'up', width: 100 },
    { title: "踩", dataKey: "down", icon: 'down', width: 100 },
    { title: "更新时间", dataKey: "createTime", icon: 'time', width: 120 },
    {
      title: "", dataKey: "operate", width: 120, renderCell: () => <div className="flex gap-4">
        <IconButton name="edit" />
        <IconButton name="shanchu" />
      </div>
    },
  ];


  return (
    <div>
      <div className="text-2xl p-3 mb-3">我的博客</div>
      <div className="flex mb-3">
        <Input />
        <Button name="搜索" icon="search" className='ml-3' />
        <Button name="创建" icon="add" className='ml-3' onClick={()=>{
          router.push('/admin/blog/edit')
        }} />
      </div>
      <Table
        columns={TableColumns}
        data={TableData}
      />
    </div>
  )
}

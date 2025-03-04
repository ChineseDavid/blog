"use client";
import { deleteBlog, getBlogs } from '@/actions';
import Button from '@/components/button';
import Confirm from '@/components/confirm';
import IconButton from '@/components/iconButton';
import Input from '@/components/input';
import Table, { TableRow } from '@/components/table';
import { formatDate } from '@/utils';
import { addToast } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';


export default function Blog() {
  const router = useRouter();
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const [keyword, setKeyword] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');

  const TableColumns = [
    { title: "博客名称", dataKey: "title", icon: 'text', width: 200 },
    { title: "描述", dataKey: "describe", icon: 'text', width: 400 },
    { title: "更新时间", dataKey: "updatedTime", icon: 'time', width: 120 },
    { title: "创建时间", dataKey: "createdTime", icon: 'time', width: 120 },
    {
      title: "", dataKey: "operate", width: 120, renderCell: (row: TableRow) => <div className="flex gap-4">
        <IconButton name="edit" onClick={() => router.push('/admin/blog/edit?id=' + row.key)} />
        <IconButton name="shanchu" onClick={() => {
          setDeleteId(row.key);
          setIsOpen(true);
        }} />
      </div>
    },
  ];
  
  const fetchData = async (query: string) => {
    const r = await getBlogs(query);
    const tableData = r.data.map((item) => {
      return {
        key: item.id,
        title: item.title,
        describe: item.describe,
        createdTime: formatDate(item.createdAt),
        updatedTime: formatDate(item.updatedAt),
      }
    });
    setTableData(tableData);
  }
  const deleteHandle = async (isConfirm: boolean) => {
    if (isConfirm){
      const r = await deleteBlog(deleteId);
      addToast({
        title: "提示",
        description: r.message,
        timeout: 3000,
      });
    }
    setIsOpen(false);
    fetchData(keyword);
  }


  useEffect(() => {
    fetchData('');
  }, [])

  return (
    <div>
      <div className="text-2xl p-3 mb-3">我的博客</div>
      <div className="flex mb-3">
        <Input value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        <Button name="搜索" icon="search" className='ml-3' onClick={() => fetchData(keyword)} />
        <Button name="创建" icon="add" className='ml-3' onClick={() => {
          router.push('/admin/blog/edit')
        }} />
      </div>
      <Table
        columns={TableColumns}
        data={tableData}
      />
      <Confirm isOpen={isOpen} content={'确认要删除么'} onClose={deleteHandle} />
    </div>
  )
}

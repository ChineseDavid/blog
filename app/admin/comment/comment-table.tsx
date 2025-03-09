"use client";
import { deleteComment } from '@/actions';
import Confirm from '@/components/confirm';
import IconButton from '@/components/iconButton';
import Table, { TableRow } from '@/components/table';
import { addToast } from '@heroui/react';
import React, { useState } from 'react'

interface CommentTableProps {
  data: TableRow[];
}

export default function CommentTable({ data }: CommentTableProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const TableColumns = [
    { title: "评论博客", dataKey: "blogName", icon: 'text', width: 200 },
    { title: "评论内容", dataKey: "content", icon: 'img', width: 400 },
    { title: "评论时间", dataKey: "updateTime", icon: 'time', width: 180 },
    {
      title: "", dataKey: "operate", width: 80, renderCell: (row: TableRow) => <div className="flex gap-4">
        <IconButton name="shanchu" onClick={() => {
          setDeleteId(row.key);
          setIsOpen(true);
        }} />
      </div>
    },
  ];

  const deleteHandle = async (isConfirm: boolean) => {
    if (isConfirm){
      const r = await deleteComment(deleteId);
      addToast({
        title: "提示",
        description: r.message,
        timeout: 3000,
      });
    }
    setIsOpen(false);
  }


  return (
    <>
      <Table
        columns={TableColumns}
        data={data}
      />
      <Confirm isOpen={isOpen} content={'确认要删除么'} onClose={deleteHandle} />
    </>
  )
}
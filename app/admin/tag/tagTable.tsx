"use client";
import IconButton from '@/components/iconButton';
import Table, { TableColumn, TableRow } from '@/components/table';
import React from 'react'

export default function TagTable({ data }: { data: TableRow[] }) {

  const TableColumns: TableColumn[] = [
    { title: "标签名", dataKey: "name", icon: 'text', width: 100 },
    { title: "图标", dataKey: "img", icon: 'img', width: 100 },
    { title: "使用次数", dataKey: "count", icon: 'count', width: 100 },
    { title: "由我创建", dataKey: "isByMe", icon: 'geren', width: 120 },
    { title: "创建时间", dataKey: "createdTime", icon: 'time', width: 120 },
    {
      title: "", dataKey: "operate", width: 120, renderCell: (row: TableRow) => <div className="flex gap-4">
        {row.isByMe === '是' && <IconButton name="edit" />}
        {row.isByMe === '是' && <IconButton name="shanchu" />}
      </div>
    },
  ];

  return (
    <Table
      columns={TableColumns}
      data={data}
    />
  )
}

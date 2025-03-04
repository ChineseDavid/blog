"use client";
import IconButton from '@/components/iconButton';
import Table, { TableColumn, TableRow } from '@/components/table';
import { TagData } from '@/constants/tag';
import Image from 'next/image';
import React, { useState } from 'react'
import CreateTagModal from './createTagModal';
import { deleteTag } from '@/actions';

export default function TagTable({ data, onRefresh }: { data: TableRow[], onRefresh: () => void }) {
  const [visible, setVisible] = useState(false);
  const [editTag, setEditTag] = useState<TagData | null>();

  const TableColumns: TableColumn[] = [
    { title: "标签名", dataKey: "name", icon: 'text', width: 100 },
    {
      title: "图标", dataKey: "tagImg", icon: 'img', width: 100, renderCell: (row: TableRow) =>
        row.tagImg && <Image src={String(row.tagImg)} width={40} height={40} alt="img" className="w-7 h-7 rounded-full" />
      // row.tagImg && <Image src={''} width={40} height={40} alt="img" className="w-7 h-7 rounded-full" />
    },
    { title: "使用次数", dataKey: "count", icon: 'count', width: 100 },
    { title: "由我创建", dataKey: "isByMe", icon: 'geren', width: 120 },
    { title: "创建时间", dataKey: "createdTime", icon: 'time', width: 120 },
    {
      title: "", dataKey: "operate", width: 120, renderCell: (row: TableRow) => <div className="flex gap-4">
        {row.isByMe === '是' && <IconButton name="edit" onClick={() => {
          setEditTag({
            id: String(row.id),
            name: String(row.name),
            code: String(row.code),
          });
          setVisible(true);
        }} />}
        {row.isByMe === '是' && <IconButton name="shanchu" onClick={() => {
          deleteTag(String(row.id));
          onRefresh();
        }} />}
      </div>
    },
  ];

  return (
    <>
      <Table
        columns={TableColumns}
        data={data}
      />
      {visible && (
        <CreateTagModal data={editTag!} onClose={() => {
          setVisible(false)
          onRefresh();
        }
        } />
      )}
    </>
  )
}

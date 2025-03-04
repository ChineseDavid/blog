"use client"
import React, { useEffect, useState } from 'react';
import TagTable from './tagTable';
import { getTags } from '@/actions/tag';
import TagForm from './tagForm';
import { TableRow } from '@/components/table';

export default function Tag() {
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const [keyword, setKeyword] = useState('');
  const fetchData = async (query: string) => {
    const r = await getTags(query);
    const tableData = r.data.map((item) => {
      return {
        ...item,
        isByMe: item.isByMe ? '是' : '否',
        createdTime: item.createdAt,
      }
    });
    setTableData(tableData);
  }
  useEffect(() => {
    fetchData(keyword);
  }, [keyword])
  return (
    <div>
      <div className="text-2xl p-3 mb-3">所有标签</div>
      <TagForm onKeyValueChange={setKeyword} onRefresh={() => fetchData(keyword)} />
      <TagTable data={tableData} onRefresh={() => fetchData(keyword)} />
    </div>
  )
}

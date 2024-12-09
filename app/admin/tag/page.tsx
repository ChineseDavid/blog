import React from 'react';
import TagTable from './tagTable';
import { getTags } from '@/actions/tag';
import TagForm from './tagForm';

export default async function Tag() {
  const r = await getTags();
  const tableData = r.data.map((item) => {
    return {
      ...item,
      isByMe: item.isByMe? '是' : '否',
      createdTime: item.createdAt,
    }
  });
  return (
    <div>
      <div className="text-2xl p-3 mb-3">所有标签</div>
      <TagForm />
      <TagTable data={tableData} />
    </div>
  )
}

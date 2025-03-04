import { BytemdViewer } from '@/components/plugin/viewer';
import { formatDate } from '@/utils';
import React from 'react';
import CommentCreateForm from './comment-create-form';
import CommentList from './comment-list';

interface ViewBlogProps {
  id: string;
  title: string;
  describe: string;
  content: string;
  createdAt: string | Date;
  tags: {
    id: string;
    name: string;
    tagImg: string;
  }[];
}

export default function ViewBlogConent({ data }: { data: ViewBlogProps }) {
  return (
    <>
      <div className="text-4xl font-bold my-8">{data.title}</div>
      <div className="text-text-shallow mb-3">{data.describe}</div>
      <div className="text-text-shallow mb-8">发布于 {formatDate(data.createdAt)}</div>
      <BytemdViewer body={data.content} />
      <CommentCreateForm blogId={data.id} isOpen/>
      <CommentList blogId={data.id}/>
    </>
  )
}

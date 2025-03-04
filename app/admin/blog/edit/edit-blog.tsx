"use client";
import { createBlog, getTags, updateBlog } from '@/actions';
import Button from '@/components/button'
import Input from '@/components/input'
import Select, { SelectItem } from '@/components/select';
import Textarea from '@/components/textarea'
import classNames from 'classnames'
import React, { useActionState, useEffect, useState } from 'react'
import Editor from '@/components/plugin/editor'
import { useParams, useRouter } from 'next/navigation';
import CreateTagModal from '../../tag/createTagModal';

interface BlogProps {
  id: string;
  title: string;
  describe: string;
  content: string;
  tags: string;
}
export default function EditBlog({ data }: { data?: BlogProps }) {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [tagData, setTagData] = useState<SelectItem[]>([]);
  const [visible, setVisible] = useState(false);
  const [editorText, setEditorText] = useState(data?.content || '');
  const getTagData = async () => {
    const r = await getTags();
    setTagData(r.data.map(item => ({ name: item.name, value: item.id })));
  }
  const saveBlogHandle = async (formData: FormData) => {
    formData.append('content', editorText);
    let res;
    if (data) {
      formData.append('id', data.id);
      res = await updateBlog(formData);
    } else {
      res = await createBlog(formData);
    }
    if (res.success) {
      setMessage('');
      router.back();
    } else {
      setMessage(res.message);
    }
  }
  useEffect(() => {
    getTagData();
  }, [])
  return (
    <>
      <form className='py-2' action={saveBlogHandle}>
        <div className="mb-2 text-2xl flex justify-between">
          创建博客
          <Button name='返回' size='sm' onClick={() => router.back()} />
        </div>
        <div className="mb-2">
          <Input name='title' label="标题" required defaultValue={data?.title} className='w-full' />
        </div>
        <div className="mb-2 flex items-end">
          <Select name='tags' label="标签" data={tagData} defaultValue={data?.tags} className='flex-1' />
          <Button name='创建标签' size='lg' onClick={() => setVisible(true)} className='ml-2' />
        </div>
        <div className="mb-2">
          <Textarea name='describe' label="描述" defaultValue={data?.describe} className='w-full' />
        </div>
        <div className="mb-2">
          <div className='block mb-2 text-sm text-text-shallow'>内容</div>
          <Editor value={editorText} onChange={st => setEditorText(st)} />
        </div>
        <div className="text-right mt-6">
          {message && <p className='text-red-500 text-sm'>{message}</p>}
          <Button name='保存' type='submit' />
        </div>
      </form>
      {visible && (
        <CreateTagModal onClose={() => {
          setVisible(false);
          getTagData();
        }
        } />
      )}
    </>
  )
}

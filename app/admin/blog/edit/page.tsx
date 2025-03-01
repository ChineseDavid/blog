"use client";
import { createBlog, getTags } from '@/actions';
import Button from '@/components/button'
import Input from '@/components/input'
import Select, { SelectItem } from '@/components/select';
import Textarea from '@/components/textarea'
import classNames from 'classnames'
import React, { useActionState, useEffect, useState } from 'react'
import Editor from '@/components/plugin/editor'
import { useRouter } from 'next/navigation';
import CreateTagModal from '../../tag/createTagModal';


export default function EditBlog() {
  const router = useRouter();
  const [tagData, setTagData] = useState<SelectItem[]>([]);
  const [visible, setVisible] = useState(false);
  const [editorText, setEditorText] = useState('');
  const [state, formAction] = useActionState(createBlog, { errors: {} })
  const getTagData = async () => {
    const r = await getTags();
    setTagData(r.data.map(item => ({ name: item.name, value: item.tagId })));
    console.log(r);
  }
  const saveBlogHandle = async (formData: FormData) => {
    const title = formData.get('title');
    const tags = formData.get('tags');
    const describe = formData.get('describe');
    formData.append('content', editorText);
    formAction(formData);
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
          <Input name='title' label="标题" required defaultValue={''} className='w-full' />
        </div>
        <div className="mb-2 flex items-end">
          <Select name='tags' label="标签" data={tagData} className='flex-1' />
          <Button name='创建标签' size='md' onClick={() => setVisible(true)} className='ml-2' />
        </div>
        <div className="mb-2">
          <Textarea name='describe' label="描述" defaultValue={''} className='w-full' />
        </div>
        <div className="mb-2">
          <div className='block mb-2 text-sm text-text-shallow'>内容</div>
          <Editor value={editorText} onChange={st => setEditorText(st)} />
        </div>
        <div className="text-right mt-6">
          {/* {message && <p className='text-red-500 text-sm'>{message}</p>} */}
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

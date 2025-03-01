import { createTag, updateTag } from '@/actions/tag';
import Button from '@/components/button';
import Input from '@/components/input'
import Modal from '@/components/modal'
import Textarea from '@/components/textarea';
import React from 'react';
import { TagData } from '@/constants/tag';
import classNames from 'classnames';

interface CreateTagModalProps {
  data?: TagData;
  onClose?: () => void;
}

export default function CreateTagModal({ data, onClose }: CreateTagModalProps) {
  const createHandle = async (formData: FormData) => {
    if (data) {
      const r = await updateTag(formData);
      if (r.success) {
        onClose?.();
      }
    } else {
      const r = await createTag(formData);
      if (r.success) {
        onClose?.();
      }
    }
  }
  return (
    <Modal onClose={onClose}>
      <div className="w-[400px] min-h-40 p-7">
        <h1 className="text-xl font-bold mb-7">{data ? '编辑标签' : '创建标签'}</h1>
        <form action={createHandle}>
          <div className="mb-2">
            <Input name='tagName' label="标签名称" required defaultValue={data?.tagName} className='w-full' />
          </div>
          <div className={classNames("mb-2", {
            hidden: !!data
          })} >
            <Input name='tagId' label="标签ID" required defaultValue={data?.tagId} className='w-full' />
          </div>
          <div className="mb-2">
            <Textarea name='tagCode' label="标签代码（svg）" defaultValue={data?.tagCode} className='w-full' />
          </div>
          <div className="text-right mt-6">
            {message && <p className='text-red-500 text-sm'>{message}</p>}
            <Button name='保存' type='submit' />
          </div>
        </form>
      </div>
    </Modal>
  )
}

import { createTag } from '@/actions/tag';
import Button from '@/components/button';
import Input from '@/components/input'
import Modal from '@/components/modal'
import Textarea from '@/components/textarea';
import React, { useState } from 'react'

interface CreateTagModalProps {
  onClose?: () => void;
}

export default function CreateTagModal({ onClose }: CreateTagModalProps) {
  const [message, setMessage] = useState('');
  const createHandle = async (formData: FormData) => {
    const tagName = formData.get('tagName') as string;
    const tagCode = formData.get('tagCode') as string;
    const tagId = formData.get('tagId') as string;
    if (!tagName || !tagId) {
      setMessage('名称和ID不能为空');
      return;
    }
    const data = await createTag({
      tagName,
      tagCode,
      tagId,
    });
    if (data.success) {
      onClose?.();
    }
  }
  return (
    <Modal onClose={onClose}>
      <div className="w-[400px] min-h-40 p-7">
        <h1 className="text-xl font-bold mb-7">创建标签</h1>
        <form action={createHandle}>
          <div className="mb-2">
            <Input name='tagName' label="标签名称" required className='w-full' />
          </div>
          <div className="mb-2">
            <Input name='tagId' label="标签ID" required className='w-full' />
          </div>
          <div className="mb-2">
            <Textarea name='tagCode' label="标签代码（svg）" className='w-full' />
          </div>
          <div className="text-right mt-6">
            {message && <p className='text-red-500 text-sm'>{message}</p>}
            <Button name='创建' type='submit' />
          </div>
        </form>
      </div>
    </Modal>
  )
}

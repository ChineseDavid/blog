"use client";
import Button from '@/components/button'
import Input from '@/components/input'
import React, { useState } from 'react'
import CreateTagModal from './createTagModal';

export default function TagForm() {
  const [visible, setVisible] = useState(false);

  const onCreate = () => {
    setVisible(true);
  }
  return (
    <div className="flex mb-3">
      <Input />
      <Button name="搜索" icon="search" className='ml-3' />
      <Button name="创建" icon="add" className='ml-3' onClick={onCreate} />
      {visible && <CreateTagModal onClose={() => setVisible(false)} />}
    </div>
  )
}

import classNames from 'classnames'
import React from 'react'

type Size = 'sm' | 'md' | 'lg';

export default function Input({ size = 'md' }: { size?: Size }) {
  return (
    <input type="text" className={classNames('rounded-md border',{
      'h-8 w-48 px-2': size === 'sm',
      'h-9 w-52 px-3': size === 'md',
    })} placeholder='请输入' />
  )
}

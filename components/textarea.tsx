import classNames from 'classnames'
import React, { useId } from 'react'

type Size = 'sm' | 'md' | 'lg';
interface TextareaProps {
  size?: Size;
  name?: string;
  label?: string;
  placeholder?: string;
  className?: string;
  value?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function Textarea({ label, name, placeholder = "请输入", required, value, onChange, className, size = 'md' }: TextareaProps) {
  const id = useId();
  return (
    <>
      {label && <label htmlFor={id} className={classNames("block mb-2 text-sm text-text-shallow",{
        "after:content-['*'] after:ml-0.5 after:text-red-500": required,
      })}>{label}</label>}
      <textarea name={name} id={id} placeholder={placeholder} value={value} className={classNames(
        'py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500',
        {
          'h-20 px-2': size === 'sm',
          'h-24 px-3': size === 'md',
        }, className)} onChange={onChange} />
    </>
  )
}

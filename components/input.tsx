import classNames from 'classnames'
import React, { useId } from 'react'

type Size = 'sm' | 'md' | 'lg';
interface InputProps {
  size?: Size;
  type?: 'text' | 'password' | 'email' | 'number';
  name?: string;
  label?: string;
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ label, name, type = 'text', placeholder = "请输入", value, onChange, className, size = 'md' }: InputProps) {
  const id = useId();
  return (
    <>
      {label && <label htmlFor={id} className="block mb-2 text-sm text-text-shallow">{label}</label>}
      <input type={type} name={name} id={id} placeholder={placeholder} value={value} className={classNames(
        'w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500',
        {
          'h-8 w-48 px-2': size === 'sm',
          'h-9 w-52 px-3': size === 'md',
        }, className)} onChange={onChange}/>
    </>
  )
}

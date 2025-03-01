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
  defaultValue?: string;
  required?: boolean;
}

export default function Input({ label, name, type = 'text', required, placeholder = "请输入", defaultValue, value, onChange, className, size = 'md' }: InputProps) {
  const id = useId();
  return (
    <>
      {label && <label htmlFor={id} className={classNames("block mb-2 text-sm text-text-shallow", {
        "after:content-['*'] after:ml-0.5 after:text-red-500": required,
      })}>{label}</label>}
      <input type={type} name={name} id={id} placeholder={placeholder} defaultValue={defaultValue} value={value} className={classNames(
        'py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500',
        {
          'h-8 px-2': size === 'sm',
          'h-9 px-3': size === 'md',
        }, className)} onChange={onChange} />
    </>
  )
}

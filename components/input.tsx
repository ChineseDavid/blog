import classNames from 'classnames'
import React from 'react'
import { Input as HeroInput } from "@heroui/react";


interface InputProps {
  type?: 'text' | 'password' | 'email' | 'number';
  name?: string;
  label?: string;
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
  required?: boolean;
  disabled?: boolean;
}

export default function Input({ label, name, type = 'text', required, placeholder = "请输入", defaultValue, value, onChange, className, disabled }: InputProps) {
  return (
    <>
      {label && <label className={classNames("block mb-2 text-sm text-text-shallow", {
        "after:content-['*'] after:ml-0.5 after:text-red-500": required,
      })}>{label}</label>}
      <HeroInput type={type} name={name} placeholder={placeholder} defaultValue={defaultValue} value={value} onChange={onChange} disabled={disabled} className={classNames('w-56', className)} />
    </>
  )
}

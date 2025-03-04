import classNames from 'classnames'
import React from 'react'
import { Textarea as HeroTextarea } from "@heroui/react";

interface TextareaProps {
  name?: string;
  label?: string;
  placeholder?: string;
  className?: string;
  value?: string;
  defaultValue?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Textarea({ label, name, placeholder = "请输入", required, defaultValue, value, onChange, className }: TextareaProps) {
  return (
    <>
      {label && <label className={classNames("block mb-2 text-sm text-text-shallow", {
        "after:content-['*'] after:ml-0.5 after:text-red-500": required,
      })}>{label}</label>}
      <HeroTextarea name={name} placeholder={placeholder} value={value} defaultValue={defaultValue} className={className} onChange={onChange} />
    </>
  )
}

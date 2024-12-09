"use client";
import { register } from '@/actions';
import Button from '@/components/button'
import Input from '@/components/input'
import Link from 'next/link'
import React, { useState } from 'react'

export default function RegisterForm() {
  // const [state, formAction] = useFormState(register, initState);
  const [message, setMessage] = useState<string>("");

  const formAction = async (formData: FormData) => {
    const password = formData.get("createPassword");
    const r_password = formData.get("r_createPassword");
    if (password !== r_password) {
      setMessage("两次输入的密码不一致");
      return;
    }
    const data = await register(formData);
    if (!data.success) {
      setMessage(String(data.message));
    }else {
      setMessage("");
    }
    console.log('ydw c', data);
  }
  return (
    <form action={formAction}>
      <div className="mb-4">
        <Input label='昵称' name="createUsername" placeholder='2-20个字符' className='w-full' />
      </div>
      <div className="mb-4">
        <Input label='用户ID' name="createUserId" placeholder='3-20个字符' className='w-full' />
      </div>
      <div className="mb-4">
        <Input label='密码' name="createPassword" type='password' placeholder='需包含一个小写字母、一个大写字母、一个数字' className='w-full' />
      </div>
      <div className="mb-4">
        <Input label='确认密码' name="r_createPassword" type='password' placeholder='请再次输入密码' className='w-full' />
      </div>
      <div className="mb-4">
        {message && <p className='text-red-400'>{message}</p>}
        <Button className='w-full text-center' type='submit' name="注册 并 登录" size='lg'></Button>
      </div>
      <div className='mb-4 text-text-shallower'>
        注册登录即表示同意
        <Link className='hover:underline-offset-1 text-blue-600' href="/user-agreement">《用户协议》</Link>
        和
        <Link className='hover:underline-offset-1 text-blue-600' href="/privacy-policy">《隐私政策》</Link>
      </div>
    </form>
  )
}

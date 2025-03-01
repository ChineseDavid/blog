import React from 'react'
import LoginButtons from './login-buttons';
interface SearchPageProps {
  searchParams: Promise<{ callbackUrl: string }>;
}
export default async function Login({ searchParams }: SearchPageProps) {
  const { callbackUrl } = await searchParams;

  return (
    <section className='w-screen h-screen flex items-center justify-center'>
      <div className="container mx-auto">
        <div className="max-w-md mx-auto my-3 p-5 border rounded-xl shadow-xl">
          <div className="text-center">
            <h1 className="my-3 text-3xl font-semibold text-text-normal">登录</h1>
            <p className="text-text-shallower">请选择以下任一方式进行登录</p>
          </div>
          <div className="m-3 flex gap-3 justify-center">
            <LoginButtons callbackUrl={callbackUrl}/>
          </div>
        </div>
      </div>
    </section>
  )
}

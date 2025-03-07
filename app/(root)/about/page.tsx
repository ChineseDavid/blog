import IconButton from '@/components/iconButton'
import { Developer } from '@/constants'
import React, { Fragment } from 'react'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '关于 - ' + Developer.name,
  description: "努力做一个更好的前端开发",
};

function Title1({ title }: { title: string }) {
  return (
    <div className="text-3xl font-bold mt-10 mb-5">{title}</div>
  )
}
function Title2({ title }: { title: string }) {
  return (
    <div className="text-2xl font-bold mt-6 mb-4">{title}</div>
  )
}
function Tag({ name }: { name: string[] }) {
  return (
    <div className="inline-flex gap-2">
      {name.map((item, index) => {
        return (
          <Fragment key={index}>
            {index !== 0 && <span>+</span>}
            <div key={item} className="inline-block text-sm text-text-shallow font-medium rounded-md px-2 py-1 bg-text-shallowest"># {item}</div>
          </Fragment>
        )
      })}
    </div>
  )
}

function SkillList({ items }: { items: { tag?: string[], text: string }[] }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index} className="text-text-shallow py-1 relative pl-8">
          <span className='inline-block size-1 rounded-md bg-text-shallower absolute left-2 top-1/2 transform -translate-y-1/2'></span>
          {item.tag && <Tag name={item.tag} />}
          {item.tag && ' , '}
          {item.text}
        </li>
      ))}
    </ul>
  );
};



export default function About() {
  return (
    <main className="min-h-[calc(100vh-140px)]">
      <div className="min-h-full max-w-screen-md px-6 md:px-10 2xl:max-w-6xl mx-auto py-10">
        <div className="text-4xl font-bold">关于</div>
        <Title1 title='我是谁' />
        <div className="text-text-shallow py-1">{Developer.detail}</div>
        <Title1 title='我的技能' />
        <Title2 title="前端" />
        <SkillList items={Developer.FESkills} />
        <Title2 title="后端" />
        <SkillList items={Developer.BESkills} />
        <Title2 title="其他" />
        <SkillList items={Developer.OtherSkills} />
        <Title1 title='联系我' />
        <div className="flex items-center justify-start">
          <IconButton name="email" className='mr-6' />
          <div className="text-text-shallow py-1">a6445144b@163.com</div>
        </div>
      </div>
    </main>
  )
}

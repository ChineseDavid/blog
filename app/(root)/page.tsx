import { Metadata } from "next";
import { Developer } from "@/constants";
import GradientText from "@/components/gradientText";

export const metadata: Metadata = {
  title: Developer.name,
  description: "努力做一个更好的前端开发",
};

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-190px)]">
      <div className="relative grid h-[calc(100vh-64px)] place-content-center">
        <div className="flex min-h-full  max-w-screen-md flex-col justify-center gap-5 px-6 md:px-10 2xl:max-w-7xl">
          <p className="animate-fade-up text-2xl tracking-widest animate-ease-in-out md:text-5xl" >你好，我是</p>
          <strong className="text-5xl md:text-8xl bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent" >{Developer.name}</strong>
          <div className="animate-fade-up animate-ease-in-out" >
            <GradientText className="text-2xl tracking-widest md:text-5xl" text={["一名前端开发工程师 。","A Web <Developer /> ."]} />
          </div>
          <p className="text-2xl md:text-5xl tracking-widest animate-fade-up animate-ease-in-out" >
            喜欢
            <span className="font-semibold text-[#00d8ff]">React</span>
            、
            <span className="font-semibold text-[#007acc]">TypeScript</span>
            <span className="ml-4">\owo/ ~</span></p><p className="text-base md:text-2xl text-muted-foreground tracking-widest animate-fade-up animate-ease-in-out" >我在这个网站记录我的成长，努力 💪 成为一个更好的程序员。</p>
          <div className="flex space-x-4 animate-fade-up animate-ease-in-out" >
            <a className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-bgNormal hover:bg-accent hover:text-accent-foreground h-9 px-3" href="/blog">我的博客</a>
            <a className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-bgNormal hover:bg-accent hover:text-accent-foreground h-9 px-3" href="/about">关于我</a>
          </div>
        </div>
      </div>
    </main>
  );
}

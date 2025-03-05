import Chat from "./chat";

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-140px)]">
      <div className="max-w-screen-xl mx-auto flex min-h-screen flex-col px-6 pb-24 pt-8">
        <h1 className="text-3xl font-bold mb-8">AI对话助手</h1>
        <Chat />
      </div>
    </main>
  );
}
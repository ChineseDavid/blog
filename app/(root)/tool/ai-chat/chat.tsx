// components/ChatInterface.tsx
"use client";
import { Button, Input } from '@heroui/react';
import { useEffect, useRef, useState } from 'react';

export default function Chat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{ role: string, content: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 新增useEffect监听isLoading变化
  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');



    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      const { content } = await response.json();
      setMessages([...newMessages, { role: 'assistant', content }]);
    } catch (error) {
      console.error('对话错误:', error);
      setMessages([...newMessages, { role: 'assistant', content: "服务暂时不可用" }]);
    } finally {
      setIsLoading(false);
      console.log('focus', inputRef.current);
    }
  };

  return (
    <div className="w-[600px] mx-auto p-4 border rounded-lg">
      <div className="mb-4 h-96 overflow-y-auto">
        <div className="text-text-shallow text-center my-2 text-sm">已接入DeepSeek V3大模型</div>
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 mb-2 rounded ${msg.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
            <strong>{msg.role === 'user' ? '你' : 'AI'}:</strong> {msg.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1"
          placeholder="输入你的问题..."
          disabled={isLoading}
          ref={inputRef}
        />
        <Button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? '发送中...' : '发送'}
        </Button>
      </form>
    </div>
  );
}
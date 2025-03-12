// app/api/chat/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { messages } = await req.json();
  try {
    const response = await fetch(process.env.DEEPSEEK_API_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages,
        temperature: 0.7
      })
    });

    // 手动处理非200响应
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API Error: ${errorData?.message || response.status}`);
    }

    const responseData = await response.json();
    return NextResponse.json({
      content: responseData.choices[0].message.content
    });
    
  } catch (error: unknown) {
    if(error instanceof Error){
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }else {
      return NextResponse.json(
        { error: "AI服务请求失败" },
        { status: 500 }
      );

    }
  }
}
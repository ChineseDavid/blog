import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // const {login,password} = await request.json();

  // // 调用后端接口
  // const r = await fetch('',{
  //   method:'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body:JSON.stringify({
  //     login,password
  //   })
  // });
  // const data = await r.json();

  // return NextResponse.json({data});
  // 存储cookie

  const response = NextResponse.json({
    success: true,
    msg: '登录成功',
  })
  response.cookies.set('token', 'kasjdbcikjzxbciwubvcksdjhfbksjd', {
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
    path: '/'
  })
  return response;


}
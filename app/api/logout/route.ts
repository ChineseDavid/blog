import { NextResponse } from "next/server";

export async function DELETE() {
  const response = NextResponse.json({
    success: true,
    msg: '退出成功',
  })
  response.cookies.set('token', '', {
    maxAge: 0,
    httpOnly: true,
    path: '/'
  })
  return response;


}
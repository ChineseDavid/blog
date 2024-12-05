import * as React from "react";

import { type Metadata } from "next";


export const metadata: Metadata = {
  title: '博客管理 - 后台管理系统',
  description: "努力做一个更好的前端开发",
};

export default function Layout({ children }: React.PropsWithChildren) {
  return <>{children}</>;
}

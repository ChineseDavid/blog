
import GitHub from "next-auth/providers/github"
import Gitee from "@/providers/gitee"
import type { NextAuthConfig } from "next-auth"
 
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [GitHub, Gitee],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    session({ session, token }) {
      if (session.user && token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    authorized({ request, auth }) {
      // 将来用作 Next.js middleware，如果是访问后台页面，校验是否登录
      if (request.nextUrl.pathname.startsWith('/admin')) {
        return !!auth?.user;
      }

      // 其它路径直接放行
      return true;
    },
  }
} satisfies NextAuthConfig
/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true
    }
  },
  images: {
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
      },
      {
        hostname: "gitee.com"
      }
    ],
  },
  // 正式环境下需要添加以下配置
  // experimental: {
  //   serverActions: {
  //     allowedOrigins:[
  //       'ydwspace.com'
  //     ]
  //   }
  // }
};

export default nextConfig;

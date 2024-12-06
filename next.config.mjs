/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    // 确保中间件的路径等配置正确
    middleware: ['middleware.js']
  }
};

export default nextConfig;

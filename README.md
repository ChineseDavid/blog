你可以通过clone这个项目快速搭建自己的个人博客系统  
预览地址 https://ydwspace.cn  
# 环境
node v20.14.0
pnpm 9.13.2
# 安装
```
pnpm i
```
# 生成数据库
```
npx prisma db push
npx prisma generate
```
# 配置环境变量
项目内使用OAuth支持了Github、Gitee登录  
如果想保留这些功能，可能要配置一下环境变量
```
# auth相关
AUTH_SECRET="***" # Added by `npx auth`. Read more: https://cli.authjs.dev
# Github
# 获取路径
# 登录github Setting->页面左侧滚到底部 Developer Settings->OAuth Apps->New OAuth App
# 本地开发的配置如下
# Homepage URL：http://localhost:3000/
# Authorization callback URL：http://localhost:3000/api/auth/callback/github
# 其他信息正常填写就行，创建成功后就能拿到 id 和 secret 了。
AUTH_GITHUB_ID="***"
AUTH_GITHUB_SECRET="***"
# Gitee
# 获取路径
# 账号设置->第三方应用->创建应用
# 信息填写类似Github 回调地址以本地为例 http://localhost:3000/api/auth/callback/gitee
AUTH_GITEE_ID="***"
AUTH_GITEE_SECRET="***"
# DeepSeek
# key在Deepseek官网可以登陆后生成一个。PS：可能会有一定的费用
DEEPSEEK_API_KEY="***"
DEEPSEEK_API_URL="https://api.deepseek.com/v1/chat/completions"
```
# 运行项目
```
pnpm dev
```

export const RouterList = [
  {
    path: '/',
    name: '首页',
  },
  {
    path: '/blog',
    name: '博客'
  },
  {
    path: '/tool',
    name: '工具'
  },
  {
    path: '/about',
    name: '关于'
  },
];

export const AdminRouterList = [
  {
    path: '/admin',
    name: '首页',
  },
  {
    path: '/admin/tag',
    name: '标签管理',
  },
  {
    path: '/admin/blog',
    name: '博客管理',
  },
  {
    path: '/admin/blog/edit',
    name: '编辑博客',
    hide: true,
  },
  {
    path: '/admin/comment',
    name: '评论管理',
  },
]

export const Developer = {
  name: '杨大卫',
  desc: '爱编码的游戏玩家，享受解决问题的过程',
  detail:'Hi~ 我是杨大卫，一名前端开发工程师，2019年本科毕业，喜欢 Coding 和打游戏',
  FESkills: [
    { tag: ["HTML", "CSS", "JavaScript"], text: "拥有扎实的前端基本功" },
    { tag: ["TypeScript", "React", "Next.js", "Taiwind CSS"], text: "开发过企业级前端应用" },
    { tag: ["Webpack", "Gulp", "Eslint"], text: "掌握前端工程化能力" },
  ],
  BESkills: [
    { tag: ["Node.js"], text: "能简单CURD水平，PS：会前端的应该都会node吧" },
    { tag: ["Next.js"+"Prisma"+'SqLite'], text: "搞全栈开发" },
  ],
  OtherSkills: [
    { tag: ["CentOS","Debian","ubuntu"],text: "熟悉Linux操作命令" },
    { tag: ["Nginx"],text: "部署网站，开启https，反向代理" },
    { tag: ["PhotoShop"],text: "会一点，用来p图，扣图，有时候没UI只能自己上🥲" },
    { tag: ["AI"],text: "熟练使用 Google/豆包/Deepseek 搜索，能解决99%的问题" },
  ]
}
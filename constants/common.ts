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
    path: '/admin/comment',
    name: '评论管理',
  },
]

export const Developer = {
  name: '杨大卫',
  desc: '努力做一个更好的程序员',
  FESkills: [
    { tag: ["HTML", "CSS", "JavaScript"], text: "熟练使用" },
    { tag: ["TypeScript", "React", "Next.js", "Taiwind CSS"], text: "熟练使用" },
  ],
  BESkills: [
    { tag: ["Node.js"], text: "能简单CURD水平" },
    { tag: ["Next.js"+"Prisma"+'SqLite'], text: "搞全栈开发" },
  ],
  OtherSkills: [
    { text: "用过CentOS、Debian" },
    { tag: ["Nginx"],text: "部署网站，开启https，反向代理" },
    { tag: ["PhotoShop"],text: "会一点，用来p图，扣图" },
    { text: "熟练使用 Google/AI豆包 搜索，解决遇到的各种问题。PS：AI真的很好用" },
  ]
}
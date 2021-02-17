const menu1 =[
  {
    path: '/user',
    name: '用户管理',
    icon: 'el-icon-menu',

    level: 1,
    sort: 1,
    children: [
      {
        path: '/userInfo',
        name: '用户信息',
        icon: 'el-icon-menu',
        level: 1,
        sort: 1,
        children: [],
        fixed: false
      },
    ],
    fixed: false
  },
]

export default menu1

const menu =[
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
  }, {
    path: '/Administration',
    name: '办公管理',
    icon: 'el-icon-menu',

    level: 1,
    sort: 1,
    children: [
      {
        path: '/Administration/IndustryAdministration',
        name: '行业管理',
        icon: 'el-icon-menu',
        level: 1,
        sort: 1,
        children: [],
        fixed: false
      }, {
        path: '/Administration/EnterpriseAdministration',
        name: '企业管理',
        icon: 'el-icon-menu',
        level: 1,
        sort: 1,
        children: [],
        fixed: false
      }, {
        path: '/Administration/TouristAdministration',
        name: '游客管理',
        icon: 'el-icon-menu',
        level: 1,
        sort: 1,
        children: [],
        fixed: false
      }

    ],
    fixed: false
  },{
    path: '/shopFood',
    name: '餐饮管理',
    icon: 'el-icon-menu',

    level: 1,
    sort: 1,
    children: [
      {
        path: '/shopFoodInfo',
        name: '餐饮展示',
        icon: 'el-icon-menu',
        level: 1,
        sort: 1,
        children: [],
        fixed: false
      }

    ],
    fixed: false
  },{
    path: '/person',
    name: '个人中心',
    icon: 'el-icon-menu',

    level: 1,
    sort: 1,
    children: [
      {
        path: '/personInfo',
        name: '我的信息',
        icon: 'el-icon-menu',
        level: 1,
        sort: 1,
        children: [],
        fixed: false
      }

    ],
    fixed: false
  },
]

export default menu

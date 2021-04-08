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
      }, {
        path: '/Administration/DepartmentAdministration',
        name: '部门管理',
        icon: 'el-icon-menu',
        level: 1,
        sort: 1,
        children: [],
        fixed: false
      }


    ],
    fixed: false
  }, {
    path: '/IndustryRegulation',
    name: '行业监管',
    icon: 'el-icon-menu',
    level: 1,
    sort: 1,
    children: [
      {
        path: '/IndustryRegulation/hotelIndustryRegulation',
        name: '酒店行业管理',
        icon: 'el-icon-menu',
        level: 1,
        sort: 1,
        children: [],
        fixed: false
      }, {
        path: '/IndustryRegulation/restaurantIndustryRegulation',
        name: '餐饮行业管理',
        icon: 'el-icon-menu',
        level: 1,
        sort: 1,
        children: [],
        fixed: false
      }, {
        path: '/IndustryRegulation/trafficIndustryRegulation',
        name: '交通行业管理',
        icon: 'el-icon-menu',
        level: 1,
        sort: 1,
        children: [],
        fixed: false
      }


    ],
    fixed: false
  },{
    path: '/PeopleSupervise',
    name: '百姓监督',
    icon: 'el-icon-menu',
    level: 1,
    sort: 1,
    children: [
      {
        path: '/PeopleSupervise/enterpriseSupervise',
        name: '百姓旅游企业监督',
        icon: 'el-icon-menu',
        level: 1,
        sort: 1,
        children: [],
        fixed: false
      },{
        path: '/PeopleSupervise/peopleIndustrySupervise',
        name: '百姓服务行业监督',
        icon: 'el-icon-menu',
        level: 1,
        sort: 1,
        children: [],
        fixed: false
      },{
        path: '/PeopleSupervise/peopleDepartmentSupervise',
        name: '百姓管理部门监督',
        icon: 'el-icon-menu',
        level: 1,
        sort: 1,
        children: [],
        fixed: false
      }


    ],
    fixed: false
  },{
    path: '/TourismServiceStation',
    name: '旅游服务站',
    icon: 'el-icon-menu',
    level: 1,
    sort: 1,
    children: [
      {
        path: '/TourismServiceStation/TourismConsultation',
        name: '旅游咨询',
        icon: 'el-icon-menu',
        level: 1,
        sort: 1,
        children: [],
        fixed: false
      },{
        path: '/TourismServiceStation/BookTicketsManager',
        name: '旅游预定',
        icon: 'el-icon-menu',
        level: 1,
        sort: 1,
        children: [],
        fixed: false
      },{
        path: '/TourismServiceStation/PurchasingAgent',
        name: '票务代购',
        icon: 'el-icon-menu',
        level: 1,
        sort: 1,
        children: [],
        fixed: false
      },{
        path: '/TourismServiceStation/AccommodationReservation',
        name: '食宿预定',
        icon: 'el-icon-menu',
        level: 1,
        sort: 1,
        children: [],
        fixed: false
      },{
        path: '/TourismServiceStation/AccommodationRecommendation',
        name: '食宿推荐',
        icon: 'el-icon-menu',
        level: 1,
        sort: 1,
        children: [],
        fixed: false
      }


    ],
    fixed: false
  }, {
    path: '/DepartmentSupervise',
    name: '部门监督',
    icon: 'el-icon-menu',
    level: 1,
    sort: 1,
    children: [
      {
        path: '/DepartmentSupervise/enterpriseSupervise',
        name: '旅游企业监督',
        icon: 'el-icon-menu',
        level: 1,
        sort: 1,
        children: [],
        fixed: false
      },
      {
        path: '/DepartmentSupervise/DepartmentIndustrySupervise',
        name: '服务行业监督',
        icon: 'el-icon-menu',
        level: 1,
        sort: 1,
        children: [],
        fixed: false
      },
      {
        path: '/DepartmentSupervise/DepartmentpeopleSupervise',
        name: '游客质量监督',
        icon: 'el-icon-menu',
        level: 1,
        sort: 1,
        children: [],
        fixed: false
      }



    ],
    fixed: false
  },{
    path: '/MarktingManager',
    name: '媒体营销',
    icon: 'el-icon-menu',
    level: 1,
    sort: 1,
    children: [
      {
        path: '/MarktingManager/NewMarkting',
        name: '新媒体营销',
        icon: 'el-icon-menu',
        level: 1,
        sort: 1,
        children: [],
        fixed: false
      },{
        path: '/MarktingManager/OldMarkting',
        name: '传统媒体营销',
        icon: 'el-icon-menu',
        level: 1,
        sort: 1,
        children: [],
        fixed: false
      }
    ],
    fixed: false
  },{
    path: '/InvestmentManager',
    name: '行业协同',
    icon: 'el-icon-menu',
    level: 1,
    sort: 1,
    children: [
      {
        path: '/InvestmentManager/InvestPromoInfo',
        name: '招商策划',
        icon: 'el-icon-menu',
        level: 1,
        sort: 1,
        children: [],
        fixed: false
      },{
        path: '/InvestmentManager/InvestPromo',
        name: '招商信息',
        icon: 'el-icon-menu',
        level: 1,
        sort: 1,
        children: [],
        fixed: false
      }
    ],
    fixed: false
  },{
    path: '/PersonManager',
    name: '人员培训',
    icon: 'el-icon-menu',
    level: 1,
    sort: 1,
    children: [
      {
        path: '/PersonManager/CustomerService',
        name: '客服人员',
        icon: 'el-icon-menu',
        level: 1,
        sort: 1,
        children: [],
        fixed: false
      },{
        path: '/PersonManager/Guide',
        name: '导游',
        icon: 'el-icon-menu',
        level: 1,
        sort: 1,
        children: [],
        fixed: false
      },{
        path: '/PersonManager/Industry',
        name: '行业人员',
        icon: 'el-icon-menu',
        level: 1,
        sort: 1,
        children: [],
        fixed: false
      },{
        path: '/PersonManager/Prosecution',
        name: '检查人员',
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

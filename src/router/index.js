import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from "../views/Login";
import UserInfo from '../views/UserInfo'
import Home from "../views/Home";
import IndustryAdministration from "../views/Administration/IndustryAdministration";
import EnterpriseAdministration from "../views/Administration/EnterpriseAdministration";
import InvestPromoInfo from "../views/InvestmentManager/InvestPromoInfo";
import InvestPromo from "../views/InvestmentManager/InvestPromo";
import TouristAdministration from "../views/Administration/TouristAdministration";
import CustomerService from "../views/PersonManager/CustomerService"
import Guide from "../views/PersonManager/Guide"
import Industry from "../views/PersonManager/Industry"
import Prosecution from "../views/PersonManager/Prosecution"
import PersonInfo from "../views/PersonInfo";
import DepartmentAdministration from  "../views/Administration/DepartmentAdministration";
import hotelIndustryRegulation  from  "../views/IndustryRegulation/hotelIndustryRegulation";
import restaurantIndustryRegulation  from  "../views/IndustryRegulation/restaurantIndustryRegulation";
import trafficIndustryRegulation  from  "../views/IndustryRegulation/trafficIndustryRegulation";
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta:{
        title:'主页',
        requireAuth: true
      },
      children:[
        {
          path: '/userInfo',
          name: 'UserInfo',
          component: UserInfo,
          meta:{
            title:'用户信息',
            requireAuth: true
          }
        },
        {
          path: '/IndustryRegulation/hotelIndustryRegulation',
          name: 'hotelIndustryRegulation',
          component: hotelIndustryRegulation,
          meta:{
            title:'酒店行业管理',
            requireAuth: true
          }
        },
        {
          path: '/IndustryRegulation/restaurantIndustryRegulation',
          name: 'restaurantIndustryRegulation',
          component: restaurantIndustryRegulation,
          meta:{
            title:'餐饮行业管理',
            requireAuth: true
          }
        },
        {
          path: '/IndustryRegulation/trafficIndustryRegulation',
          name: 'trafficIndustryRegulation',
          component: trafficIndustryRegulation,
          meta:{
            title:'交通行业管理',
            requireAuth: true
          }
        },

        {
          path: '/Administration/IndustryAdministration',
          name: 'IndustryAdministration',
          component: IndustryAdministration,
          meta:{
            title:'行业管理',
            requireAuth: true
          }
        },
        {
          path: '/Administration/DepartmentAdministration',
          name: 'DepartmentAdministration',
          component: DepartmentAdministration,
          meta:{
            title:'部门管理',
            requireAuth: true
          }
        },
        {
          path: '/Administration/TouristAdministration',
          name: 'TouristAdministration',
          component: TouristAdministration,
          meta:{
            title:'游客管理',
            requireAuth: true
          }
        },
        {
          path: '/Administration/EnterpriseAdministration',
          name: 'EnterpriseAdministration',
          component: EnterpriseAdministration,
          meta:{
            title:'企业管理',
            requireAuth: true
          }
        },
        {
          path: '/InvestmentManager/InvestPromoInfo',
          name: 'InvestPromoInfo',
          component: InvestPromoInfo,
          meta:{
            title:'招商策划',
            requireAuth: true
          }
        },
        {
          path: '/InvestmentManager/InvestPromo',
          name: 'InvestPromo',
          component: InvestPromo,
          meta:{
            title:'招商信息',
            requireAuth: true
          }
        },
        {
          path: '/PersonManager/CustomerService',
          name: 'CustomerService',
          component: CustomerService,
          meta:{
            title:'客服人员培训',
            requireAuth: true
          }
        },
        {
          path: '/PersonManager/Guide',
          name: 'Guide',
          component: Guide,
          meta:{
            title:'导游培训',
            requireAuth: true
          }
        },
        {
          path: '/PersonManager/Industry',
          name: 'Industry',
          component: Industry,
          meta:{
            title:'行业人员培训',
            requireAuth: true
          }
        },
        {
          path: '/PersonManager/Prosecution',
          name: 'Prosecution',
          component: Prosecution,
          meta:{
            title:'检查人员培训',
            requireAuth: true
          }
        },
        {
          path: '/personInfo',
          name: 'PersonInfo',
          component: PersonInfo,
          meta:{
            title:'个人中心',
            requireAuth: true
          }
        }
      ],
    },
  ]
})

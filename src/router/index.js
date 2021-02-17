import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from "../views/Login";
import UserInfo from '../views/UserInfo'
import Home from "../views/Home";
import IndustryAdministration from "../views/Administration/IndustryAdministration";
import EnterpriseAdministration from "../views/Administration/EnterpriseAdministration";
import TouristAdministration from "../views/Administration/TouristAdministration";
import ShopFoodInfo from "../views/ShopFoodInfo";
import PersonInfo from "../views/PersonInfo";
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
          path: '/Administration/IndustryAdministration',
          name: 'IndustryAdministration',
          component: IndustryAdministration,
          meta:{
            title:'行业管理',
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
          path: '/shopFoodInfo',
          name: 'ShopFoodInfo',
          component: ShopFoodInfo,
          meta:{
            title:'餐饮展示',
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

<template>
  <div>
<!--    主容器-->
    <el-container>
<!--      头部容器-->
      <el-header class="page-header">
        <br>
<!--        下拉菜单-->
        <el-dropdown>
          <span class="el-dropdown-link">
            欢迎您：{{username}}<i class="el-icon-arrow-down el-icon--right"/>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
<!--      主体容器-->
      <el-container>
<!--        菜单容器-->
        <el-aside class="page-menu">
          <!--        菜单-->
          <el-menu
            :default-active="$route.path"
            :router=true
            class="el-menu-vertical-demo">
            <el-submenu style="background-color: #3bb5ff" :index="item.path" v-for="(item,index) in menu" :key="index" v-if="item.children.length>0">
              <template slot="title">
                <i :class="item.icon"/>
                <span>{{item.name}}</span>
              </template>
              <el-menu-item-group style="background-color: aquamarine">
                <el-menu-item v-for="(i,index) in item.children" :key="index" :index="i.path" :route="i.path">
                  {{i.name}}
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item  style="background-color: #3bb5ff"  :index="item.path" v-for="(item,index) in menu" :key="index" v-if="item.children.length === 0"
                          :route="item.path">
              <i :class="item.icon"/>
              <span>{{item.name}}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
<!--        路由页面容器-->
        <el-main class="page-main">
<!--          下划线-->
          <el-divider/>
<!--          路由页面-->
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import menu from "../router/menu";
  import menu1 from "../router/menu1";
  import store from "../store"
  export default {
    name: "Home",
    data() {
      return {
        name: '',
        menu: [],
        username: '使用者'
      };
    },
    created() {
      this.username = store.state.common.user_name;
      if(this.username === 'SoulMen' ) {
        this.menu = menu
      }else {
        this.menu = menu
      }

    },
  }
</script>

<style scoped>
  @import "../assets/css/main.css";


</style>

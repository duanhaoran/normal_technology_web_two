<template>
  <div>
    <img src="../assets/login.png">
    <div>
      <div class="login">
        <h1>系统登录</h1>
        <el-row>
          <el-col :span="10">用户名：</el-col>
          <el-col :span="12">
            <el-input v-model="user.username" placeholder="请输入用户名"/>
          </el-col>
        </el-row>
        <br>
        <el-row>
          <el-col :span="10">密码：</el-col>
          <el-col :span="12">
            <el-input v-model="user.password" placeholder="请输入密码"/>
          </el-col>
        </el-row>
        <br>
        <el-row>
          <el-col :span="8" :offset="4">
            <el-button type="primary" @click="handleLogin()">登录</el-button>
          </el-col>
          <el-col :span="8">
            <el-button type="primary">注册</el-button>
          </el-col>
        </el-row>
      </div>
      <br>
    </div>
  </div>
</template>

<script>
  import store from "../store";
  import menu from "../router/menu";
  export default {
    data() {
      return {
        user: {
          username: '',
          password: '',
        },
        input: ''
      }
    },
    name: "Login",
    methods: {
      handleLogin() {
        let username = this.user.username;
        let password = this.user.password;
        // this.$message.success(username+password)
        this.axios({
          method: 'POST',
          url: '/api/loginController/login',
          data: {
            userName: username,
            password:password
          },
          timeout: 5*1000
        }).then((response) =>{
          if (response.data.code === 200) {
            const result = response;
            this.$message.success("登录成功！")
            const token = result.data.data.AllToken;
            this.$store.dispatch(
              'common/user_name',
              username
            );
            this.$store.dispatch(
              'common/set_token',
              token
            );
            this.$router.push('/')
          }else{
            this.$message.error("登陆失败！请检查用户名或密码")
          }
        });
          this.$axios.get(
            '/api/user/selectUserByAny',
            {pageNum:1,pageSize:1,userName:this.user.username},
            (res) => {
              if (res.resultCode === 1) {
                this.$store.dispatch(
                  'common/user_id',
                  res.date.dataList[0].userId
                );
              }
            }
          );

      }
    }
  }
</script>

<style scoped>
  .login {
    box-shadow: 2px 2px 5px #000;
    height: 300px;
    width: 400px;
    margin-left: auto;
    margin-right: auto;
    padding-top: 10px
  }
</style>

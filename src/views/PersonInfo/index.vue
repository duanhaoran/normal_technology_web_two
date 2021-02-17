<!--
  - Created by SoulMen
  -->

<!--
  - Created by SoulMen
  -->

<template>
  <el-container>

    <el-header style="height: 20%" >
      <h1  :class="get()" >我的信息</h1>
    </el-header>



    <el-container style="height: 500px">
      <el-aside width="35%" style="height: 500px">

        <div style="align:center;">
          <div style="padding-top: 100px;padding-bottom: 50px">

<!--            <el-image-->
<!--              :src=url+logo-->
<!--            ></el-image>-->
          </div>

          <el-upload
            class="upload-demo"
            ref="upload"
            action="E:\2.student\基于智能推荐的点餐系统设计与实现\程序设计\Project\src\main\resources\static\user"
            accept="image/png,image/jpeg"
            list-type="picture-card"
            :limit="1"
            :auto-upload="false"
            :on-exceed="handleExceed"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="uploadsuccess">
<!--            <i class="el-icon-plus"></i>-->

<!--          <el-upload-->
<!--            class="upload-demo"-->
<!--            action="https://jsonplaceholder.typicode.com/posts/"-->
<!--            :on-preview="handlePreview"-->
<!--            :on-remove="handleRemove"-->
<!--            :before-remove="beforeRemove"-->
<!--            multiple-->
<!--            :limit="3"-->
<!--            :on-exceed="handleExceed"-->
<!--            :file-list="fileList">-->
            <el-button size="small" type="primary">更新头像</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </div>

      </el-aside>



      <el-main style="height: 500px">
        <div>

                    <el-form
                      :model="resultList"
                       label-width="80px" label-position="left">
                      <el-form-item>
                        <el-image
                          style="width: 100px; height: 100px"
                          :src=userurl+resultList.userLogo
                        ></el-image>
                      </el-form-item>
                      <el-form-item label="用户姓名">
                        <span>{{resultList.userName}}</span>
                    </el-form-item>
                      <el-form-item label="用户年龄">
                        <span>{{resultList.userAge}}</span>
                      </el-form-item>
                      <el-form-item label="用户性别">
                        <span>{{resultList.userSex}}</span>
                      </el-form-item>
                      <el-form-item label="用户密码">
                        <span>{{resultList.password}}</span>
                      </el-form-item>
                    </el-form>




        </div>
            <div>
              <el-button type="primary" @click="updateUser" plain>信息修改</el-button>
            </div>
        <el-dialog title="信息修改" :visible.sync="updateUserVisible1" center width="40%" top="6vh">
          <!-- 下划线 -->
          <el-divider><i class="el-icon-mouse"/></el-divider>
          <!-- 信息添加 -->
          <el-form :model="userall1" label-width="80px" label-position="left" >
            <!--信息列表-->
            <el-form-item label="用户编号" prop="userId">
              <el-col :span="12">
                <el-input v-model="userall1.userId" clearable style="width: 300px" disabled/>
              </el-col>
            </el-form-item>
              <el-form-item label="用户姓名" prop="userName">
                <el-col :span="12">
                  <el-input v-model="userall1.userName" clearable style="width: 300px"/>
                </el-col>
              </el-form-item>
            <el-form-item label="用户年龄" prop="userAge">
              <el-col :span="12">
                <el-input v-model="userall1.userAge" clearable style="width: 300px"/>
              </el-col>
            </el-form-item>
            <el-form-item label="用户性别" prop="userSex">
              <el-col :span="12">
                <el-input v-model="userall1.userSex" clearable style="width: 300px"/>
              </el-col>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-col :span="8">
                <el-input v-model="userall1.password" clearable style="width: 300px"/>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-col :span="6">
                <el-button type="success" style="width: 100%;" round @click="handleUpdate()">修改信息</el-button>
              </el-col>
              <el-col :span="6" :offset="6">
                <el-button type="warning" style="width: 100%;" round @click="updateStudentVisible = false">
                  取消修改
                </el-button>
              </el-col>
            </el-form-item>
          </el-form>
       </el-dialog>

      </el-main>

    </el-container>



  </el-container>
</template>

<script>
  import store from "../../store"
  export default {
    name: "Person",
    data() {
      return{
        userurl:'http://localhost:8060/DG/user/',
        userName:store.state.common.user_name,
        password: '',
        userAge: '',
        userSex:'',
        updatePassword: false,
        updateUserVisible1: false,
        userall1:{
          userId:'0',
          userName: '',
          userSex:'',
          userAge:'',
          password:'',
        },
        pageNum: 1,
        pageSize: 5,
        resultList: {},
        updateList: [],

        array:['aa','bb','cc','dd','ee','ff'],
        color:'',
        flag: 0,
        url:'http://localhost:8060/DG/user/',
        logo:'3a455b6cff278c914065fab844a3493c192512.jpg',
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
          {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
      }
    },
    created() {
      //面包屑创建方法
      this.getBreadcrumb()
      this.$axios.get(
        '/api/user/selectUserByName',
        {pageNum:this.pageNum,pageSize:this.pageSize,userName:this.userName},
        (res) => {
          if (res.resultCode === 1) {
            this.resultList = res.date.dataList[0]
          }
        }
      );
    },

    mounted() {
      this.timer = setInterval(this.aa, 1000);
    },
    beforeDestroy() {
      clearInterval(this.timer);
    },
    methods: {
      getBreadcrumb() {
        let matched = this.$route.matched.filter(item => item.name)
        const first = matched[0];
        if (first && first.name.trim().toLocaleLowerCase() !== 'Home'.toLocaleLowerCase()) {
          matched = [{ path: '/Home', meta: { title: 'Home' }}].concat(matched)
        }
        this.levelList = matched
      },

      handleRemove(file, fileList) {
        console.log(file)
      },
      handlePreview(file) {
        this.resultList.userLogo = file.name
        this.$axios.post(
          '/api/user/updateUserOne',
          this.resultList,
          (res)   => {
            if (res.resultCode === 1) {
              this.successMession();
            } else {
              this.falseMession();
            }
          });
          this.$axios.get(
            '/api/user/selectUserByName',
            {pageNum:this.pageNum,pageSize:this.pageSize,userName:this.userName},
            (res) => {
              if (res.resultCode === 1) {
                this.resultList = res.date.dataList[0]
              }
            }
          );
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },


      get() {
        return this.color
      },
      aa() {
        this.flag++
        if(this.flag==5){
          this.flag = 0
        }
        this.color = this.array[this.flag]
      },

      updateUser(id){
          this.$axios.get(
            '/api/user/selectUserByName',
            {id:id},
            (res)  => {
              if (res.resultCode === 1) {
                this.userall1 = res.date.dataList[0]
                this.updateUserVisible1 = true
              } else {
                this.falseMession();
                this.updateUserVisible1 = false
                return false
              }
            })
        },
      handleUpdate() {
        let current = this.userall1
        let param = {
          userId:current.userId,
          userName:current.userName,
          password:current.password,
          roleId:current.roleId,
          status:current.status,
          userAge: current.userAge,
          userSex: current.userSex,
          userLogo: this.resultList.userLogo
        }
        this.$axios.post(
          '/api/user/updateUserPassword',
          param,
          (res)   => {
            if (res.resultCode === 1) {
              this.successMession();
              this.updateUserVisible1 = true
              this.selUserinfoAll()
            } else {
              this.falseMession();
              this.updateUserVisible1 = false
            }
          })

      },
      successMession(){
        this.$message({
          type:"success",
          message:"操作成功！！",
          center:true
        })
      },
      falseMession(){
        this.$message({
          type:'danger',
          message:"操作失败！！",
          center:true
        })
      },
      uploadsuccess(file){
        console.log(file)
      }
      },




  }
</script>

<style scoped>

  .aa {color: #3a8ee6}
  .bb {color: #0000ff}
  .cc {color: #ff00ff}
  .dd {color: #00ff00}
  .ee {color: #ffff00}
  .ff {color: #ff4d51}

  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    /*line-height: 200px;*/
  }

  /*.el-main {*/
  /*  background-color: #E9EEF3;*/
  /*  color: #333;*/
  /*  text-align: center;*/
  /*  line-height: 160px;*/
  /*}*/

  /*body > .el-container {*/
  /*  margin-bottom: 40px;*/
  /*}*/

  /*.el-container:nth-child(5) .el-aside,*/
  /*.el-container:nth-child(6) .el-aside {*/
  /*  line-height: 260px;*/
  /*}*/

  /*.el-container:nth-child(7) .el-aside {*/
  /*  line-height: 320px;*/
  /*}*/
</style>

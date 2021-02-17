<template>
  <div class="student-table-component">
    <!-- 头部面包屑 -->
    <el-row>
      <el-col :span="4" >
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="item in levelList" :key="item.path" :to="item.path">{{item.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <br>
    <!-- 条件模糊查询 -->
    <el-row class="drug-table-condition">
      <!--查询条件-->
      <el-col :span="4" :offset="1">
        <el-input v-model="userall.userName" placeholder="姓名" clearable/>
      </el-col>
      <el-col :span="4" :offset="1">
        <el-select v-model="userall.userSex" placeholder="请选择性别">
          <el-option
            v-for="item in options1"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-col>
      <!--查询按钮-->
      <el-col :span="3" :offset="2">
        <el-button type="primary"  style="width: 100%;" @click="selUserinfoAll()"
                   icon="el-icon-search">查询
        </el-button>
      </el-col>
    </el-row>
    <br>
    <!--操作按钮-->
    <el-row>
      <!--批量删除按钮-->
      <el-col :span="3" >
        <el-button type="danger"  style="width: 80%;" @click="deleteUserByList" size="small" icon="el-icon-delete">批量删除
        </el-button>
      </el-col>
      <!--信息下载按钮-->
      <el-col :span="3" :offset="8">
        <el-button type="primary" icon="el-icon-document" size="small"
                   @click="download(`/api/user/Exporttemplate`,'用户信息.xls')">
          信息下载
        </el-button>
      </el-col>
      <!--信息添加按钮-->
      <el-col :span="3" >
        <el-button type="success" icon="el-icon-upload2"  size="small"
                   @click="insertUser">
          信息添加
        </el-button>
      </el-col>
      <!--模板下载按钮-->
      <el-col :span="3" >
        <el-button type="primary" icon="el-icon-document"  size="small"
                   @click="download(`/api/user/Exporttemplatemuban`,'用户导入模板.xls')">
          模板下载
        </el-button>
      </el-col>
      <!--点击上传按钮-->
      <el-col :span="3" >
        <el-upload
          class="upload-demo"
          action="/api/user/readExcelUser"
          :on-success="successMession"
          accept=".xls"
          name='MultipartFile'
        >
          <el-button size="small" type="success" icon="el-icon-upload el-icon--right"> 点击上传</el-button>
        </el-upload>
      </el-col>
    </el-row>
    <!--主表格-->
    <el-table
      :data="resultList"
      stripe
      class="table"
      style="width: 100%"
      ref="multipleTable"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      >
      </el-table-column>
      <el-table-column
        label="姓名"
        width="200"
        prop="userName"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="userAge"
        label="年龄"
        width="150"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="userSex"
        label="性别"
        width="200"
        align="center"
      >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <!--查看详情按钮-->
          <el-button
            icon="el-icon-view"
            type="primary"
            plain
            circle
            size="small"
            @click="viewUser(scope.row.userId)"
            class="staff-table-opera-btn">
          </el-button>
          <!--修改信息按钮-->
          <el-button
            icon="el-icon-edit"
            type="warning"
            plain
            circle
            size="small"
            @click="updateUser(scope.row.userId)"
            class="staff-table-opera-btn">
          </el-button>
          <!--删除详情按钮-->
          <el-button
            icon="el-icon-delete"
            type="danger"
            plain
            circle
            size="small"
            @click="deleteUser(scope.row.userId)"
            class="staff-table-opera-btn">
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[5, 8, 10]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="resultCount"
      class="staff-table-pagination"
    >
    </el-pagination>
    <!-- 查看详情的模态框 -->
    <el-dialog title="用户详情" :visible.sync="viewUserVisible" center width="35%" top="6vh">
      <!-- 下划线 -->
      <el-divider><i class="el-icon-mouse"/></el-divider>
      <!-- 信息列 -->
      <el-form :model="userall1" label-width="80px" label-position="left">
        <el-form-item label="编号">
          <span>{{userall1.userId}}</span>
        </el-form-item>
        <el-form-item label="姓名">
          <span>{{ userall1.userName }}</span>
        </el-form-item>
        <el-form-item label="性别">
          <span>{{ userall1.userSex }}</span>
        </el-form-item>
        <el-form-item label="年龄">
          <span>{{ userall1.userAge }}</span>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 修改详情的模态框 -->
    <el-dialog title="信息修改" :visible.sync="updateUserVisible" center width="40%" top="6vh">
      <!-- 下划线 -->
      <el-divider><i class="el-icon-mouse"/></el-divider>
      <!-- 信息添加 -->
      <el-form :model="userall1" label-width="80px" label-position="left" >
        <!--信息列表-->
        <el-form-item label="账号" prop="userId">
          <el-col :span="12">
            <el-input v-model="userall1.userId" clearable style="width: 300px" disabled/>
          </el-col>
        </el-form-item>
        <el-form-item label="用户名" prop="userName">
          <el-col :span="12">
            <el-input v-model="userall1.userName" clearable style="width: 300px"/>
          </el-col>
        </el-form-item>
        <el-form-item label="年龄" prop="userAge">
          <el-col :span="12">
            <el-input v-model="userall1.userAge" clearable style="width: 300px"/>
          </el-col>
        </el-form-item>
        <el-form-item label="性别" prop="userSex">
          <el-col :span="8">
            <el-input v-model="userall1.userSex" clearable style="width: 300px"/>
          </el-col>
        </el-form-item>
        <!--信息修改按钮-->
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
    <!-- 信息添加 -->
    <el-dialog title="信息添加" :visible.sync="insertUserVisible" center width="40%" top="6vh">
      <!-- 下划线 -->
      <el-divider><i class="el-icon-mouse"/></el-divider>
      <el-form :model="userall2"  label-width="90px" label-position="left">
        <!-- 信息列表 -->
        <el-form-item label="账号" prop="studentCode">
          <el-col :span="12">
            <el-input v-model="userall2.userId"  style="width: 300px"/>
          </el-col>
        </el-form-item>
        <el-form-item label="用户名" prop="name">
          <el-col :span="12">
            <el-input v-model="userall2.userName"  style="width: 300px"/>
          </el-col>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-col :span="12">
            <el-input v-model="userall2.password"  style="width: 300px"/>
          </el-col>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-col :span="12">
            <el-select v-model="userall2.userSex" style="width: 300px" placeholder="请选择性别">
              <el-option
                v-for="item in options1"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="年龄" prop="college">
          <el-col :span="12">
            <el-input v-model="userall2.userAge" clearable style="width: 300px"/>
          </el-col>
        </el-form-item>
        <el-form-item label="角色" prop="major">
          <el-col :span="12">
            <el-input v-model="userall2.roleId" clearable style="width: 300px"/>
          </el-col>
        </el-form-item>
        <!-- 操作按钮 -->
        <el-form-item>
          <el-col :span="6">
            <el-button type="success" style="width: 100%;" round @click="handleInsert()">信息添加</el-button>
          </el-col>
          <el-col :span="6" :offset="6">
            <el-button type="warning" style="width: 100%;" round @click="updateStudentVisible = false">
              取消修改
            </el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  import downloadFile from "../../utils";
  export default {
    name: "Userinfo",
    data() {
      return {
        levelList:[],
        options1: ['男','女'],
        userName:'',
        userAge:'',
        userSex:'',
        userId:'',

        pageNum: 1,
        pageSize: 5,
        resultList: [],
        resultCount: 0,

        viewUserVisible: false,
        updateUserVisible: false,
        insertUserVisible:false,

        role:'',
        // 自定义查询
        multipleSelection:[],
        // 实体类
        userall:{
          userName: '',
          userSex:''
        },
        userall1:{
          userId:0,
          userName: '',
          userSex:'',
          userAge:'',
          password:'',
          roleId:'',
          status:'',
        },
        userall2:{
          userId:0,
          userName: '',
          userSex:'',
          userAge:'',
          password:'',
          roleId:'',
          status:'1',
        },

      }
    },
    created() {

      //面包屑创建方法
      this.getBreadcrumb()
      this.$axios.get(
        '/api/user/selectUserByAny',
        {pageNum:this.pageNum,pageSize:this.pageSize},
        (res) => {
          if (res.resultCode === 1) {
            this.resultList = res.date.dataList
            this.resultCount = res.date.total
          }
        }
      );
      // this.$axios.get(
      //   '/api/user/selectSex',
      //   {
      //   },
      //   (res) => {
      //     if (res.resultCode === 1) {
      //       this.options1 = res.date
      //     }
      //   }
      // );
    },
    methods: {
      //动态面包屑方法
      getBreadcrumb() {
        let matched = this.$route.matched.filter(item => item.name)
        const first = matched[0];
        if (first && first.name.trim().toLocaleLowerCase() !== 'Home'.toLocaleLowerCase()) {
          matched = [{ path: '/Home', meta: { title: 'Home' }}].concat(matched)
        }
        this.levelList = matched
      },
      // 自定义查询
      selUserinfoAll() {
        this.$axios.get(
          '/api/user/selectUserByAny',
          {
            pageNum:this.pageNum,
            pageSize:this.pageSize,
            userName:this.userall.userName,
            userSex:this.userall.userSex
          },
          (res) => {
            if (res.resultCode === 1) {
              this.successMession();
              this.resultList = res.date.dataList
              this.resultCount = res.date.total
            }
          }
        );
      },
      // 更改分页大小
      handleSizeChange(size) {
        this.pageSize = size
        this.selUserinfoAll();
      },
      // 更改页数
      handleCurrentChange(page) {
        this.pageNum = page
        this.selUserinfoAll();
      },
      //打开添加用户模态框
      insertUser() { // 查看学生详情
        this.insertUserVisible = true
      },
      //打开用户详情模态框
      viewUser(id) {
        this.$axios.get(
          '/api/user/selectUserOne',
          {id:id},
          (res) => {
            if (res.resultCode === 1) {
              this.userall1 = res.date
              this.viewUserVisible = true
              return true
            } else {
              this.falseMession();
              this.viewUserVisible = false
              return false
            }
          })
      },
      //文件下载
      download(url, name) {
        let current = this.userall;
        downloadFile({
          userName:current.userName,
          userSex:current.userSex}, url , 'GET', name
        )
      },
      //打开更新用户
      updateUser(id) {
        this.$axios.get(
          '/api/user/selectUserOne',
          {id:id},
          (res)  => {
            if (res.resultCode === 1) {
              this.userall1 = res.date
              this.updateUserVisible = true
            } else {
              this.falseMession();
              this.updateUserVisible = false
              return false
            }
          })
      },
      //更新用户提交
      handleUpdate() {
        let current = this.userall1
        let param = {
          userId:current.userId,
          password:current.password,
          roleId:current.roleId,
          status:current.status,
          userAge: current.userAge,
          userSex: current.userSex,
          userName: current.userName,
        }
        this.$axios.post(
          '/api/user/updateUserOne',
          param,
          (res)   => {
            if (res.resultCode === 1) {
              this.successMession();
              this.updateUserVisible = false
              this.selUserinfoAll()
            } else {
              this.falseMession();
              this.updateUserVisible = false
            }
          })
      },
      //添加用户提交
      handleInsert() {
        let current = this.userall2
        let param = {
          userId:current.userId,
          userName:current.userName,
          password:current.password,
          roleId:current.roleId,
          status:current.status,
          userAge: current.userAge,
          userSex: current.userSex,

        }
        this.$axios.post(
          '/api/user/insertUserOne',
          param,
          (res) =>{
            if (res.resultCode === 1){
              this.successMession();
              this.selUserinfoAll()
              this.insertUserVisible = false
            }else {
              this.falseMession();
            }
          })
      },
      //批量删除用户选择变化
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //批量删除用户
      deleteUserByList(){
        if (this.multipleSelection.length !==0) {
          this.$confirm('是否删除用户信息？', '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'error'
          }).then(() => {
            var listuserId = ''
            var ids=Array();
            this.multipleSelection.forEach(function (e) {
              listuserId += e.userId+','
              ids.push(e.userId)
            })
            listuserId = listuserId.substring(0, listuserId.length - 1);
            this.$axios.del(
              '/api/user/deleteUserByList',
              {ids:listuserId},
              (res) => {
                if(res.resultCode === 1){
                  this.successMession();
                  this.selUserinfoAll()
                } else {
                  this.falseMession();
                }
              });
          }).catch(() => {
            this.falseMession();
          });
        }
        else {
          this.$message({
            type: 'error',
            message: '请选择想要删除的用户',
            center: true
          })
        }

      },
      //删除单个用户
      deleteUser(id){
        this.$confirm('是否删除用户信息？', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          this.$axios.del(
            '/api/user/deleteUserOne',
            {id:id},
            (res)=>{
            if(res.resultCode === 1){
              this.successMession();
              this.selUserinfoAll()
            } else {
              this.$message({
                type: 'danger',
                message: '删除失败',
                center: true
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消',
            center: true
          });
        });
      },
      //操作成功信息
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
      }
    }
  }
</script>

<style>
</style>

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
        <el-select v-model="SelectModel.guideReservationUserId" placeholder="请选择用户">
          <el-option
            v-for="item in userList"
            :key="item.userId"
            :label="item.userName"
            :value="item.userId">
          </el-option>
        </el-select>
      </el-col>
      <!--查询按钮-->
      <el-col :span="3" :offset="2">
        <el-button type="primary"  style="width: 100%;" @click="SelectByAny()"
                   icon="el-icon-search">查询
        </el-button>
      </el-col>
    </el-row>
    <br>
    <!--操作按钮-->
    <el-row>
      <!--信息添加按钮-->
      <el-col :span="3" >
        <el-button type="success" icon="el-icon-upload2"  size="small"
                   @click="InsertWithModel">
          导游预定
        </el-button>
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
      <el-table-column align="center" label="#"  type="index" width="180">

      </el-table-column>
      <el-table-column
        prop="guideReservationId"
        label="预定ID"
        width="200"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="personName"
        label="预定导游"
        width="200"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="userName"
        label="预定游客"
        width="200"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="guideReservationDate"
        label="预定时间"
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
            @click="ViewModel(scope.row.guideReservationId)"
            class="staff-table-opera-btn">
          </el-button>
          <!--修改信息按钮-->
          <el-button
            icon="el-icon-edit"
            type="warning"
            plain
            circle
            size="small"
            @click="UpdateModel(scope.row.guideReservationId)"
            class="staff-table-opera-btn">
          </el-button>
          <!--删除详情按钮-->
          <el-button
            icon="el-icon-delete"
            type="danger"
            plain
            circle
            size="small"
            @click="DeleteModel(scope.row.guideReservationId)"
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
    <el-dialog title="店铺详情" :visible.sync="viewVisible" center width="35%" top="6vh">
      <!-- 下划线 -->
      <el-divider><i class="el-icon-mouse"/></el-divider>
      <!-- 信息列 -->
      <el-form :model="InfoModel" label-width="80px" label-position="left">
        <el-form-item label="预定ID">
          <span>{{ InfoModel.guideReservationId }}</span>
        </el-form-item>
        <el-form-item label="预定用户">
          <span>{{ InfoModel.guideReservationUserId }}</span>
        </el-form-item>
        <el-form-item label="预定导游">
          <span>{{ InfoModel.guideReservationTouristId }}</span>
        </el-form-item>
        <el-form-item label="预定时间">
          <span>{{ InfoModel.guideReservationDate }}</span>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 修改详情的模态框 -->
    <el-dialog title="信息修改" :visible.sync="updateVisible" center width="40%" top="6vh">
      <!-- 下划线 -->
      <el-divider><i class="el-icon-mouse"/></el-divider>
      <!-- 信息添加 -->
      <el-form :model="InfoModel" label-width="80px" label-position="left" >
        <!--信息列表-->
        <el-form-item label="预定时间" prop="guideReservationDate">
          <el-col :span="12">
            <!--            <el-input v-model="AddModel.guideReservationDate" clearable style="width: 300px" />-->
            <div class="block">
              <el-date-picker
                v-model="InfoModel.guideReservationDate"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </el-col>
        </el-form-item>
        <!--信息修改按钮-->
        <el-form-item>
          <el-col :span="6">
            <el-button type="success" style="width: 100%;" round @click="handleUpdate()">修改信息</el-button>
          </el-col>
          <el-col :span="6" :offset="6">
            <el-button type="warning" style="width: 100%;" round @click="updateVisible = false">
              取消修改
            </el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 信息添加 -->
    <el-dialog title="信息添加" :visible.sync="insertVisible" center width="40%" top="6vh">
      <!-- 下划线 -->
      <el-divider><i class="el-icon-mouse"/></el-divider>
      <el-form :model="AddModel"  label-width="90px" label-position="left">
        <!-- 信息列表 -->
        <el-form-item label="预定导游" prop="guideReservationTouristId">
          <el-col :span="12">
            <el-select v-model="AddModel.guideReservationTouristId" placeholder="导游选择">
              <el-option
                v-for="item in guideList"
                :key="item.personId"
                :label="item.personName"
                :value="item.personId">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="预定时间" prop="guideReservationDate">
          <el-col :span="12">
<!--            <el-input v-model="AddModel.guideReservationDate" clearable style="width: 300px" />-->
            <div class="block">
              <el-date-picker
                v-model="AddModel.guideReservationDate"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </el-col>
        </el-form-item>
        <!-- 操作按钮 -->
        <el-form-item>
          <el-col :span="6">
            <el-button type="success" style="width: 100%;" round @click="handleInsert()">信息添加</el-button>
          </el-col>
          <el-col :span="6" :offset="6">
            <el-button type="warning" style="width: 100%;" round @click="insertVisible = false">
              取消修改
            </el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
    import store from "../../../store";

    export default {
      name: "GuideReservationinfo",
      data() {
        return {
          //面包屑
          levelList:[],
          //批量删除
          multipleSelection:[],
          //自定义查询
          options: [{
            value: '1',
            label: '下拉框1'
          }, {
            value: '2',
            label: '下拉框2'
          }, {
            value: '3',
            label: '下拉框3'
          }],
          SelectModel:{
            guideReservationId: '',
            guideReservationUserId: '',
            guideReservationTouristId: '',
            guideReservationDate: '',
          },
          guideList:[],
          //分页
          pageNum: 1,
          pageSize: 5,
          resultList: [],
          resultCount: 0,
          //模态框显示标志
          viewVisible: false,
          updateVisible: false,
          insertVisible:false,
          //详情显示
          InfoModel:{
            guideReservationId: '',
            guideReservationUserId: '',
            guideReservationTouristId: '',
            guideReservationDate: '',
          },
          //新增信息
          AddModel:{
            guideReservationId: '0',
            guideReservationUserId: '',
            guideReservationTouristId: '',
            guideReservationDate: '',
          },
          //变量
          guideReservationId: '',
          guideReservationUserId: '',
          guideReservationTouristId: '',
          guideReservationDate: '',
          //url
          selectByAny:'/api/guideReservation/selectGuideReservationByAny',
          selectOne:'/api/guideReservation/selectGuideReservationOne',
          updateOne:'/api/guideReservation/updateGuideReservationOne',
          insertOne:'/api/guideReservation/insertGuideReservationOne',
          deleteByList:'/api/guideReservation/deleteGuideReservationByList',
          deleteOne:'/api/guideReservation/deleteGuideReservationOne',
          userList:[],
        }
      },
      created() {
        this.$axios.get(
          '/api/user/selectUserByAny',
          {pageNum:1,pageSize:1000},
          (res) => {
            if (res.resultCode === 1) {
              this.userList = res.date.dataList
            }
          }
        );
        //面包屑创建方法
        this.getBreadcrumb()
        this.AddModel.guideReservationUserId = store.state.common.user_id
        this.$axios.get(
          this.selectByAny,
          {pageNum:this.pageNum,pageSize:this.pageSize},
          (res) => {
            if (res.resultCode === 1) {
              this.resultList = res.date.dataList
              this.resultCount = res.date.total
            }
          }
        );
        this.$axios.get(
          '/api/touristAnalysis/selectGuidePopularityAllByPopularity',
          {pageNum:1,pageSize:1000,personType:'导游'},
          (res) => {
            if (res.resultCode === 1) {
              console.log(res)
              this.guideList = res.date
            }
          }
        );
      },
      methods: {
        //DeleteByList 改ID名称
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
        SelectByAny() {
          this.$axios.get(
            this.selectByAny,
            {
              pageNum:this.pageNum,
              pageSize:this.pageSize,
              personId:this.SelectModel.personId,
              guideReservationUserId:this.SelectModel.guideReservationUserId,
              personType:'导游'
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
          this.SelectByAny();
        },
        // 更改页数
        handleCurrentChange(page) {
          this.pageNum = page
          this.SelectByAny();
        },
        //打开添加模态框
        InsertWithModel() { // 查看学生详情
          this.insertVisible = true
        },
        //打开详情模态框
        ViewModel(id) {
          this.$axios.get(
            this.selectOne,
            {id:id},
            (res) => {
              if (res.resultCode === 1) {
                this.InfoModel = res.date
                this.viewVisible = true
                return true
              } else {
                this.falseMession();
                this.viewVisible = false
                return false
              }
            })
        },
        //文件下载
        download(url, name) {
          downloadFile(this.SelectModel, url , 'GET', name
          )
        },
        //打开更新
        UpdateModel(id) {
          this.$axios.get(
            this.selectOne,
            {id:id},
            (res)  => {
              if (res.resultCode === 1) {
                this.InfoModel = res.date
                this.updateVisible = true
              } else {
                this.falseMession();
                this.updateVisible = false
                return false
              }
            })
        },
        //更新提交
        handleUpdate() {
          this.$axios.post(
            this.updateOne,
            this.InfoModel,
            (res)   => {
              if (res.resultCode === 1) {
                this.successMession();
                this.updateVisible = false
                this.SelectByAny()
              } else {
                this.falseMession();
                this.updateVisible = false
              }
            })
        },
        //添加提交
        handleInsert() {
          this.$axios.post(
            this.insertOne,
            this.AddModel,
            (res) =>{
              if (res.resultCode === 1){
                this.successMession();
                this.SelectByAny()
                this.insertVisible = false
              }else {
                this.falseMession();
              }
            })
        },
        //批量删除
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        //批量删除
        DeleteByList(){
          if (this.multipleSelection.length !==0) {
            this.$confirm('是否删除信息？', '警告', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'error'
            }).then(() => {
              var listuserId = ''
              var ids=Array();
              this.multipleSelection.forEach(function (e) {
                listuserId += e.personId+','
                ids.push(e.personId)
              })
              listuserId = listuserId.substring(0, listuserId.length - 1);
              this.$axios.del(
                this.deleteByList,
                {ids:listuserId},
                (res) => {
                  if(res.resultCode === 1){
                    this.successMession();
                    this.SelectByAny()
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
              message: '请选择想要删除的信息',
              center: true
            })
          }

        },
        //删除单个
        DeleteModel(id){
          this.$confirm('是否删除信息？', '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'error'
          }).then(() => {
            this.$axios.del(
              this.deleteOne,
              {id:id},
              (res)=>{
                if(res.resultCode === 1){
                  this.successMession();
                  this.SelectByAny()
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

<style scoped>

</style>

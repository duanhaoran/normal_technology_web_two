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
    <br>
    <br>
    <br>
    <br>
    <!--主表格-->
    <el-table
      :data="resultList"
      stripe
      class="table"
      style="width: 100%"
      ref="multipleTable"
      @selection-change="handleSelectionChange"
    >
      <el-table-column align="center" label="排名"  type="index" width="180">

      </el-table-column>
      <el-table-column
        prop="scenicSpotId"
        label="景点id"
        width="200"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="scenicSpotName"
        label="景点名称"
        width="200"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="scenicSpotAddress"
        label="景点地址"
        width="200"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="scenicSpotStarlevel"
        label="景点星级"
        width="200"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="scenicSpotTxt"
        label="景点介绍"
        width="300"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="scenicSpotPopularity"
        label="热度"
        align="center"
      >
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
        <el-form-item label="${column.comment}">
          <span>{{ InfoModel.scenicSpotId }}</span>
        </el-form-item>
        <el-form-item label="景点名称">
          <span>{{ InfoModel.scenicSpotName }}</span>
        </el-form-item>
        <el-form-item label="景点地址">
          <span>{{ InfoModel.scenicSpotAddress }}</span>
        </el-form-item>
        <el-form-item label="景点星级">
          <span>{{ InfoModel.scenicSpotStarlevel }}</span>
        </el-form-item>
        <el-form-item label="景点介绍">
          <span>{{ InfoModel.scenicSpotTxt }}</span>
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
        <el-form-item label="${column.comment}" prop="scenicSpotId">
          <el-col :span="12">
            <el-input v-model="InfoModel.scenicSpotId" clearable style="width: 300px" />
          </el-col>
        </el-form-item>
        <el-form-item label="景点名称" prop="scenicSpotName">
          <el-col :span="12">
            <el-input v-model="InfoModel.scenicSpotName" clearable style="width: 300px" />
          </el-col>
        </el-form-item>
        <el-form-item label="景点地址" prop="scenicSpotAddress">
          <el-col :span="12">
            <el-input v-model="InfoModel.scenicSpotAddress" clearable style="width: 300px" />
          </el-col>
        </el-form-item>
        <el-form-item label="景点星级" prop="scenicSpotStarlevel">
          <el-col :span="12">
            <el-input v-model="InfoModel.scenicSpotStarlevel" clearable style="width: 300px" />
          </el-col>
        </el-form-item>
        <el-form-item label="景点介绍" prop="scenicSpotTxt">
          <el-col :span="12">
            <el-input v-model="InfoModel.scenicSpotTxt" clearable style="width: 300px" />
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
        <el-form-item label="${column.comment}" prop="scenicSpotId">
          <el-col :span="12">
            <el-input v-model="AddModel.scenicSpotId" clearable style="width: 300px" />
          </el-col>
        </el-form-item>
        <el-form-item label="景点名称" prop="scenicSpotName">
          <el-col :span="12">
            <el-input v-model="AddModel.scenicSpotName" clearable style="width: 300px" />
          </el-col>
        </el-form-item>
        <el-form-item label="景点地址" prop="scenicSpotAddress">
          <el-col :span="12">
            <el-input v-model="AddModel.scenicSpotAddress" clearable style="width: 300px" />
          </el-col>
        </el-form-item>
        <el-form-item label="景点星级" prop="scenicSpotStarlevel">
          <el-col :span="12">
            <el-input v-model="AddModel.scenicSpotStarlevel" clearable style="width: 300px" />
          </el-col>
        </el-form-item>
        <el-form-item label="景点介绍" prop="scenicSpotTxt">
          <el-col :span="12">
            <el-input v-model="AddModel.scenicSpotTxt" clearable style="width: 300px" />
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
    export default {
      name: "ScenicSpotinfo",
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
            scenicSpotId: '',
            scenicSpotName: '',
            scenicSpotAddress: '',
            scenicSpotStarlevel: '',
            scenicSpotTxt: '',
          },
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
            scenicSpotId: '',
            scenicSpotName: '',
            scenicSpotAddress: '',
            scenicSpotStarlevel: '',
            scenicSpotTxt: '',
          },
          //新增信息
          AddModel:{
            scenicSpotId: '',
            scenicSpotName: '',
            scenicSpotAddress: '',
            scenicSpotStarlevel: '',
            scenicSpotTxt: '',
          },
          //变量
          scenicSpotId: '',
          scenicSpotName: '',
          scenicSpotAddress: '',
          scenicSpotStarlevel: '',
          scenicSpotTxt: '',
          //url
          selectByAny:'/api/touristAnalysis/selectScenicSpotPopularityAllByPopularity',
          selectOne:'/api/touristAnalysis/selectScenicSpotPopularityAllByPopularity',
          updateOne:'/api/scenicSpot/updateScenicSpotOne',
          insertOne:'/api/scenicSpot/insertScenicSpotOne',
          deleteByList:'/api/scenicSpot/deleteScenicSpotByList',
          deleteOne:'/api/scenicSpot/deleteScenicSpotOne',
        }
      },
      created() {
        //面包屑创建方法
        this.getBreadcrumb()
        this.$axios.get(
          this.selectByAny,
          {},
          (res) => {
            if (res.resultCode === 1) {
              console.log(res)
              this.resultList = res.date
              console.log(this.resultList)
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
              personStats:this.SelectModel.personStats,
              personType:'监察'
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

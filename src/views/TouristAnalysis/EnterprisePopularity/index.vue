<!--
  - Created by SoulMen
  -->
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
    <!--主表格-->
    <el-table
      :data="resultList"
      stripe
      class="table"
      style="width: 100%"
      ref="multipleTable"
      @selection-change="handleSelectionChange"
    >
      <el-table-column align="center" label="企业排名"  type="index" width="180">

      </el-table-column>
      <el-table-column
        prop="enterpriseId"
        label="企业ID"
        width="200"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="enterpriseName"
        label="企业名称"
        width="200"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="enterpriseLegalPerson"
        label="企业法人"
        width="200"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="enterpriseCapital"
        label="企业注册资本"
        width="200"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="enterpriseDate"
        label="企业注册时间"
        width="200"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="enterpriseTxt"
        label="企业介绍"
        width="200"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="enterprisePopularity"
        label="热度评分"
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
        <!--        <el-form-item label="投诉id">-->
        <!--          <span>{{ InfoModel.opinionId }}</span>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="投诉类型">-->
        <!--          <span>{{ InfoModel.opinionType }}</span>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="投诉行业">-->
        <!--          <span>{{ InfoModel.opinionIndustry }}</span>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="投诉部门">-->
        <!--          <span>{{ InfoModel.opinionDepartment }}</span>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="意见企业">-->
        <!--          <span>{{ InfoModel.opinionEnterprise }}</span>-->
        <!--        </el-form-item>-->
        <el-form-item label="提出意见">
          <span>{{ InfoModel.proposeOpinion }}</span>
        </el-form-item>
        <!--        <el-form-item label="提出意见人id">-->
        <!--          <span>{{ InfoModel.proposeOpinionUserId }}</span>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="投诉人员类型">-->
        <!--          <span>{{ InfoModel.proposeOpinionUserType }}</span>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="消费订单编号">-->
        <!--          <span>{{ InfoModel.touristConsumptionId }}</span>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="被投诉游客id">-->
        <!--          <span>{{ InfoModel.opinionTouristId }}</span>-->
        <!--        </el-form-item>-->
        <el-form-item label="投诉反馈">
          <span>{{ InfoModel.opinionFeedback }}</span>
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
        <!--        <el-form-item label="投诉id" prop="opinionId">-->
        <!--          <el-col :span="12">-->
        <!--            <el-input v-model="InfoModel.opinionId" clearable style="width: 300px" />-->
        <!--          </el-col>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="投诉类型" prop="opinionType">-->
        <!--          <el-col :span="12">-->
        <!--            <el-input v-model="InfoModel.opinionType" clearable style="width: 300px" />-->
        <!--          </el-col>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="投诉行业" prop="opinionIndustry">-->
        <!--          <el-col :span="12">-->
        <!--            <el-input v-model="InfoModel.opinionIndustry" clearable style="width: 300px" />-->
        <!--          </el-col>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="投诉部门" prop="opinionDepartment">-->
        <!--          <el-col :span="12">-->
        <!--            <el-input v-model="InfoModel.opinionDepartment" clearable style="width: 300px" />-->
        <!--          </el-col>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="意见企业" prop="opinionEnterprise">-->
        <!--          <el-col :span="12">-->
        <!--            <el-input v-model="InfoModel.opinionEnterprise" clearable style="width: 300px" />-->
        <!--          </el-col>-->
        <!--        </el-form-item>-->
        <el-form-item label="提出意见" prop="proposeOpinion">
          <el-col :span="12">
            <el-input v-model="InfoModel.proposeOpinion" clearable style="width: 300px" />
          </el-col>
        </el-form-item>
        <!--        <el-form-item label="提出意见人id" prop="proposeOpinionUserId">-->
        <!--          <el-col :span="12">-->
        <!--            <el-input v-model="InfoModel.proposeOpinionUserId" clearable style="width: 300px" />-->
        <!--          </el-col>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="投诉人员类型" prop="proposeOpinionUserType">-->
        <!--          <el-col :span="12">-->
        <!--            <el-input v-model="InfoModel.proposeOpinionUserType" clearable style="width: 300px" />-->
        <!--          </el-col>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="消费订单编号" prop="touristConsumptionId">-->
        <!--          <el-col :span="12">-->
        <!--            <el-input v-model="InfoModel.touristConsumptionId" clearable style="width: 300px" />-->
        <!--          </el-col>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="被投诉游客id" prop="opinionTouristId">-->
        <!--          <el-col :span="12">-->
        <!--            <el-input v-model="InfoModel.opinionTouristId" clearable style="width: 300px" />-->
        <!--          </el-col>-->
        <!--        </el-form-item>-->
        <el-form-item label="投诉反馈" prop="opinionFeedback">
          <el-col :span="12">
            <el-input v-model="InfoModel.opinionFeedback" clearable style="width: 300px" />
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
        <el-form-item label="投诉类型" prop="opinionType">
          <el-col :span="12">
            <el-select v-model="AddModel.opinionType" placeholder="请选择类型">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>

        </el-form-item>
        <!--        <el-form-item label="投诉行业" prop="opinionIndustry">-->
        <!--          <el-col :span="12">-->
        <!--            <el-input v-model="AddModel.opinionIndustry" clearable style="width: 300px" />-->
        <!--          </el-col>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="投诉部门" prop="opinionDepartment">-->
        <!--          <el-col :span="12">-->
        <!--            <el-input v-model="AddModel.opinionDepartment" clearable style="width: 300px" />-->
        <!--          </el-col>-->
        <!--        </el-form-item>-->
        <el-form-item label="意见企业" prop="opinionEnterprise">
          <el-col :span="12">
            <el-select v-model="AddModel.opinionEnterprise" placeholder="请选择企业">
              <el-option
                v-for="item in resultListE"
                :key="item.enterpriseId"
                :label="item.enterpriseName"
                :value="item.enterpriseId">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="提出意见" prop="proposeOpinion">
          <el-col :span="12">
            <el-input v-model="AddModel.proposeOpinion" clearable style="width: 300px" />
          </el-col>
        </el-form-item>
        <!--        <el-form-item label="提出意见人id" prop="proposeOpinionUserId">-->
        <!--          <el-col :span="12">-->
        <!--            <el-input v-model="AddModel.proposeOpinionUserId" clearable style="width: 300px" />-->
        <!--          </el-col>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="投诉人员类型" prop="proposeOpinionUserType">-->
        <!--          <el-col :span="12">-->
        <!--            <el-input v-model="AddModel.proposeOpinionUserType" clearable style="width: 300px" />-->
        <!--          </el-col>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="消费订单编号" prop="touristConsumptionId">-->
        <!--          <el-col :span="12">-->
        <!--            <el-input v-model="AddModel.touristConsumptionId" clearable style="width: 300px" />-->
        <!--          </el-col>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="被投诉游客id" prop="opinionTouristId">-->
        <!--          <el-col :span="12">-->
        <!--            <el-input v-model="AddModel.opinionTouristId" clearable style="width: 300px" />-->
        <!--          </el-col>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="投诉反馈" prop="opinionFeedback">-->
        <!--          <el-col :span="12">-->
        <!--            <el-input v-model="AddModel.opinionFeedback" clearable style="width: 300px" />-->
        <!--          </el-col>-->
        <!--        </el-form-item>-->
        <!-- 操作按钮 -->
        <el-form-item>
          <el-col :span="6">
            <el-button type="success" style="width: 100%;" round @click="handleInsert()">信息添加</el-button>
          </el-col>
          <el-col :span="6" :offset="6">
            <el-button type="warning" style="width: 100%;" round @click="insertVisible = false">
              取消添加
            </el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>


<script>
  import downloadFile from "../../../utils";
  import store from "../../../store";
  export default {
    name: "Superviseinfo",
    data() {
      return {
        //面包屑
        levelList:[],
        //批量删除
        multipleSelection:[],
        //自定义查询
        options: [{
          value: '0',
          label: '咨询'
        }, {
          value: '1',
          label: '表扬'
        }, {
          value: '2',
          label: '建议'
        },{
          value: '3',
          label: '意见'
        }],
        SelectModel:{
          opinionId: '',
          opinionType: '',
          opinionIndustry: '',
          opinionDepartment: '',
          opinionEnterprise: '',
          opinionEnterpriseStr: '',
          proposeOpinion: '',
          proposeOpinionUserId: '',
          proposeOpinionUserType: '',
          touristConsumptionId: '',
          opinionTouristId: '',
          opinionFeedback: '',
          opinionEnterpriseStr: '',
          pageJudgment: '1',
        },
        //分页
        pageNum: 1,
        pageJudgment: '1',
        pageSize: 5,
        resultList: [],
        resultListE: [],
        resultCount: 0,
        resultCountE: 0,
        //模态框显示标志
        viewVisible: false,
        updateVisible: false,
        insertVisible:false,
        //详情显示
        InfoModel:{
          opinionId: '',
          opinionType: '',
          opinionIndustry: '',
          opinionDepartment: '',
          opinionEnterprise: '',
          proposeOpinion: '',
          proposeOpinionUserId: '',
          proposeOpinionUserType: '',
          touristConsumptionId: '',
          opinionTouristId: '',
          opinionFeedback: '',
        },
        //新增信息
        AddModel:{
          opinionId: '',
          opinionType: '',
          opinionIndustry: '',
          opinionDepartment: '',
          opinionEnterprise: '',
          proposeOpinion: '',
          proposeOpinionUserId: '',
          proposeOpinionUserType: '0',
          touristConsumptionId: '',
          opinionTouristId: '',
          opinionFeedback: '',
        },
        //变量
        opinionId: '',
        opinionType: '',
        opinionIndustry: '',
        opinionDepartment: '',
        opinionEnterprise: '',
        proposeOpinion: '',
        proposeOpinionUserId: '',
        proposeOpinionUserType: '',
        touristConsumptionId: '',
        opinionTouristId: '',
        opinionFeedback: '',

        //url
        selectByAny:'/api/touristAnalysis/selectEnterprisePopularityAllByPopularity',
        selectOne:'/api/touristAnalysis/selectEnterprisePopularityAllByPopularity',
        updateOne:'/api/supervise/updateSuperviseOne',
        insertOne:'/api/supervise/insertSuperviseOne',
        deleteByList:'/api/supervise/deleteSuperviseByList',
        deleteOne:'/api/supervise/deleteSuperviseOne',
        selectByAnyE: '/api/enterprise/selectEnterpriseByAny',
      }
    },
    created() {
      this.proposeOpinionUserId= store.state.common.user_id
      this.getBreadcrumb()
      this.$axios.get(
        this.selectByAnyE,
        {pageNum: this.pageNum, pageSize: this.pageSize},
        (res) => {
          if (res.resultCode === 1) {
            this.resultListE = res.date
            this.resultCountE = res.date.total
          }
        }
      );
      this.$axios.get(
        this.selectByAny,
        {pageNum:this.pageNum,pageSize:this.pageSize,pageJudgment:this.pageJudgment},
        (res) => {
          if (res.resultCode === 1) {
            this.resultList = res.date
            this.resultCount = res.date.total
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
            pageJudgment:this.pageJudgment,
            opinionType:this.SelectModel.opinionType,
            opinionEnterpriseStr:this.SelectModel.opinionEnterpriseStr
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
        this.AddModel.proposeOpinionUserId=this.proposeOpinionUserId
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
              listuserId += e.opinionId+','
              ids.push(e.opinionId)
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

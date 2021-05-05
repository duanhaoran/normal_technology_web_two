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
        <el-select v-model="SelectModel.marktingIndustryId" placeholder="招商行业">
          <el-option
            v-for="item in IndustryList"
            :key="item.value"
            :label="item.industryName"
            :value="item.industryId">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" :offset="1">
        <el-select v-model="SelectModel.marktingEnterpriseId" placeholder="招商企业">
          <el-option
            v-for="item in EnterpriseList"
            :key="item.value"
            :label="item.enterpriseName"
            :value="item.enterpriseId">
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
      <!--批量删除按钮-->
      <el-col :span="3" >
        <el-button type="danger"  style="width: 80%;" @click="DeleteByList" size="small" icon="el-icon-delete">批量删除
        </el-button>
      </el-col>
      <!--信息添加按钮-->
      <el-col :span="3" >
        <el-button type="success" icon="el-icon-upload2"  size="small"
                   @click="InsertWithModel">
          信息添加
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
      <el-table-column
        type="selection"
        width="55"
      >
      </el-table-column>
      <el-table-column
        prop="marktingId"
        label="营销id"
        width="200"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="marktingPlatform"
        label="营销投放平台"
        width="200"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="enterpriseName"
        label="营销企业"
        width="200"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="industryName"
        label="营销行业"
        width="200"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="marktingTxt"
        label="营销内容"
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
            @click="ViewModel(scope.row.marktingId)"
            class="staff-table-opera-btn">
          </el-button>
          <!--修改信息按钮-->
          <el-button
            icon="el-icon-edit"
            type="warning"
            plain
            circle
            size="small"
            @click="UpdateModel(scope.row.marktingId)"
            class="staff-table-opera-btn">
          </el-button>
          <!--删除详情按钮-->
          <el-button
            icon="el-icon-delete"
            type="danger"
            plain
            circle
            size="small"
            @click="DeleteModel(scope.row.marktingId)"
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
    <el-dialog title="信息详情" :visible.sync="viewVisible" center width="35%" top="6vh">
      <!-- 下划线 -->
      <el-divider><i class="el-icon-mouse"/></el-divider>
      <!-- 信息列 -->
      <el-form :model="InfoModel" label-width="80px" label-position="left">
        <el-form-item label="营销id">
          <span>{{ InfoModel.marktingId }}</span>
        </el-form-item>
        <el-form-item label="投放平台">
          <span>{{ InfoModel.marktingPlatform }}</span>
        </el-form-item>
        <el-form-item label="营销企业">
          <span>{{ InfoModel.enterpriseName }}</span>
        </el-form-item>
        <el-form-item label="营销行业">
          <span>{{ InfoModel.industryName }}</span>
        </el-form-item>
        <el-form-item label="营销内容">
          <span>{{ InfoModel.marktingTxt }}</span>
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
        <el-form-item label="营销id"  prop="marktingId">
          <el-col :span="12">
            <el-input v-model="InfoModel.marktingId" disabled clearable style="width: 300px" />
          </el-col>
        </el-form-item>
        <el-form-item label="营销企业" prop="marktingEnterpriseId">
          <el-col :span="12">
            <el-select v-model="InfoModel.marktingEnterpriseId" placeholder="营销企业">
              <el-option
                v-for="item in EnterpriseList"
                :key="item.value"
                :label="item.enterpriseName"
                :value="item.enterpriseId">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="营销行业" prop="marktingIndustryId">
          <el-col :span="12">
            <el-select v-model="InfoModel.marktingIndustryId" placeholder="营销行业">
              <el-option
                v-for="item in IndustryList"
                :key="item.value"
                :label="item.industryName"
                :value="item.industryId">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="营销内容" prop="marktingTxt">
          <el-col :span="12">
            <el-input v-model="InfoModel.marktingTxt" clearable style="width: 300px" />
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
        <el-form-item label="投放平台" prop="marktingPlatform">
          <el-col :span="12">
            <el-select v-model="AddModel.marktingPlatform" placeholder="投放平台">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="营销企业" prop="marktingEnterpriseId">
          <el-col :span="12">
            <el-select v-model="AddModel.marktingEnterpriseId" placeholder="营销企业">
              <el-option
                v-for="item in EnterpriseList"
                :key="item.value"
                :label="item.enterpriseName"
                :value="item.enterpriseId">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="营销行业" prop="marktingIndustryId">
          <el-col :span="12">
            <el-select v-model="AddModel.marktingIndustryId" placeholder="营销行业">
              <el-option
                v-for="item in IndustryList"
                :key="item.value"
                :label="item.industryName"
                :value="item.industryId">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="营销内容" prop="marktingTxt">
          <el-col :span="12">
            <el-input v-model="AddModel.marktingTxt" clearable style="width: 300px" />
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
    name: "OldMarkting",
    data() {
      return {
        //面包屑
        levelList:[],
        //批量删除
        multipleSelection:[],
        //自定义下拉框
        options: [{
          value: '电视',
          label: '电视'
        }],
        SelectModel:{
          marktingId: '',
          marktingPlatform: '',
          marktingEnterpriseId: '',
          marktingIndustryId: '',
          marktingTxt: '',
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
          marktingId: '',
          marktingPlatform: '',
          marktingEnterpriseId: '',
          marktingIndustryId: '',
          marktingTxt: '',
        },
        //新增信息
        AddModel:{
          marktingId: '0',
          marktingPlatform: '',
          marktingEnterpriseId: '',
          marktingIndustryId: '',
          marktingTxt: '',
        },
        // 下拉框
        EnterpriseList:[],
        IndustryList:[],
        //变量
        marktingId: '',
        marktingPlatform: '',
        marktingEnterpriseId: '',
        marktingIndustryId: '',
        marktingTxt: '',
        //url
        selectByAny:'/api/markting/selectMarktingByAny',
        selectOne:'/api/markting/selectMarktingOne',
        updateOne:'/api/markting/updateMarktingOne',
        insertOne:'/api/markting/insertMarktingOne',
        deleteByList:'/api/markting/deleteMarktingByList',
        deleteOne:'/api/markting/deleteMarktingOne',
        selectEnterpriseList:'/api/enterprise/selectEnterpriseByAny',
        selectIndustryList:'/api/industry/selectIndustryByAny',

      }
    },
    created() {
      //面包屑创建方法
      this.getBreadcrumb()
      this.$axios.get(
        this.selectByAny,
        {pageNum:this.pageNum,pageSize:this.pageSize,marktingPlatform:"电视"
        },
        (res) => {
          if (res.resultCode === 1) {
            this.resultList = res.date.dataList
            this.resultCount = res.date.total
          }
        }
      );
      // 行业下拉框
      this.$axios.get(
        this.selectIndustryList,
        {pageNum:this.pageNum,pageSize:this.pageSize},
        (res) => {
          if (res.resultCode === 1) {
            this.IndustryList = res.date.dataList
          }
        }
      );
      // 企业下拉框
      this.$axios.get(
        this.selectEnterpriseList,
        {pageNum:this.pageNum,pageSize:this.pageSize},
        (res) => {
          if (res.resultCode === 1) {
            this.EnterpriseList = res.date.dataList
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
            marktingIndustryId:this.SelectModel.marktingIndustryId,
            marktingEnterpriseId:this.SelectModel.marktingEnterpriseId,
            marktingPlatform:"电视"
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
              listuserId += e.shopId+','
              ids.push(e.shopId)
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

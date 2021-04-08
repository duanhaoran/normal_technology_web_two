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
      <el-col :span="12">
        <el-select v-model="SelectModel.orderIndustryId" placeholder="请选择行业">
          <el-option
            v-for="item in resultListE"
            :key="item.industryName"
            :label="item.industryName"
            :value="item.industryId">
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
<!--    <el-row>-->
<!--      &lt;!&ndash;批量删除按钮&ndash;&gt;-->
<!--      <el-col :span="3" >-->
<!--        <el-button type="danger"  style="width: 80%;" @click="DeleteByList" size="small" icon="el-icon-delete">批量删除-->
<!--        </el-button>-->
<!--      </el-col>-->
<!--      &lt;!&ndash;信息下载按钮&ndash;&gt;-->
<!--      <el-col :span="3" :offset="8">-->
<!--        <el-button type="primary" icon="el-icon-document" size="small"-->
<!--                   @click="download(`/api/orderInformain/Exporttemplate`,'信息.xls')">-->
<!--          信息下载-->
<!--        </el-button>-->
<!--      </el-col>-->
<!--      &lt;!&ndash;信息添加按钮&ndash;&gt;-->
<!--      <el-col :span="3" >-->
<!--        <el-button type="success" icon="el-icon-upload2"  size="small"-->
<!--                   @click="InsertWithModel">-->
<!--          信息添加-->
<!--        </el-button>-->
<!--      </el-col>-->
<!--    </el-row>-->
    <!--主表格-->
    <el-table
      :data="resultList"
      stripe
      class="table"
      style="width: 100%"
      ref="multipleTable"
      @selection-change="handleSelectionChange"
    >
<!--      <el-table-column-->
<!--        type="selection"-->
<!--        width="55"-->
<!--      >-->
<!--      </el-table-column>-->
      <el-table-column align="center" label="#"  type="index" width="180">

      </el-table-column>
      <el-table-column
        prop="enterpriseName"
        label="预定所属企业"
        width="300"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="industryName"
        label="预定所属行业"
        width="300"
        align="center"
      >
      </el-table-column>
      <!--      <el-table-column-->
      <!--        prop="orderInformainTitle"-->
      <!--        label="预定标题"-->
      <!--        width="200"-->
      <!--        align="center"-->
      <!--      >-->
      <!--      </el-table-column>-->
      <el-table-column
        prop="orderInformainTxt"
        label="预定介绍"
        width="480"
        align="center"
      >
      </el-table-column>
<!--      <el-table-column-->
<!--        fixed="right"-->
<!--        label="操作"-->
<!--        align="center"-->
<!--      >-->
<!--        <template slot-scope="scope">-->
<!--          &lt;!&ndash;查看详情按钮&ndash;&gt;-->
<!--          <el-button-->
<!--            icon="el-icon-view"-->
<!--            type="primary"-->
<!--            plain-->
<!--            circle-->
<!--            size="small"-->
<!--            @click="ViewModel(scope.row.orderInformainId)"-->
<!--            class="staff-table-opera-btn">-->
<!--          </el-button>-->
<!--          &lt;!&ndash;修改信息按钮&ndash;&gt;-->
<!--          <el-button-->
<!--            icon="el-icon-edit"-->
<!--            type="warning"-->
<!--            plain-->
<!--            circle-->
<!--            size="small"-->
<!--            @click="UpdateModel(scope.row.orderInformainId)"-->
<!--            class="staff-table-opera-btn">-->
<!--          </el-button>-->
<!--          &lt;!&ndash;删除详情按钮&ndash;&gt;-->
<!--          <el-button-->
<!--            icon="el-icon-delete"-->
<!--            type="danger"-->
<!--            plain-->
<!--            circle-->
<!--            size="small"-->
<!--            @click="DeleteModel(scope.row.orderInformainId)"-->
<!--            class="staff-table-opera-btn">-->
<!--          </el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
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
        <el-form-item label="预定信息id">
          <span>{{ InfoModel.orderInformainId }}</span>
        </el-form-item>
        <el-form-item label="预定类型0->游客发布 1->企业发布">
          <span>{{ InfoModel.orderType }}</span>
        </el-form-item>
        <el-form-item label="游客发布id">
          <span>{{ InfoModel.orderUserId }}</span>
        </el-form-item>
        <el-form-item label="预定所属企业id">
          <span>{{ InfoModel.orderEnterpriseId }}</span>
        </el-form-item>
        <el-form-item label="预定所属行业id">
          <span>{{ InfoModel.orderIndustryId }}</span>
        </el-form-item>
        <el-form-item label="预定标题">
          <span>{{ InfoModel.orderInformainTitle }}</span>
        </el-form-item>
        <el-form-item label="预定介绍">
          <span>{{ InfoModel.orderInformainTxt }}</span>
        </el-form-item>
        <el-form-item label="预定剩余数量">
          <span>{{ InfoModel.orderInformainNumber }}</span>
        </el-form-item>
        <el-form-item label="预定状态">
          <span>{{ InfoModel.orderStats }}</span>
        </el-form-item>
        <el-form-item label="预订信息优先级">
          <span>{{ InfoModel.orderPriority }}</span>
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
        <el-form-item label="预定信息id" prop="orderInformainId">
          <el-col :span="12">
            <el-input v-model="InfoModel.orderInformainId" clearable style="width: 300px" />
          </el-col>
        </el-form-item>
        <el-form-item label="预定类型0->游客发布 1->企业发布" prop="orderType">
          <el-col :span="12">
            <el-input v-model="InfoModel.orderType" clearable style="width: 300px" />
          </el-col>
        </el-form-item>
        <el-form-item label="游客发布id" prop="orderUserId">
          <el-col :span="12">
            <el-input v-model="InfoModel.orderUserId" clearable style="width: 300px" />
          </el-col>
        </el-form-item>
        <el-form-item label="预定所属企业id" prop="orderEnterpriseId">
          <el-col :span="12">
            <el-input v-model="InfoModel.orderEnterpriseId" clearable style="width: 300px" />
          </el-col>
        </el-form-item>
        <el-form-item label="预定所属行业id" prop="orderIndustryId">
          <el-col :span="12">
            <el-input v-model="InfoModel.orderIndustryId" clearable style="width: 300px" />
          </el-col>
        </el-form-item>
        <el-form-item label="预定标题" prop="orderInformainTitle">
          <el-col :span="12">
            <el-input v-model="InfoModel.orderInformainTitle" clearable style="width: 300px" />
          </el-col>
        </el-form-item>
        <el-form-item label="预定介绍" prop="orderInformainTxt">
          <el-col :span="12">
            <el-input v-model="InfoModel.orderInformainTxt" clearable style="width: 300px" />
          </el-col>
        </el-form-item>
        <el-form-item label="预定剩余数量" prop="orderInformainNumber">
          <el-col :span="12">
            <el-input v-model="InfoModel.orderInformainNumber" clearable style="width: 300px" />
          </el-col>
        </el-form-item>
        <el-form-item label="预定状态" prop="orderStats">
          <el-col :span="12">
            <el-input v-model="InfoModel.orderStats" clearable style="width: 300px" />
          </el-col>
        </el-form-item>
        <el-form-item label="预订信息优先级" prop="orderPriority">
          <el-col :span="12">
            <el-input v-model="InfoModel.orderPriority" clearable style="width: 300px" />
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
        <el-form-item label="预定信息id" prop="orderInformainId">
          <el-col :span="12">
            <el-input v-model="AddModel.orderInformainId" clearable style="width: 300px" />
          </el-col>
        </el-form-item>
        <el-form-item label="预定类型0->游客发布 1->企业发布" prop="orderType">
          <el-col :span="12">
            <el-input v-model="AddModel.orderType" clearable style="width: 300px" />
          </el-col>
        </el-form-item>
        <el-form-item label="游客发布id" prop="orderUserId">
          <el-col :span="12">
            <el-input v-model="AddModel.orderUserId" clearable style="width: 300px" />
          </el-col>
        </el-form-item>
        <el-form-item label="预定所属企业id" prop="orderEnterpriseId">
          <el-col :span="12">
            <el-input v-model="AddModel.orderEnterpriseId" clearable style="width: 300px" />
          </el-col>
        </el-form-item>
        <el-form-item label="预定所属行业id" prop="orderIndustryId">
          <el-col :span="12">
            <el-input v-model="AddModel.orderIndustryId" clearable style="width: 300px" />
          </el-col>
        </el-form-item>
        <el-form-item label="预定标题" prop="orderInformainTitle">
          <el-col :span="12">
            <el-input v-model="AddModel.orderInformainTitle" clearable style="width: 300px" />
          </el-col>
        </el-form-item>
        <el-form-item label="预定介绍" prop="orderInformainTxt">
          <el-col :span="12">
            <el-input v-model="AddModel.orderInformainTxt" clearable style="width: 300px" />
          </el-col>
        </el-form-item>
        <el-form-item label="预定剩余数量" prop="orderInformainNumber">
          <el-col :span="12">
            <el-input v-model="AddModel.orderInformainNumber" clearable style="width: 300px" />
          </el-col>
        </el-form-item>
        <el-form-item label="预定状态" prop="orderStats">
          <el-col :span="12">
            <el-input v-model="AddModel.orderStats" clearable style="width: 300px" />
          </el-col>
        </el-form-item>
        <el-form-item label="预订信息优先级" prop="orderPriority">
          <el-col :span="12">
            <el-input v-model="AddModel.orderPriority" clearable style="width: 300px" />
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
      name: "OrderInformaininfo",
      data() {
        return {
          //面包屑
          levelList:[],
          resultListE: [],
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
            orderInformainId: '',
            orderType: '1',
            orderUserId: '',
            orderEnterpriseId: '',
            orderIndustryId: '',
            orderInformainTitle: '',
            orderInformainTxt: '',
            orderInformainNumber: '',
            orderStats: '',
            orderPriority: '',
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
            orderInformainId: '',
            orderType: '',
            orderUserId: '',
            orderEnterpriseId: '',
            orderIndustryId: '',
            orderInformainTitle: '',
            orderInformainTxt: '',
            orderInformainNumber: '',
            orderStats: '',
            orderPriority: '',
          },
          //新增信息
          AddModel:{
            orderInformainId: '',
            orderType: '',
            orderUserId: '',
            orderEnterpriseId: '',
            orderIndustryId: '',
            orderInformainTitle: '',
            orderInformainTxt: '',
            orderInformainNumber: '',
            orderStats: '',
            orderPriority: '',
          },
          //变量
          orderInformainId: '',
          orderType: '',
          orderUserId: '',
          orderEnterpriseId: '',
          orderIndustryId: '',
          orderInformainTitle: '',
          orderInformainTxt: '',
          orderInformainNumber: '',
          orderStats: '',
          orderPriority: '',
          //url
          selectByAny:'/api/orderInformain/selectEntertuijian',
          selectOne:'/api/orderInformain/selectOrderInformainOne',
          updateOne:'/api/orderInformain/updateOrderInformainOne',
          insertOne:'/api/orderInformain/insertOrderInformainOne',
          deleteByList:'/api/orderInformain/deleteOrderInformainByList',
          deleteOne:'/api/orderInformain/deleteOrderInformainOne',
          selectByAnyE: '/api/industry/selectIndustryByAny',
        }
      },
      created() {
        //面包屑创建方法
        this.getBreadcrumb()
        this.$axios.get(
          this.selectByAny,
          {pageNum:this.pageNum,pageSize:this.pageSize,orderType:this.SelectModel.orderType},
          (res) => {
            if (res.resultCode === 1) {
              this.resultList = res.date.dataList
              this.resultCount = res.date.total
            }
          }
        );
        this.$axios.get(
          this.selectByAnyE,
          {pageNum: this.pageNum, pageSize: this.pageSize},
          (res) => {
            if (res.resultCode === 1) {
              this.resultListE = res.date.dataList
              this.resultCountE = res.date.total
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
              orderIndustryId:this.SelectModel.orderIndustryId,
              orderType:this.SelectModel.orderType
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

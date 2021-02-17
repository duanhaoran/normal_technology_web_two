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
        <el-input v-model="SelectModel.shopName" placeholder="店铺名称" clearable/>
      </el-col>
      <el-col :span="4" :offset="1">
        <el-select v-model="SelectModel.shopLevel" placeholder="请选择店铺级别">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
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
    <br>
    <!--主表格-->
    <el-table
      :data="resultList"
      class="table"
      style="width: 100%"
      ref="multipleTable"
      :row-class-name="tableRowClassName"
      @cell-dblclick="FoodModel"
    >

      <el-table-column
        prop="shopLogo"
        label="店铺商标"
        width="400"
        align="center"
      >
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src=shopurl+scope.row.shopLogo
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="shopName"
        label="店铺名称"
        width="400"
        align="center"
      >

      </el-table-column>
      <el-table-column
        prop="shopRemark"
        label="店铺备注"
        width="400"
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
            @click="ViewModel(scope.row.shopId)"
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
        <el-form-item label="店铺ID">
          <span>{{ InfoModel.shopId }}</span>
        </el-form-item>
        <el-form-item label="店铺名称">
          <span>{{ InfoModel.shopName }}</span>
        </el-form-item>
        <el-form-item label="店铺电话">
          <span>{{ InfoModel.shopTelephone }}</span>
        </el-form-item>
        <el-form-item label="店铺地址">
          <span>{{ InfoModel.shopAddress }}</span>
        </el-form-item>
        <el-form-item label="店铺商标">
          <span>{{ InfoModel.shopLogo }}</span>
        </el-form-item>
        <el-form-item label="店铺级别">
          <span>{{ InfoModel.shopLevelString }}</span>
        </el-form-item>
        <el-form-item label="店铺备注">
          <span>{{ InfoModel.shopRemark }}</span>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="店铺所属餐饮" :visible.sync="tableVisible" center width="70%" top="6vh">
      <!-- 下划线 -->
      <el-divider><i class="el-icon-mouse"/></el-divider>
      <el-table
        :data="foodList"
        stripe
        class="table"
        style="width: 100%"
        ref="multipleTable"
      >
        <el-table-column
          prop="foodLogo"
          label="食品商标"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src=foodurl+scope.row.foodLogo
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop="foodId"
          label="食品ID"
          width="200"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="foodName"
          label="食品名称"
          width="200"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="foodTypeString"
          label="食品类型"
          width="200"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="foodPrice"
          label="食品价格"
          width="200"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="foodAreaIdString"
          label="食品产地"
          width="200"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="foodRemark"
          label="食品备注"
          width="200"
          align="center"
        >
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <!--删除详情按钮-->
            <el-input-number v-model="scope.row.num" @change="handleChange(scope.row)" :min="0" :max="10" label="描述文字"></el-input-number>
          </template>
        </el-table-column>
      </el-table>
      <br>
      <div style="text-align: center">
        <el-button type="primary" class="button" style="text-align: center"  @click="CheckModel()"  >结算</el-button>
        <el-button type="primary" class="button" style="text-align: center"  @click="tableVisible=false"  > 返回 </el-button>

      </div>
    </el-dialog>
    <el-dialog title="结算页面" :visible.sync="CheckTableVisible" center width="80%" top="6vh">
      <!-- 下划线 -->
      <el-divider><i class="el-icon-mouse"/></el-divider>
      <el-table
        :data="Checklist"
        stripe
        class="table"
        style="width: 100%"
        ref="multipleTable"
      >
        <el-table-column
          prop="foodLogo"
          label="食品商标"
          width="300"
          align="center"
        >
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src=foodurl+scope.row.foodLogo
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop="foodName"
          label="食品名称"
          width="300"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="foodRemark"
          label="食品备注"
          width="300"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="num"
          label="食品数量"
          width="200"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="foodPrice"
          label="食品价格"
          width="300"
          align="center"
        >
        </el-table-column>
      </el-table>
      <br>
      <div style="text-align: center">
        <el-button type="success" class="button" style="text-align: center"  @click="Pay()"  >支付</el-button>
        <el-button type="primary" class="button" style="text-align: center"  @click="ReturnFood()"  >返回</el-button>
      </div>
    </el-dialog>
    <el-dialog title="支付页面" :visible.sync="ResultVisible" center width="60%" top="6vh">
      <!-- 下划线 -->
      <el-divider><i class="el-icon-mouse"/></el-divider>
      <div style="text-align: center">
      <img src="../../assets/zhifu.png"  size="30">
      </div>
      <div style="text-align: center">
        <el-button type="success" class="button" style="text-align: center"  @click="ReturnALL()"  >支付成功</el-button>
        <el-button type="primary" class="button" style="text-align: center"  @click="ReturnCheck()"  >返回</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import store from "../../store";

  export default {
    name: "Shopinfo",
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,
        shopurl:'http://localhost:8060/DG/shop/',
        foodurl:'http://localhost:8060/DG/food/',
        //面包屑
        levelList:[],
        //批量删除
        multipleSelection:[],
        //自定义查询
        options: [{
          value: '',
          label: ''
        },{
          value: 1,
          label: '总店'
        }, {
          value: 2,
          label: '分店'
        }, {
          value: 3,
          label: '加盟店'
        }],
        SelectModel:{
          shopName: '',
          shopLevel:''
        },
        //分页
        pageNum: 1,
        pageSize: 8,
        resultList: [],
        resultCount: 0,
        //模态框显示标志
        tableVisible:false,
        viewVisible: false,
        CheckTableVisible:false,
        ResultVisible:false,
        //详情显示
        InfoModel:{
          shopId:0,
          shopName: '',
          shopTelephone:'',
          shopAddress:'',
          shopLogo:'',
          shopLevel:'',
          shopRemark:'',
          shopLevelString:'',
        },
        //变量
        shopName:'',
        shopLevel:'',
        shopTelephone:'',
        shopId:'',
        shopAddress:'',
        shopLogo:'',
        shopRemark:'',
        //url
        selectByAny:'/api/historyShop/select',
        selectOne:'/api/shop/selectShopOne',
        //食物Table
        foodList: [],
        Checklist: [],
        id:0,
      }
    },
    created() {
      //面包屑创建方法
      this.getBreadcrumb()
      this.$axios.get(
        this.selectByAny,
        {pageNum:this.pageNum,pageSize:this.pageSize,userId:store.state.common.user_id,},
        (res) => {
          if (res.resultCode === 1) {
            this.resultList = res.date.dataList
            this.resultCount = res.date.total
          }
        }
      );
    },
    methods: {
      Pay(){
        this.ResultVisible = true;
      },
      tableRowClassName({row, rowIndex}) {
        if(this.pageNum==1){
          if (rowIndex === 0) {
            return 'aa-row';
          } else if (rowIndex === 1) {
            return 'bb-row';
          } else if (rowIndex === 2) {
            return 'cc-row';
          }
        }
        return '';
      },
      CheckModel(){
        var Znum = 0
        this.Checklist.forEach(function (value) {
          Znum  += value.foodPrice * value.num
        })
        this.Checklist.push({foodLogo:'aa.jpg',foodPrice:Znum})
        this.CheckTableVisible = true
      },
      handleChange(value){
        this.Checklist=this.Checklist.filter(function (ele) {
          return ele.foodId != value.foodId
        })

        this.Checklist.push(value)
      },
      FoodModel(row, column, event){
        this.id=row.shopId
        this.$axios.post(
          '/api/historyShop/insertHistoryShopOne',
          {userId:store.state.common.user_id,shopId:row.shopId},
          (res) =>{
          })

        this.SelectFood()
        this.Checklist=[]
        this.tableVisible = true
      },
      ReturnALL(){
          this.CheckTableVisible=false
          this.ResultVisible=false
          this.tableVisible = false
      },
      ReturnCheck(){
        this.ResultVisible=false
      },
      ReturnFood(){
        this.CheckTableVisible=false
        this. SelectFood()
      },
      SelectFood(){
        this.$axios.get(
          '/api/shopFood/selectFoodByShop',
          {id:this.id},
          (res) => {
            if (res.resultCode === 1) {
              this.foodList = res.date
            }
          }
        );
      },
      DeleteFood(id){
        this.$confirm('是否删除信息？', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          this.$axios.del(
            '/api/shopFood/deleteShopFoodOne',
            {shopId:this.id,foodId:id},
            (res)=>{
              if(res.resultCode === 1){
                this.successMession();
                this.SelectFood()
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
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
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
            shopName:this.SelectModel.shopName,
            shopLevel:this.SelectModel.shopLevel,
            userId:store.state.common.user_id,
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
  .el-table .aa-row {
    background: #f56c6c;
  }

  .el-table .bb-row {
    background: #cf9236;
  }
  .el-table .cc-row {
    background: #f3d19e;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

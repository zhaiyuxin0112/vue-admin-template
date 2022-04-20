<!--
 * @Author: your name
 * @Date: 2022-04-14 15:23:59
 * @LastEditTime: 2022-04-18 23:06:35
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \文档\项目\家政服务预约平台\vue-admin-template\src\views\order\toDetails.vue
-->
<template>
  <div>
    <el-button type="text" @click="$router.go(-1)">返回</el-button>
    <!-- 显示条目开始 -->
    <div>
      <!-- {{ orderDetails }} -->
      <el-table :data="orderDetails.orderLines" style="width: 100%">
        <el-table-column
          prop="id"
          label="订单项编号"
          width="217"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="productId" label="产品编号" align="center">
        </el-table-column>
        <el-table-column prop="product.name" label="产品" align="center">
        </el-table-column>
        <el-table-column prop="product.photo" label="产品图片" align="center">
          <template slot-scope="scope">
            <img width="50px" :src="scope.row.product.photo" alt="" />
          </template>
        </el-table-column>
        <el-table-column prop="price" label="单价" align="center">
        </el-table-column>
        <el-table-column prop="number" label="数量" align="center">
        </el-table-column>
      </el-table>
    </div>
    <!-- 显示条目结束 -->
    <div class="card" >
    <!-- 卡片1开始 -->
    <div style="margin-top: 50px;">
      <el-card class="box-card" style="width: 22%;margin-right:10px;margin-left:10px">
        <div slot="header" class="clearfix">
          <span>订单详情</span>
        </div>
        <div style="padding: 15px">
          <div>订单编号:{{ orderDetails.id }}</div>
          <div style="margin-top: 15px">
            下单时间:{{ orderDetails.orderTime | fmtDate }}
          </div>
          <div style="margin-top: 15px">
            订单金额: ￥
            <span style="color: #e65d6e; font-size: 18px">
              {{ orderDetails.total }}
            </span>
            元
          </div>
          <div style="margin-top: 15px">订单状态:{{ orderDetails.status }}</div>
        </div>
      </el-card>
    </div>
    <!-- 卡片1结束 -->
    <!-- 卡片2开始 -->
    <div style="margin-top: 50px;">
      <el-card class="box-card" style="width: 22%;margin-right:10px;margin-left:10px">
        <div slot="header" class="clearfix">
          <span>接单者信息</span>
        </div>
        <div style="padding: 15px">
          <div>接单者:{{ orderDetails.customer.username }}</div>
          <div style="margin-top: 15px">
            接单者电话:{{ orderDetails.customer.telephone }}
          </div>
        </div>
      </el-card>
    </div>
    <!-- 卡片2结束 -->
    <!-- 卡片3开始 -->
    <div style="margin-top: 50px;">
      <el-card class="box-card" style="width: 22%;margin-right:10px;margin-left:10px">
        <div slot="header" class="clearfix">
          <span>下单者信息</span>
        </div>
        <div style="padding: 15px">
          <div>下单者:{{ orderDetails.employee.realname }}</div>
          <div style="margin-top: 15px">
            下单者电话:{{ orderDetails.employee.telephone }}
          </div>
        </div>
      </el-card>
    </div>
    <!-- 卡片3结束 -->
    <!-- 卡片4开始 -->
    <div style="margin-top: 50px;">
      <el-card class="box-card" style="width: 22%;margin-right:10px;margin-left:10px">
        <div slot="header" class="clearfix">
          <span>雇主信息</span>
        </div>
        <div style="padding: 15px">
          <div>雇主:{{ orderDetails.address.username }}</div>
          <div style="margin-top: 15px">
            雇主电话:{{ orderDetails.address.telephone }}
          </div>
          <div style="margin-top: 15px">
            服务地址:{{ orderDetails.address.city }}{{orderDetails.address.address}}
          </div>
        </div>
      </el-card>
    </div>
    <!-- 卡片4结束 -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //订单详情对象
      orderDetails: {},
      id: "",
      orderLines: [],
    };
  },
  created() {
    console.log(this.$route.query);
    this.orderDetails = this.$route.query;
  },
  methods: {},
};
</script>
<style lang="scss">
.card{
  // content: '';
  // display: block;
  // clear:both;
  //position: relative;
  .box-card{
    float: left;
    
  }

}
.el-card__header {
  background-color: #4866a6;
  color: white;
}
</style>

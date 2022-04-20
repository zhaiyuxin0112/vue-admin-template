<!--
 * @Author: your name
 * @Date: 2022-04-14 09:21:47
 * @LastEditTime: 2022-04-14 23:25:24
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \文档\项目\家政服务预约平台\vue-admin-template\src\views\order\index1.vue
-->
<!--
 * @Author: your name
 * @Date: 2022-04-14 09:11:23
 * @LastEditTime: 2022-04-14 09:21:39
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \文档\项目\家政服务预约平台\vue-admin-template\src\views\column\index1.vue
-->
<template>
  <div>
    <!-- 标签选项卡开始 -->
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="所有订单" name="所有订单"></el-tab-pane>
      <el-tab-pane label="待支付" name="待支付"></el-tab-pane>
      <el-tab-pane label="待派单" name="待派单"></el-tab-pane>
      <el-tab-pane label="待接单" name="待接单"></el-tab-pane>
      <el-tab-pane label="待服务" name="待服务"></el-tab-pane>
      <el-tab-pane label="待确认" name="待确认"></el-tab-pane>
      <el-tab-pane label="已完成" name="已完成"></el-tab-pane>
    </el-tabs>
    <!-- 标签选项卡结束 -->
    <!-- 表格开始 -->
    <el-table :data="orderList" style="width: 100%">
      <el-table-column prop="id" label="订单编号" width="100">
      </el-table-column>
      <el-table-column
        prop="orderTime"
        label="下单时间"
        width="180"
        align="center"
      >
        <template slot-scope="scope" align="center">
          {{ scope.row.orderTime | fmtDate }}
        </template>
      </el-table-column>
      <el-table-column prop="total" label="总价" width="180" align="center">
        <template slot-scope="scope">
            ￥
            <span style="color: #e65d6e;font-size: 18px;">
              {{scope.row.total}}
            </span>
            元
         
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" align="center">
        <!-- 作用域插槽，获取当前行对象 -->
        <template slot-scope="scope">
          <el-tag
            size="small"
            style="
              background-color: #e7faf0;
              border-color: #d0f5e0;
              color: #13ce66;
            "
            v-if="scope.row.status === '待派单'"
            type="success"
            >{{ scope.row.status }}</el-tag
          >
          <el-tag
            size="small"
            v-else-if="scope.row.status === '待接单'"
            type="warning"
            >{{ scope.row.status }}</el-tag
          >
          <el-tag size="small" v-else type="info">{{
            scope.row.status
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="customerId" label="顾客ID" align="center">
      </el-table-column>
      <el-table-column
        v-if="activeName != '待支付' && activeName != '待派单'"
        align="center"
        prop="employeeId"
        label="员工ID"
      >
        <template slot-scope="scope">
          {{ scope.row.employeeId || "无" }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="toDetails(scope.row)" size="small">详情</el-button>
          <el-button
            @click="toSend(scope.row.id)"
            v-if="scope.row.status === '待派单'"
            type="text" style="color: #13ce66;"
            size="small"
            >派单</el-button
          >
          <el-button
            v-if="scope.row.status === '待接单'"
            type="text"
            @click="cancelSend(scope.row.id)"
            size="small" style="color: #e6a23c;"
            >取消派单</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格结束 -->
    <!-- 分页开始 -->
    <div class="page">
      <el-pagination
        
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.page"
        :page-sizes="[2, 6, 8, 15, 20, 25, 60, 80]"
        :page-size="params.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- 分页结束 -->
    <!-- 模态框开始 -->
    <el-dialog title="提示" :visible.sync="visible" width="50%">
      <div class="radio-div" v-for="item in employeeLists" :key="item.id">
        <el-radio v-model="form.waiterId" :label="item.id" border
          >{{ item.username }}{{ item.realname }}</el-radio
        >
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="toSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 模态框结束 -->
  </div>
</template>
<script>
import {
  pageQuery,
  sendOrder,
  cancelSendOrder,
  pageQueryYm,
} from "@/api/order";
export default {
  data() {
    return {
      //派单的表单对象
      form: {},
      //保存所有员工信息
      employeeLists: [],
      //控制模态框显示与隐藏
      visible: false,
      //订单数据总条数
      total: 0,
      //订单数据
      orderList: [],
      //默认激发的选项卡的属性
      activeName: "所有订单",
      params: {
        page: 1,
        pageSize: 6,
      },
    };
  },
  created() {
    this.handleClick();
  },
  methods: {
    /**
     * @description: 跳转到详情页
     * @param {*}
     * @return {*}
     */
    toDetails(row) {
      //编程式导航
      this.$router.push({
        path: "/toDetails/index",
        query: row,
      });
    },
    /**
     * @description: 取消订单
     * @param {*}
     * @return {*}
     */
    cancelSend(id) {
      //发送取消订单请求
      this.$confirm("此操作将取消订单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          //确认取消
          let res = await cancelSendOrder({ orderId: id });
          this.$notify({
            type: "success",
            message: res.message,
          });
          //重载数据
          this.handleClick();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    /**
     * @description: 保存订单，发送派单请求
     * @param {*}
     * @return {*}
     */
    async toSubmit() {
      let res = await sendOrder(this.form);
      this.$notify({
        type: "success",
        message: res.message,
      });
      //重载数据
      this.handleClick();
      //关闭模态框
      this.visible = false;
    },
    /**
     * @description: 派单代码
     * @param {*}  id是当前行的订单id
     * @return {*}
     */
    async toSend(id) {
      this.visible = true;
      //拿到所有员工的信息--发送查询请求
      let res = await pageQueryYm({
        page: 1,
        pageSize: 1000,
        roleId: 1,
      });
      this.employeeLists = res.data.list;
      //console.log(res,'获取所有员工信息');
      this.form.orderId = id;
      console.log(this.form, "打印一下派单信息");
    },
    /**
     * @description: 页码条数发生改变触发的事件
     * @param {*}
     * @return {*}
     */
    handleSizeChange(pageSize) {
      this.params.pageSize = pageSize;
      this.params.page = 1;
      this.handleClick();
    },
    /**
     * @description: 页码发生改变出发的数据
     * @param {*}
     * @return {*}
     */
    handleCurrentChange(page) {
      this.params.page = page;
      this.handleClick();
    },
    /**
     * @description: 选项卡切换触发的事件
     * @param {*}
     * @return {*}
     */
    async handleClick() {
      let temp = { ...this.params };
      //console.log(temp,'添加状态前');
      if (this.activeName != "所有订单") {
        temp.status = this.activeName;
      }
      //console.log(temp,'添加状态后');
      let res = await pageQuery(temp);
      //console.log(res, "获取后台响应");
      this.orderList = res.data.list;
      this.total = res.data.total;
    },
  },
};
</script>
<style lang="scss">
//员工单选框按钮
.radio-div {
  display: inline-block;
  margin: 10px;
}
</style>

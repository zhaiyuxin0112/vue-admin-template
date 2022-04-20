<!--
 * @Author: your name
 * @Date: 2022-04-15 09:22:49
 * @LastEditTime: 2022-04-20 16:58:30
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \文档\项目\家政服务预约平台\vue-admin-template\src\views\hall\account.vue
-->
<template>
  <div>
    <!-- 第一行开始 -->

    <el-form
      v-loading="loading"
      size="small"
      :inline="true"
      :model="params"
      class="demo-form-inline"
    >
      <!-- {{ timer }} -->
      <el-form-item>
        <el-date-picker
          v-model="timer"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
          value-format="timestamp"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="params.applyType"
          placeholder="请选择类型"
          clearable
        >
          <el-option label="充值" value="充值"></el-option>
          <el-option label="消费" value="消费"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="params.status" placeholder="请选择状态" clearable>
          <el-option label="通过" value="通过"></el-option>
          <el-option label="不通过" value="不通过"></el-option>
          <el-option label="未审核" value="未审核"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="params.userId"
          placeholder="请选择用户编号"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="toSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 第一行结束 -->
    <!-- 第二行开始 -->
    <div>
      <el-table :data="accountData" border style="width: 100%">
        <el-table-column fixed type="index" :index="1" label="序号" width="150">
        </el-table-column>
        <el-table-column prop="userId" label="申请人编号" width="120">
        </el-table-column>
        <el-table-column prop="applyTime" label="申请时间" width="180">
          <template slot-scope="scope">
            {{ scope.row.applyTime | fmtDate }}
          </template>
        </el-table-column>
        <el-table-column prop="applyType" label="变更类型" width="120">
        </el-table-column>
        <el-table-column prop="money" label="变更资金" width="300">
          <template slot-scope="scope">
            ￥
            <span style="color: #e65d6e; font-size: 18px">
              {{ scope.row.money }}
            </span>
            元
          </template>
        </el-table-column>
        <el-table-column prop="reason" label="变更原因">
          <template slot-scope="scope">
            {{ scope.row.reason || "无" }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" size="small">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status === '通过'">{{
              scope.row.status
            }}</el-tag>

            <el-tag type="info" v-else-if="scope.row.status === '未审核'">{{
              scope.row.status
            }}</el-tag>
            <el-tag type="danger" v-else>{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="toPass(scope.row.id)"
              v-if="scope.row.status !== '通过'"
              >通过</el-button
            >
            <el-button
              style="color:red;"
              type="text"
              size="small"
              @click="toNoPass(scope.row.id)"
              v-if="scope.row.status !== '不通过'"
              >不通过</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 第二行结束 -->
    <!-- 第三行 分页开始 -->
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.page"
        :page-sizes="[2, 5, 10, 15, 20]"
        :page-size="params.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- 第三行 分页结束 -->
  </div>
</template>

<script>
import { pageQueryAccountApply, checkPass, checkNoPass } from "@/api/account";
export default {
  data() {
    return {
      //表格加载动画
      loading: false,
      //产品总条数
      total: 0,
      //账户数据
      accountData: [],
      //分页根据条件查询的表单对象
      params: {
        page: 1,
        pageSize: 10,
      },
      timer: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },
  created() {
    this.findAllAccount();
  },
  methods: {
    /**
     * @description: 审核不通过
     * @param {*}
     * @return {*}
     */
    async toNoPass(id) {
      let res = await checkNoPass({ id });
      this.$message({
        type: "success",
        message: res.message,
      });
      this.findAllAccount();
    },
    /**
     * @description: 审核通过
     * @param {*}
     * @return {*}
     */
    async toPass(id) {
      let res = await checkPass({ id });
      this.$message({
        type: "success",
        message: res.message,
      });
      this.findAllAccount();
    },
    /**
     * @description: 根据条件查询
     * @param {*}
     * @return {*}
     */
    toSearch() {
      this.findAllAccount();
    },
    /**
     * @description:分页并根据条件查询账户数据
     * @param {*}
     * @return {*}
     */
    async findAllAccount() {
      let temp = { ...this.params };
      for (let key in temp) {
        if (!temp[key]) {
          delete temp[key];
        }
      }
      //根据时间日期选择器查询
      //判断时间存不存在
      if (this.timer) {
        temp.beginTime = this.timer[0];
        temp.endTime = this.timer[1];
      }
      this.loading = true;
      let res = await pageQueryAccountApply(temp);
      //console.log(res);
      this.accountData = res.data.list;
      this.total = res.data.total;
      this.loading = false;
    },
    /**
     * @description: 处理页码条数发生改变的事件
     * @param {*}
     * @return {*}
     */
    handleSizeChange(pageSize) {
      this.params.pageSize = pageSize;
      //当pagesize改变的时候，定位到第一页
      this.params.page = 1;
      this.findAllAccount();
    },
    /**
     * @description: 处理当前页码发生变化的事件
     * @param {*}
     * @return {*}
     */
    handleCurrentChange(page) {
      this.params.page = page;
      this.findAllAccount();
    },
  },
};
</script>
<!--
 * @Author: your name
 * @Date: 2022-04-19 17:15:39
 * @LastEditTime: 2022-04-20 17:18:05
 * @LastEditors: Please set LastEditors
 * @Description: 实名认证
 * @FilePath: \文档\项目\家政服务预约平台\vue-admin-template\src\views\hall\certification.vue
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
        <el-select v-model="params.status" placeholder="请选择状态" clearable>
          <el-option label="通过" value="通过"></el-option>
          <el-option label="不通过" value="不通过"></el-option>
          <el-option label="未审核" value="未审核"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="params.userId"
          placeholder="申请人编号"
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
      <el-table size="small" :data="certificationData"  style="width: 100%">
        <el-table-column fixed type="index" :index="1" label="序号" width="60" align="center">
        </el-table-column>
        <el-table-column prop="userId" label="申请人编号" width="80" align="center"> </el-table-column>
        <el-table-column prop="realname" label="姓名" align="center"> </el-table-column>
        <el-table-column prop="applyTime" label="申请时间" align="center">
          <template slot-scope="scope">
            {{ scope.row.applyTime | fmtTime }}
          </template>
        </el-table-column>
        <el-table-column prop="idCard" label="身份证号" align="center"> </el-table-column>
        <el-table-column prop="idcardPhotoNegative" label="身份证正面" width="80" align="center">
          <template slot-scope="scope">
            <el-popover placement="right" trigger="hover">
              <img width="200px" :src="scope.row.idcardPhotoNegative" alt="" />
              <!-- slot='reference'触发popover的html元素 -->
              <img
                width="40px"
                slot="reference"
                :src="scope.row.idcardPhotoNegative"
                alt=""
              />
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="idcardPhotoPositive" label="身份证反面" width="80" align="center">
           <template slot-scope="scope">
            <el-popover placement="right" trigger="hover">
              <img width="200px" :src="scope.row.idcardPhotoPositive" alt="" />
              <!-- slot='reference'触发popover的html元素 -->
              <img
                width="40px"
                slot="reference"
                :src="scope.row.idcardPhotoPositive"
                alt=""
              />
            </el-popover>
          </template>
         </el-table-column>
        <el-table-column prop="bankCard" label="银行卡号" align="center">
        </el-table-column>
        <el-table-column prop="bankCardPhoto" label="银行卡" align="center">
          <template slot-scope="scope">
            <el-popover placement="right" trigger="hover">
              <img width="200px" :src="scope.row.bankCardPhoto" alt="" />
              <!-- slot='reference'触发popover的html元素 -->
              <img
                width="50px"
                slot="reference"
                :src="scope.row.bankCardPhoto"
                alt=""
              />
            </el-popover>
          </template>
           </el-table-column>
        <el-table-column  prop="status" label="状态" width="80" align="center">
          <template  slot-scope="scope">
            <el-tag size="small" type="success" v-if="scope.row.status === '通过'">{{
              scope.row.status
            }}</el-tag>

            <el-tag size="small" type="info" v-else-if="scope.row.status === '未审核'">{{
              scope.row.status
            }}</el-tag>
            <el-tag size="small" type="danger" v-else>{{ scope.row.status }}</el-tag>
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
import { checkPass, checkNoPass, pageQueryCertificationApply } from "@/api/certification";
export default {
  data() {
    return {
      certificationData:[],
      //产品总条数
      total:0,
      //表格加载动画
      loading: false,
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
  created(){
    this.findAllCertification();
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
      this.findAllCertification();
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
      this.findAllCertification();
    },
        /**
     * @description: 根据条件查询
     * @param {*}
     * @return {*}
     */
    toSearch() {
      this.findAllCertification();
    },
    /**
     * @description:查询所有实名认证
     * @param {*}
     * @return {*}
     */
    async findAllCertification() {
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
      let res = await pageQueryCertificationApply(temp);
      //console.log(res);
      this.certificationData = res.data.list;
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
      this.findAllCertification();
    },
    /**
     * @description: 处理当前页码发生变化的事件
     * @param {*}
     * @return {*}
     */
    handleCurrentChange(page) {
      this.params.page = page;
      this.findAllCertification();
    },
  },
};
</script>
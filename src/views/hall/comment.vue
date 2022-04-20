<!--
 * @Author: your name
 * @Date: 2022-04-15 09:23:00
 * @LastEditTime: 2022-04-19 17:11:10
 * @LastEditors: Please set LastEditors
 * @Description: 资讯评论页面
 * @FilePath: \文档\项目\家政服务预约平台\vue-admin-template\src\views\hall\comment.vue
-->
<template>
  <div>
    <!-- 第一行开始 -->
    <el-button size="small" type="danger" @click="deleteByIds"
      >批量删除</el-button
    >
    <!-- 第一行结束 -->
    <!-- 第二行开始 -->
    <div>
      <el-table
        size="small"
        :data="commentList"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column type="index" :index="1" label="序号" width="120">
        </el-table-column>
        <el-table-column prop="comment" label="评论内容" width="120">
        </el-table-column>
        <el-table-column prop="userId" label="评论人编号"> </el-table-column>
        <el-table-column prop="articleId" label="咨询编号"> </el-table-column>
        <el-table-column prop="commentTime" label="评论时间">
          <template slot-scope="scope">
            {{ scope.row.commentTime || fmtDate }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="评论状态">
          <template slot-scope="scope">
            <el-tag
              size="small"
              type="success"
              v-if="scope.row.status === '通过'"
              >{{ scope.row.status }}</el-tag
            >
            <el-tag
              size="small"
              type="danger"
              v-else-if="scope.row.status === '不通过'"
              >{{ scope.row.status }}</el-tag
            >
            <el-tag size="small" type="info" v-else>{{
              scope.row.status
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text">删除</el-button>
            <el-button
              type="text"
              v-if="scope.row.status === '未审核'"
              @click="toChangeStatus(scope.row.id, '通过')"
              >通过</el-button
            >
            <el-button
              type="text"
              v-if="scope.row.status === '未审核'"
              @click="toChangeStatus(scope.row.id, '不通过')"
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
import { pageQuery,batchDelete, check } from "@/api/comment";
export default {
  data() {
    return {
      total:0,
      //资讯评论的数据
      tableData: [],
      params: {
        page: 1,
        pageSize: 10,
      },
      //评论数据
      commentList: [],
      //处理批量删除的数组
      ids: [],
    };
  },
  created() {
    this.findAllComments();
  },
  methods: {
    /**
     * @description: 审核评论
     * @param {*}
     * @return {*}
     */
    async toChangeStatus(id, status) {
      let res = await check({ id, status });
      this.$message({
        type: "success",
        message: res.message,
      });
      this.findAllComments();
    },
    /**
     * @description: 批量删除请求
     * @param {*}
     * @return {*}
     */
    deleteByIds() {
      if (this.ids.length > 0) {
        this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            //确认删除
            let res = await batchDelete({ ids: this.ids });
            this.$message({
              type: "success",
              message: res.message,
            });
            //重载数据
            this.findAllComments();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      }
    },
    /**
     * @description: 处理多选框表格的函数
     * @param {*}
     * @return {*}
     */
    handleSelectionChange(val) {
      //console.log(val,'表格每一行的数据');
      //filter、map过滤每一行的数据
      this.ids = val.map((item) => {
        return item.id;
      });
      console.log(this.ids);
    },
    /**
     * @description: 分页展示所有评论
     * @param {*}
     * @return {*}
     */
    async findAllComments() {
      let res = await pageQuery(this.params);
      //console.log(res);
      this.commentList = res.data.list;
      this.total = res.data.total;
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
      this.findAllComments();
    },
    /**
     * @description: 处理当前页码发生变化的事件
     * @param {*}
     * @return {*}
     */
    handleCurrentChange(page) {
      this.params.page = page;
      this.findAllComments();
    },
  },
};
</script>
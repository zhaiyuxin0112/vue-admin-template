<!--
 * @Author: your name
 * @Date: 2022-04-18 09:12:05
 * @LastEditTime: 2022-04-19 17:07:58
 * @LastEditors: Please set LastEditors
 * @Description: 网站咨询
 * @FilePath: \文档\项目\家政服务预约平台\vue-admin-template\src\views\cargory\cargoryFor.vue
-->
<template>
  <div>
    <!-- 第一行开始 -->
    <el-row>
      <el-col :span="18">
        <el-form
        v-loading="loading"
          size="small"
          :inline="true"
          :model="params"
          class="demo-form-inline"
        >
          <el-form-item>
            <el-select
              clearable
              v-model="params.status"
              placeholder="请选择状态"
            >
              <el-option label="审核通过" value="审核通过"></el-option>
              <el-option label="审核不通过" value="审核不通过"></el-option>
              <el-option label="未审核" value="未审核"></el-option>
              <el-option label="推荐" value="推荐"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input
              clearable
              v-model="params.title"
              placeholder="请输入标题"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-select
              clearable
              v-model="params.categoryId"
              placeholder="请选择栏目"
            >
              <el-option
                v-for="item in categoryListPro"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="toSearch">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="6" style="text-align: right">
        <el-button type="primary" size="small" @click="toPublish"
          >发布咨询</el-button
        >
      </el-col>
    </el-row>
    <!-- 第一行结束 -->
    <!-- 第二行表格开始 -->
    <div>
      <el-table :data="articleList" style="width: 100%">
        <el-table-column
          type="index"
          :index="1"
          
          label="序号"
          width="80"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="cover" label="封面" width="160" align="center">
          <template slot-scope="scope">
            <img width="150px" :src="scope.row.cover" alt="" />
          </template>
        </el-table-column>
        <el-table-column prop="address" label="风采" width="680">
          <template slot-scope="scope">
            <div>{{ scope.row.title }}</div>
            <div v-if="scope.row.baseUser">
              {{ scope.row.baseUser.realname }}
            </div>
            <div v-if="scope.row.category">{{ scope.row.category.name }}</div>
            <div>{{ scope.row.publishTime | fmtDate }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template slot-scope="scope">
            <el-tag
              size="small"
              style="
                background-color: #e7faf0;
                border-color: #d0f5e0;
                color: #13ce66;
              "
              v-if="scope.row.status === '审核通过'"
              type="success"
              >{{ scope.row.status }}</el-tag
            >
            <el-tag
              size="small"
              v-else-if="scope.row.status === '审核不通过'"
              type="danger"
              >{{ scope.row.status }}</el-tag
            >
            <el-tag
              size="small"
              v-else-if="scope.row.status === '推荐'"
              type="warning"
              >{{ scope.row.status }}</el-tag
            >
            <el-tag size="small" v-else type="info">{{
              scope.row.status
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button style="color:#2cb5ac;" size="small" type="text" @click="recommed(scope.row.id)"
              >推荐</el-button
            >
            <el-button style="color:#3a71a8;" size="small" type="text" @click="check(scope.row)">审核</el-button>
            <el-button style="color:#e65d6e;" size="small" type="text" @click="toDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 第二行表格结束 -->
    <!-- 第三行分页开始 -->
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.page"
        :page-sizes="[5, 10, 17, 20, 30, 80]"
        :page-size="params.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- 第三行分页结束 -->
    <!-- 模态框 -->
    <el-dialog title="审核风采信息" :visible.sync="visible" width="60%" >
      <!-- 显示文章标题 -->
      <div style="text-align: center; font-size: 26px">
        {{ article.title }}
      </div>
      <!-- 显示文章内容 v-html解析代码片段 -->
      <div v-html="article.content" class="content">
        {{ article.content }}
      </div>
      <span slot="footer" class="footer">
        <el-button
          type="danger"
          @click="toChangeStatus(article.id, '审核不通过')"
          >审核不通过</el-button
        >
        <el-button
          type="primary"
          @click="toChangeStatus(article.id, '审核通过')"
          >审核通过</el-button
        >
      </span>
    </el-dialog>
    <!-- 模态框 -->
  </div>
</template>
<script>
import { pageQuery, findAll, changeStatus } from "@/api/category";
export default {
  data() {
    return {
      //表格加载动画
      loading: false,
      //分页条件的表单对象
      params: {
        page: 1,
        pageSize: 10,
      },
      //文章列表
      articleList: [],
      //列表总条数
      total: 0,
      //所有文章分类
      categoryListPro: [],
      //接受文章当前行的数据
      article: {},
      //模态框
      visible: false,
    };
  },
  created() {
    this.findAllCategory();
    this.findAllCateList();
  },
  //监听器 会自动监听页面变化，查询按钮就不用了
  watch: {
    params: {
      handler() {
        this.findAllCategory();
      },
      deep: true,
    },
  },
  methods: {
          /**
     * @description: 删除产品
     * @param {*}
     * @return {*}
     */    
    toDelete(id){
     this.$confirm("此操作将删除信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          //确认删除
          //发送删除产品请求
          let res = await deleteById({ id });
          //console.log(res);
          //成功的消息提示，返回的是后台的提示语，不是写死的
          this.$notify({
            type: "success",
            message: res.message,
          });
          //重载数据,重新加载页面
          this.findAllCategory();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    /**
     * @description: 文章发布页面
     * @param {*}
     * @return {*}
     */
    toPublish() {
      //编程式导航  跳转到文章详情页面
      this.$router.push({
        path: "/toPubDetail/index",
      });
    },
    /**
     * @description: 修改文章状态
     * @param {*}
     * @return {*}
     */
    async toChangeStatus(id, status) {
      let res = await changeStatus({ id, status });
      this.$message({
        type: "success",
        message: res.message,
      });
      this.visible = false;
      this.findAllCategory();
    },
    /**
     * @description: 审核文章
     * @param {*}
     * @return {*}
     */
    check(row) {
      this.visible = true;
      this.article = row;
    },
    /**
     * @description: 推荐文章
     * @param {*}
     * @return {*}
     */
    recommed(id) {
      this.$confirm("此操作将推荐该咨询, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          //确认推荐
          let res = await changeStatus({ id, status: "推荐" });
          this.$message({
            type: "success",
            message: res.message,
          });
          //重载数据
          this.findAllCategory();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消推荐",
          });
        });
    },
    /**
     * @description:给搜索按钮绑定事件
     * @param {*}
     * @return {*}
     */
    toSearch() {
      this.findAllCategory();
    },
    /**
     * @description: 所有文章分类  放下拉框
     * @param {*}
     * @return {*}
     */
    async findAllCateList() {
      let res = await findAll({
        page: 1,
        pageSize: 1000,
      });
      //console.log(res,'所有栏目');
      this.categoryListPro = res.data;
    },
    /**
     * @description: 分页并根据条件获取资讯信息
     * @param {*}
     * @return {*}
     */
    async findAllCategory() {
      let temp = { ...this.params };
      for (let key in temp) {
        if (!temp[key]) {
          delete temp[key];
        }
      }
       this.loading = true;
      let res = await pageQuery(temp);
      //console.log(res);
      this.articleList = res.data.list;
      this.total = res.data.total;
       this.loading = false;
    },
    /**
     * @description: 处理分页条数变化的函数
     * @param {*}
     * @return {*}
     */
    handleSizeChange(pageSize) {
      this.params.pageSize = pageSize;
      this.params.page = 1;
    },
    /**
     * @description: 处理分页的函数
     * @param {*}
     * @return {*}
     */
    handleCurrentChange(page) {
      this.params.page = page;
    },
  },
};
</script>
<style lang="scss">
.el-dialog__header {
  background-color: #4866a6;
  .el-dialog__title {
    color: #fff;
  }
}
.el-dialog__body {
  .content{
    
    border-bottom: 1px solid #4866a6;
  }
  
}
</style>
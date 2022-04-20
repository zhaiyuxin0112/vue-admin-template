<!--
 * @Author: your name
 * @Date: 2022-04-18 09:11:29
 * @LastEditTime: 2022-04-20 15:25:42
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \文档\项目\家政服务预约平台\vue-admin-template\src\views\cargory\cargoryList.vue
-->
<template>
  <div>
    <!-- 第一行添加按钮 -->
    <el-button
      style="margin-right: 10px"
      size="small"
      type="primary"
      @click="toAdd"
      >添加</el-button
    >
    <!-- 第一行结束 -->
    <!-- 第二行开始 -->
    <div>
      <el-table
        v-loading="loading"
        size="small"
        :data="categoryIdList"
        style="width: 100%"
      >
        <!-- prop父组件给子组件传值 :绑定，呈现出来的就是number-->
        <el-table-column
          type="index"
          :index="1"
          label="序号"
          width="80"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="name" label="名称" width="110">
        </el-table-column>
        <el-table-column prop="no" label="排序号" width="100">
        </el-table-column>
        <el-table-column prop="description" label="描述" width="900">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <!-- 判断当前行的状态  用插槽 -->
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="toEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              style="color: red"
              size="small"
              type="text"
              @click="toDelete(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 第二行结束 -->
    <!-- 模态框开始 -->
    <el-dialog @close="toClose" :title="title" :visible.sync="visible">
      <el-form :model="form" :rules="rules" ref="myForm">
        <el-form-item
          label="栏目名称"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input clearable v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="序号" :label-width="formLabelWidth" prop="no">
          <el-input
            clearable
            v-model.number="form.no"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="产品描述" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="toSave">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 模态框结束 -->
  </div>
</template>
<script>
import {
  pageQuery,
  findAll,
  deleteByIdPro,
  saveOrUpdatePro,
} from "@/api/category";
export default {
  data() {
    return {
      //表单验证规则
      rules: {
        name: [{ required: true, message: "请输入栏目名称", trigger: "blur" }],
      },
      //模态框标题
      title: "",
      //表单对象
      form: {},
      //表单对象宽度
      formLabelWidth: "80px",
      //控制模态框显示与隐藏
      visible: false,

      //栏目分类对象
      categoryIdList: [],
      //表格加载动画
      loading: false,
    };
  },
  created() {
    this.findAllCategoryId();
  },
  methods: {
    /**
     * @description: 删除按钮
     * @param {*}
     * @return {*}
     */
    toDelete(id) {
      this.$confirm("此操作将删除分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          //确认删除
          //发送删除栏目请求
          let res = await deleteByIdPro({ id });
          //console.log(res);
          //成功的消息提示，返回的是后台的提示语，不是写死的
          this.$notify({
            type: "success",
            message: res.message,
          });
          //重载数据,重新加载页面
          this.findAllCategoryId();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    /**
     * @description: 编辑按钮
     * @param {*}
     * @return {*}
     */
    toEdit(row) {
      this.visible = true;
      this.title = "修改产品信息";
      this.form = { ...row }; //当前行的数据绑定到表单中
    },
           /**
     * @description: 模态框关闭的回调
     * @param {*}
     * @return {*}
     */    
    toClose(){
      //重置表单
     this.$refs['myForm'].resetFields();
     //关闭模态框
     this.visible=false;
    },
    /**
     * @description: 保存或者更新
     * @param {*}
     * @return {*}
     */
    toSave() {
      this.$refs["myForm"].validate(async (valid) => {
        if (valid) {
          //校验通过 发送保存请求
          let res = await saveOrUpdatePro(this.form);
          //console.log(res);
          this.$notify({
            type: "success",
            message: res.message,
          });
          this.visible = false;
          //重载数据
          this.findAllCategoryId();
        } else {
          //检验失败
          //console.log('error submit!!');
          return false;
        }
      });
    },
    /**
     * @description: 添加按钮
     * @param {*}
     * @return {*}
     */
    toAdd() {
      this.visible = true;
      this.title = "添加栏目信息";
      this.form = {}; //在点击添加的时候表单中是一个空对象
    },
    /**
     * @description: 获取所有网站分类的信息
     * @param {*}
     * @return {*}
     */
    async findAllCategoryId() {
      this.loading = true;
      let res = await findAll(this.params);
      //获取到信息
      this.categoryIdList = res.data;
      //this.total = res.data.total;
      this.loading = false;
      //console.log(res, "获取栏目信息");
    },
  },
};
</script>
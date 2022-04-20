<!--
 * @Author: your name
 * @Date: 2022-04-12 15:20:18
 * @LastEditTime: 2022-04-14 23:41:54
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \文档\项目\家政服务预约平台\vue-admin-template\src\views\column\index.vue
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
        :data="columnList"
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
        <el-table-column prop="id" label="栏目编号" width="180" align="center">
        </el-table-column>
        <el-table-column prop="name" label="名称" width="300" align="center">
        </el-table-column>
        <el-table-column prop="icon" label="图标" width="250" align="center">
          <template slot-scope="scope">
            <el-popover placement="right" trigger="hover">
              <img width="200px" :src="scope.row.icon" alt="" />
              <!-- slot='reference'触发popover的html元素 -->
              <img width="32px" slot="reference" :src="scope.row.icon" alt="" />
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="num" label="排序号" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <!-- 判断当前行的状态  用插槽 -->
          <template slot-scope="scope">
            <el-button
              @click="toEdit(scope.row)"
              style="color: #44b79a"
              type="text"
              size="small"
              >编辑</el-button
            >
            <el-button style="color: red" size="small" type="text" @click="toDelete(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 第二行结束 -->
    <!-- 第三行开始 -->
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.page"
        :page-sizes="[2, 5, 6, 15, 20]"
        :page-size="params.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- 第三行结束 -->
    <!-- 模态框开始 -->
    <el-dialog @close="toClose" :title="title" :visible.sync="visible">
      <el-form :model="form" :rules="rules" ref="myForm">
        <el-form-item
          label="栏目名称"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input clearable v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="序号" :label-width="formLabelWidth" prop="num">
          <el-input
            clearable
            v-model.number="form.num"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="图标" :label-width="formLabelWidth" prop="icon">
          <el-upload
            class="avatar-uploader"
            :action="uploadFileURL"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
//将文件上传的图片展示的变量引进来
import { showFileURL, uploadFileURL } from "@/utils/config";
import { pageQuery as pageQueryPro, saveOrUpdate as saveOrUpdatePro,deleteById } from "@/api/column";
//import { pageQuery, saveOrUpdate, deleteById } from "@/api/product";
export default {
  data() {
    return {
      //表单验证规则
      rules: {
        name: [{ required: true, message: "请输入栏目名称", trigger: "blur" }],
        
        icon: [
          { required: true, message: "请上传栏目图标", trigger: "change" },
        ],
      },
      //图片展示路径
      showFileURL,
      //图片上传路径
      uploadFileURL,
      //图片
      imageUrl: "",
      //模态框标题
      title: "",
      //表单对象
      form: {},
      //表单对象宽度
      formLabelWidth: "80px",
      //控制模态框显示与隐藏
      visible: false,
      //栏目总条数
      total: 0,
      //分页属性和条件的表单对象
      params: {
        page: 1,
        pageSize: 6,
      },
      //表格加载动画
      loading: false,
      //栏目信息
      columnList: [],
    };
  },
  created() {
    this.findAllColumn();
  },
  methods: {
        /**
     * @description: 删除产品
     * @param {*}
     * @return {*}
     */    
    toDelete(id){
     this.$confirm("此操作将删除栏目, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          //确认删除
          //发送删除栏目请求
          let res = await deleteById({ id });
          //console.log(res);
          //成功的消息提示，返回的是后台的提示语，不是写死的
          this.$notify({
            type: "success",
            message: res.message,
          });
          //重载数据,重新加载页面
          this.findAllColumn();
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
      this.imageUrl = this.form.icon;
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
          this.$notify({
            type: "success",
            message: res.message,
          });
          this.visible = false;
          //重载数据
          this.findAllColumn();
        } else {
          //检验失败
          //console.log("error submit!!");
          return false;
        }
      });
    },
    /**
     * @description: 模态框关闭的回调
     * @param {*}
     * @return {*}
     */
    toClose() {
      //重置表单
      this.$refs["myForm"].resetFields();
      //关闭模态框
      this.visible = false;
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
      this.imageUrl = "";
    },
    //   /**
    //  * @description: 头像上传成功的回调
    //  * @param {*}
    //  * @return {*}
    //  */
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      //console.log(res,'获取相应');
      this.form.icon = showFileURL + res.data.slice(21);
      //console.log(this.form.icon);
    },
    //   /**
    //    * @description: 头像上传之前的回调
    //    * @param {*} file
    //    * @return {*}
    //    */
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    /**
     * @description: 获取所有栏目的信息
     * @param {*}
     * @return {*}
     */
    async findAllColumn() {
      this.loading = true;
      let res = await pageQueryPro(this.params);
      //获取到信息
      this.columnList = res.data.list;
      this.total = res.data.total;
      this.loading = false;
      //console.log(res,'获取栏目信息');
    },

    /**
     * @description: 处理页码条数发生改变
     * @param {*}
     * @return {*}
     */
    handleSizeChange(pageSize) {
      this.params.pageSize = pageSize;
      //当pagesize改变的时候，定位到第一页
      this.params.page = 1;
      this.findAllColumn();
    },
    /**
     * @description: 处理当前页码发生变化的事件
     * @param {*}
     * @return {*}
     */
    handleCurrentChange(page) {
      this.params.page = page;
      this.findAllColumn();
    },
  },
};
</script>
<style lang="scss">
.page {
  text-align: right;
  margin-top: 10px;
}
//上传图片的样式
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
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
<!--
 * @Author: your name
 * @Date: 2022-04-20 09:06:12
 * @LastEditTime: 2022-04-20 23:04:52
 * @LastEditors: Please set LastEditors
 * @Description: 系统配置
 * @FilePath: \文档\项目\家政服务预约平台\vue-admin-template\src\views\baseConfig\index.vue
-->
<template>
  <div>
    <!-- 第一行 按钮 -->
    <el-button size="small" type="primary" @click="toAdd">新增</el-button>
    <!-- 第二行 表格 -->
    <div>
      <el-table size="small" :data="baseConfig" style="width: 100%">
        <el-table-column
          type="index"
          :index="1"
          prop="date"
          label="序号"
          width="180"
        >
        </el-table-column>
        <el-table-column prop="name" label="名称" width="180">
        </el-table-column>
        <el-table-column  prop="val" label="值">
          <template slot-scope="scope">
            <span v-if="scope.row.val.indexOf('http://') === -1"
              >{{ scope.row.val }}
            </span>
            <img v-else width="100px" :src="scope.row.val" alt="" />
          </template>
        </el-table-column>
        <el-table-column prop="introduce" label="介绍"> </el-table-column>
        <el-table-column label="操作" align="center">
          <!-- 判断当前行的状态  用插槽 -->
          <template slot-scope="scope">
          <el-button size="small" type="text" @click="toEdit(scope.row)">编辑</el-button>
          <el-button style="color: red" size="small" type="text"  @click="toDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 第二行结束 -->
    <!-- 模态框 -->
    <el-dialog @close='toClose' :title="title" :visible.sync="visible">
      <el-form :model="form"  :rules='rules' ref='myForm'>
        <el-form-item
          label="名称"
          :label-width="formLabelWidth" 
          prop="name"
        >
          <el-input v-model="form.name" autocomplete="off" placeholder="请选择名称" clearable></el-input>
        </el-form-item>
        <el-form-item
          label="介绍"
          :label-width="formLabelWidth"
          prop="introduce"
        >
          <el-input
            type="textarea"
            v-model="form.introduce"
            autocomplete="off" placeholder="请选择类型"  clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-select v-model="type" placeholder="请选择类型">
            <el-option label="文字" value="文字"></el-option>
            <el-option label="图片" value="图片"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="type==='文字'"
          label="值"
          :label-width="formLabelWidth"
          placeholder="请输入文字"
        >
          <el-input v-model="form.val" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-else label="图片" :label-width="formLabelWidth">
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
    <!-- 模态框 -->
  </div>
</template>
<script>
import { findAll, deleteById, saveOrUpdate } from "@/api/config";
import {showFileURL,uploadFileURL} from "@/utils/config";
export default {
  data() {
    return {
      //表单验证规则
      rules:{
        name:[{required:true,message:"请输入轮播图名称",trigger:"blur"}],
        introduce:[{required:true,message:"请输入轮播图介绍信息",trigger:"blur"}]
      },
      showFileURL,
      uploadFileURL,
      imageUrl:'',
      //模态框
      type: "文字",
      form: {},
      formLabelWidth: "80px",
      visible: false,
      title: "",
      //系统配置的数据
      baseConfig: [],
    };
  },
  watch:{
      type(){
          this.form.val='';
          this,imageUrl='';
      }
  },
  created() {
    this.findAllConf();
  },
  methods: {
        /**
     * @description: 删除按钮
     * @param {*}
     * @return {*}
     */
    toDelete(id) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
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
          this.findAllConf();
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
      this.title = "新增数据";
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
    toSave(){
      this.$refs['myForm'].validate( async (valid) => {
          if (valid) {
            //校验通过 发送保存请求
            let res=await saveOrUpdate(this.form);
            this.$notify({
              type:'success',
              message:res.message
            });
            this.visible=false;
            //重载数据
            this.findAllConf();
          } else {
            //检验失败
            console.log('error submit!!');
            return false;
          }
        });
    },
    /**
     * @description: 新增按钮
     * @param {*}
     * @return {*}
     */ 
    toAdd(){
      this.visible=true;
      this.title='新增数据';
    } ,    
    /**
     * @description:查询所有配置信息
     * @param {*}
     * @return {*}
     */
    async findAllConf() {
      let res = await findAll();
      //console.log(res, "获取响应");
      this.baseConfig = res.data;
    },
    /**
     * @description:图片上传成功之后的回调
     * @param {*}
     * @return {*}
     */
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.val=showFileURL + res.data.slice(21);
    },
    /**
     * @description: 图片上传成功前的回调
     * @param {*} file
     * @return {*}
     */    
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
  },
};
</script>
<style lang="scss">
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
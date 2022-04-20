<!--
 * @Author: your name
 * @Date: 2022-04-18 14:45:09
 * @LastEditTime: 2022-04-19 10:39:45
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \文档\项目\家政服务预约平台\vue-admin-template\src\views\cargory\toPubDetail.vue
-->
<template>
  <div>
    <el-form :model="form" :rules="rules" ref="myForm">
      <!-- 第一行 -->
      <el-row>
        <el-col :span="18">
          <el-form-item label="标题" label-width="60px" prop="title">
            <el-input v-model="form.title" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="分类" label-width="60px" prop="categoryId">
            <el-select
              clearable
              v-model="form.categoryId"
              placeholder="请输入栏目"
            >
              <el-option
                v-for="item in article"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="封面" label-width="60px">
            <el-upload
              :action="uploadFileURL"
              list-type="picture-card"
              :on-success="handlerSuccess"
              :limit="1"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 第二行 富文本编辑器 -->
      <el-form-item label="正文" label-width="60px" prop="content">
        <Tinymce v-model="form.content" :height="240"></Tinymce>
      </el-form-item>
      <!-- 第三行 发布按钮 返回按钮 -->
      <div style="text-align: right">
        <el-form-item>
          <el-button type="text" @click="$router.go(-1)">返回</el-button>
          <el-button @click="toSubmit" type="primary">发布</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
import { findAll, saveOrUpdate } from "@/api/category";
import { showFileURL, uploadFileURL } from "@/utils/config";
import Tinymce from "@/components/Tinymce";
export default {
  components: { Tinymce },
  data() {
    return {
      //表单验证规则
      rules: {
        title: [{ required: true, message: "请输入文章标题", trigger: "blur" }],
        categoryId: [
          { required: true, message: "请选择栏目", trigger: "change" },
        ],
        content: [
          { required: true, message: "请输入文章内容", trigger: "change" },
        ],
      },
      showFileURL,
      uploadFileURL,
      //表单对象
      form: {},
      //所有文章分类
      article: [],
    };
  },
  created() {
    this.findAllCar();
  },
  methods: {
    /**
     * @description: 发布文章
     * @param {*}
     * @return {*}
     */
    async toSubmit() {
      this.$refs["myForm"].validate(async (valid) => {
        if (valid) {
          let res = await saveOrUpdate(this.form);
          this.$notify({
            type: "success",
            message: res.message,
          });
          this.$router.go(-1);
        }else{
          console.log('error submit!!');          
        }
      });
    },
    /**
     * @description: 图片上传成功的回调
     * @param {*}
     * @return {*}
     */
    handlerSuccess(res) {
      //console.log(res,'获取图片上传的成功回调');
      this.form.cover = showFileURL + res.data.slice(21);
      console.log(this.form.cover);
    },
    /**
     * @description: 查询所有文章分类
     * @param {*}
     * @return {*}
     */
    async findAllCar() {
      let res = await findAll({
        page: 1,
        pageSize: 1000,
      });
      this.article = res.data;
    },
  },
};
</script>
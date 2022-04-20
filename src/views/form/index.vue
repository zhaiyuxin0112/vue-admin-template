<!--
 * @Author: your name
 * @Date: 2022-04-02 00:33:19
 * @LastEditTime: 2022-04-14 23:25:36
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \文档\项目\家政服务预约平台\vue-admin-template\src\views\form\index.vue
-->
<template>
  <div>
    <!-- 这是第一行开始 按钮和输入框下拉框-->
    <div>
      <el-form
        size="small"
        :inline="true"
        :model="params"
        class="demo-form-inline"
      >
        <el-button
          style="margin-right: 10px"
          size="small"
          type="primary"
          @click="toAdd"
          >添加</el-button
        >

        <el-form-item>
          <!-- clearable表示可清除的 -->
          <el-input
            clearable
            v-model="params.name"
            placeholder="请输入名称"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-select clearable v-model="params.status" placeholder="请选择状态">
            <el-option label="正常" value="正常"></el-option>
            <el-option label="下架" value="下架"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            clearable
            v-model="params.productCategoryId"
            placeholder="请选择栏目"
          >
            <!-- label显示给顾客看的   value真正传入后台的值 -->
            <el-option
              v-for="item in columnList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="toSearch(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 这是第一行结束 -->
    <!-- 第二行开始 -->
    <div>
      <!-- loading加载表格，当数据查询不出来的时候加载动画 -->
      <el-table
        v-loading="loading"
        size="small"
        :data="productList"
        style="width: 100%"
      >
        <!-- prop父组件给子组件传值 :绑定，呈现出来的就是number-->
        <el-table-column type="index" :index="1" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="id" label="客房编号" width="140">
        </el-table-column>
        <el-table-column prop="name" label="名称" width="180">
        </el-table-column>
        <el-table-column prop="photo" label="图片">
          <template slot-scope="scope">
            <el-popover placement="right" trigger="hover">
              <img width="200px" :src="scope.row.photo" alt="" />
              <!-- slot='reference'触发popover的html元素 -->
              <img
                width="50px"
                slot="reference"
                :src="scope.row.photo"
                alt=""
              />
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="价格"> </el-table-column>
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
              v-if="scope.row.status === '正常'"
              type="success"
              >正常</el-tag
            >
            <el-tag size="small" v-else type="danger">下架</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="category.name" label="所属栏目" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <!-- 判断当前行的状态  用插槽 -->
          <template slot-scope="scope">
            <el-button @click="toEdit(scope.row)" type="text" size="small">编辑</el-button>
            <el-button
              @click="onLine(scope.row.id)"
              v-if="scope.row.status === '下架'"
              type="text"
              size="small"
              >上架</el-button
            >
            <el-button
              @click="offLine(scope.row.id)"
              style="color: red"
              v-else
              type="text"
              size="small"
              >下架</el-button
            >
            <el-button size="small" type="text" @click="toDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 第二行结束 -->
    <!-- 第三行开始 分页-->
    <div class="page">
      <el-pagination
        
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.page"
        :page-sizes="[5, 10, 15, 25, 50, 100]"
        :page-size="params.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- 第三行结束 -->
    <!-- 模态框开始 -->
    <el-dialog @close='toClose' :title="title" :visible.sync="visible">
      <el-form :model="form" :rules='rules' ref='myForm'>
        <el-form-item  label="产品名称" :label-width="formLabelWidth" prop="name">
          <el-input clearable v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属栏目" :label-width="formLabelWidth" prop="productCategoryId">
          <el-select v-model="form.productCategoryId" placeholder="请选择所属栏目" clearable>
            <el-option
              v-for="item in columnList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="价格" :label-width="formLabelWidth" prop="price">
          <el-input clearable v-model.number="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="封面" :label-width="formLabelWidth" prop="photo">
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
import { pageQuery, online, offline,saveOrUpdate,deleteById } from "@/api/product";
import { pageQuery as pageQueryPro } from "@/api/column";
//将文件上传的图片展示的变量引进来
import {showFileURL,uploadFileURL} from "@/utils/config";
export default {
  data() {
    return {
      //表单验证规则
      rules:{
        name:[{required:true,message:"请输入产品名称",trigger:"blur"}],
        productCategoryId:[{required:true,message:"请选择所属栏目",trigger:"change"}],
        price:[{type:'number',required:true,message:"请输入价格",trigger:"blur"}],
        photo:[{required:true,message:"请上传封面",trigger:"change"}]
      },
      //图片展示路径
      showFileURL,
      //图片上传路径
      uploadFileURL,
      //图片
      imageUrl:"",
      //模态框标题
      title: "",
      //控制模态框显示与隐藏
      visible: false,
      //表单对象
      form: {},
      //表单对象宽度
      formLabelWidth: "80px",
      //提供表格数据
      productList: [],
      //产品总条数
      total: 0,
      //分页属性和条件的表单对象
      params: {
        page: 1,
        pageSize: 10,
      },
      //表格加载动画
      loading: false,
      //栏目信息
      columnList: [],
    };
  },
  created() {
    //分页并根据条件查询产品数据
    this.findAllPro();
    //获取所有栏目的信息
    this.findAllColumn();
  },
  methods: {
    /**
     * @description: 删除产品
     * @param {*}
     * @return {*}
     */    
    toDelete(id){
     this.$confirm("此操作将删除产品, 是否继续?", "提示", {
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
          this.findAllPro();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
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
            this.findAllPro();
          } else {
            //检验失败
            console.log('error submit!!');
            return false;
          }
        });
    },
    /**
     * @description: 编辑按钮
     * @param {*}
     * @return {*}
     */   
    toEdit(row){
       this.visible=true;
       this.title='修改产品信息';
       this.form={...row};//当前行的数据绑定到表单中
       this.imageUrl=this.form.photo;
    } ,
    /**
     * @description: 头像上传成功的回调
     * @param {*}
     * @return {*}
     */    
    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        //console.log(res,'获取相应');
        this.form.photo=showFileURL+res.data.slice(21);
        //console.log(this.form.photo);
      },
      /**
       * @description: 头像上传之前的回调
       * @param {*} file
       * @return {*}
       */    
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
    /**
     * @description: 添加按钮
     * @param {*}
     * @return {*}
     */
    toAdd() {
      this.visible = true;
      this.title = "添加产品信息";
      this.form={};//在点击添加的时候表单中是一个空对象
      this.imageUrl="";
    },
    /**
     * @description: 产品上架
     * @param {*} page
     * @return {*}
     */
    onLine(id) {
      this.$confirm("此操作将上架产品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          //确认上架
          //发送上架请求
          let res = await online({ id });
          //console.log(res);
          //成功的消息提示，返回的是后台的提示语，不是写死的
          this.$notify({
            type: "success",
            message: res.message,
          });
          //重载数据,重新加载页面
          this.findAllPro();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消上架",
          });
        });
    },
    /**
     * @description: 产品下架
     * @param {*} page
     * @return {*}
     */
    async offLine(id) {
      this.$confirm("此操作将下架产品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          //确认下架
          //发送下架请求
          let res = await offline({ id });
          //成功的消息提示，返回的是后台的提示语，不是写死的
          this.$notify({
            type: "success",
            message: res.message,
          });
          //重载数据,重新加载页面
          this.findAllPro();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消下架",
          });
        });
    },
    toSearch(page) {
      // 查询从第一页开始查，不是停到哪一页从哪一页开始
      if (page) {
        this.params.page = page;
      }
      this.findAllPro();
    },
    /**
     * @description: 获取所有栏目的信息
     * @param {*}
     * @return {*}
     */
    async findAllColumn() {
      let res = await pageQueryPro({
        page: 1,
        pageSize: 1000,
      });
      this.columnList = res.data.list;
      //console.log(res,'获取栏目信息');
    },
    /**
     * @description: 分页或者根据条件查询产品数据，分页之后显示信息
     * @param {*}
     * @return {*}
     */
    async findAllPro() {
      let temp = { ...this.params };
      //console.log(temp,'1111111111');
      for (let key in temp) {
        if (!temp[key]) {
          delete temp[key];
        }
      }
      this.loading = true;
      let res = await pageQuery(temp);
      //面试题：怎么优化项目  尽可能减少网络请求 使用雪碧图 减少控制台的打印 使用服务器端渲染
      //console.log(res, "获取数据");
      //将后台获取的数据赋值给产品表格数据
      this.productList = res.data.list;
      this.total = res.data.total;
      this.loading = false;
      //发请求之前加载，拿到请求后不加载
    },
    /**
     * ctrl+win+t
     * @description: 处理页码条数发生改变的事件
     * @param {*}
     * @return {*}
     */
    handleSizeChange(pageSize) {
      //val---pageSize
      // console.log(pageSize);
      this.params.pageSize = pageSize;
      //当pagesize改变的时候，定位到第一页
      this.params.page = 1;
      this.findAllPro();
    },
    /**
     * @description: 处理当前页码发生变化的事件
     * @param {*}
     * @return {*}
     */
    handleCurrentChange(page) {
      this.params.page = page;
      this.findAllPro();
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

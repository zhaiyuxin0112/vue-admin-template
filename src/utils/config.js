/*
 * @Author: your name
 * @Date: 2022-04-12 13:31:20
 * @LastEditTime: 2022-04-12 13:31:20
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \文档\项目\家政服务预约平台\vue-admin-template\src\utils\config.js
 */
/*
 * @Author: [kangjie]
 * @Date: 2022-04-10 23:21:25
 * @LastEditors: [kangjie]
 * @LastEditTime: 2022-04-11 23:04:47
 * @Description: 
 */

/**
 * 项目内部说明：
 * 轮播图状态：停用，启用
 * 产品状态：下架，正常
 * 用户状态：正常，禁用
 * 评论状态：审核通过，审核未通过
 * 员工账单状态：正常，未审核  类型：收益，提现
 * 顾客账单状态：正常，未审核  类型：充值，消费
 * 系统账单状态：正常，未审核  类型：充值，收益，提现
 * 订单状态：待支付，待派单，待接单，待服务，待确认，已完成
 * 栏目都只有一级栏目
 * 用户只有一个角色
 */
// 员工 1   管理员 2  顾客 6
const roles = {
    waiter: 1,
    admin: 2,
    customer: 6
  }
  
  
  const showFileURL = 'http://121.4.83.32:7001'
  // 项目基础路径和文件上传路径
  const uploadFileURL = 'http://121.4.83.32:7001/UploadControlle/upload'
  /* 附件服务器接口
  http://121.199.29.84:5588/file/upload
  http://121.199.29.84:8888/group1/ 图片ID */
  
  export {
    roles,
    showFileURL,
    uploadFileURL,
  }
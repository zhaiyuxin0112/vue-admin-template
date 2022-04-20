/*
 * @Author: your name
 * @Date: 2022-04-02 00:33:19
 * @LastEditTime: 2022-04-14 14:39:24
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \文档\项目\家政服务预约平台\vue-admin-template\src\api\user.js
 */
// import request, { postJSON } from '@/utils/request'
import {get,post,postJSON} from '@/utils/request'

export function login(data) {
  // return request({
  //   //注释原来mock模拟后台的数据
  //   // url: '/vue-admin-template/user/login',
  //   url: '/user/login',
  //   method: 'post',
  //   data
  // })
  return postJSON('/user/login',data)
}

export function getInfo(token) {
  // return request({  通过token获取用户接口
  //   // url: '/vue-admin-template/user/info',
  //   url: '/user/info',
  //   method: 'get',
  //   params: { token }
  // })
  return get('/user/info',{token})
}

export function logout() {
  // return request({
  //   // url: '/vue-admin-template/user/logout',
  //   url: '/user/logout',
  //   method: 'post'
  // })
  return post('/user/logout')
}

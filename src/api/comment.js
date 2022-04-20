/*
 * @Author: your name
 * @Date: 2022-04-15 14:27:06
 * @LastEditTime: 2022-04-15 16:10:21
 * @LastEditors: Please set LastEditors
 * @Description: 评论接口API
 * @FilePath: \文档\项目\家政服务预约平台\vue-admin-template\src\api\comment.js
 */

import {get,post} from "@/utils/request"

/**
 * @description: 分页展示所有评论
 * @param {*}
 * @return {*}
 */
 export function pageQuery(data){
    return get('/comment/pageQuery',data)
 }
 /**
  * @description: 删除评论
  * @param {*}
  * @return {*}
  */
  export function deleteById(data){
    return post('/comment/deleteById',data)
 }
 /**
  * @description:批量删除评论 
  * @param {*}
  * @return {*}
  */
  export function batchDelete(data){
    return post('/comment/batchDelete',data)
 }
/**
  * @description: 审核评论
  * @param {*}
  * @return {*}
  */
 export function check(data){
    return get('/comment/check',data)
 }
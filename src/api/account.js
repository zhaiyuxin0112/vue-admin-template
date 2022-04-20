/*
 * @Author: your name
 * @Date: 2022-04-15 09:10:50
 * @LastEditTime: 2022-04-15 09:16:26
 * @LastEditors: Please set LastEditors
 * @Description: 账户变动API
 * @FilePath: \文档\项目\家政服务预约平台\vue-admin-template\src\api\account.js
 */
import {get,post} from '@/utils/request';

/**
 * @description: 分页并根据条件查询的账户变更
 * @param {*}
 * @return {*}
 */
export function pageQueryAccountApply(data){
   return get('/accountApply/pageQueryAccountApply',data)
}
/**
 * @description: 审核通过
 * @param {*}
 * @return {*}
 */
 export function checkPass(data){
    return get('/accountApply/checkPass',data)
 }
 /**
  * @description: 审核不通过
  * @param {*}
  * @return {*}
  */
  export function checkNoPass(data){
    return get('/accountApply/checkNoPass',data)
 }
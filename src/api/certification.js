/*
 * @Author: your name
 * @Date: 2022-04-19 17:16:48
 * @LastEditTime: 2022-04-20 17:37:04
 * @LastEditors: Please set LastEditors
 * @Description: 实名认证API
 * @FilePath: \文档\项目\家政服务预约平台\vue-admin-template\src\api\certification.js
 */
import {get,post} from '@/utils/request';
/**
 * @description: 审核通过
 * @param {*}
 * @return {*}
 */
 export function checkPass(data){
    return get('/certification/checkPass',data)
}
/**
 * @description:审核不通过 
 * @param {*}
 * @return {*}
 */
 export function checkNoPass(data){
    return get('/certification/checkNoPass',data)
}
/**
 * @description: 分页查询实名认证申请
 * @param {*}
 * @return {*}
 */
 export function pageQueryCertificationApply(data){
    return get('/certification/pageQueryCertificationApply',data)
}
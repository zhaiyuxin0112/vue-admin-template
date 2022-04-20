/*
 * @Author: your name
 * @Date: 2022-04-14 09:38:32
 * @LastEditTime: 2022-04-14 14:41:47
 * @LastEditors: Please set LastEditors
 * @Description: 订单接口API
 * @FilePath: \文档\项目\家政服务预约平台\vue-admin-template\src\api\order.js
 */
import {get,post} from '@/utils/request'
/**
 * @description: 分页并根据状态查询订单
 * @param {*}
 * @return {*}
 */
export function pageQuery(data){
    return get('/order/pageQuery',data)
}
/**
 * @description: 派单
 * @param {*}
 * @return {*}
 */
 export function sendOrder(data){
    return get('/order/sendOrder',data)
}
/**
 * @description: 取消派单
 * @param {*}
 * @return {*}
 */
 export function cancelSendOrder(data){
    return get('/order/cancelSendOrder',data)
}
/**
 * @description: 查询所有员工， 注意角色id为1
 * @param {*}
 * @return {*}
 */
 export function pageQueryYm(data){
    return get('/baseUser/pageQuery',data)
}
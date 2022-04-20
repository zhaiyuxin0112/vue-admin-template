/*
 * @Author: your name
 * @Date: 2022-04-11 10:20:24
 * @LastEditTime: 2022-04-12 15:05:59
 * @LastEditors: Please set LastEditors
 * @Description: 产品管理接口API
 * @FilePath: \文档\项目\家政服务预约平台\vue-admin-template\src\api\product.js
 */

import { get,post } from "@/utils/request";
// 把方法封装起来，在页面上要使用的话直接引用
/**
 * @description: 根据分页和条件获取产品数据
 * @param {*}
 * @return {*}
 */
export function pageQuery(data){
    return get('/product/pageQuery',data)
}
/**
 * @description: 保存或者更新产品信息api
 * @param {*}
 * @return {*}
 */
 export function saveOrUpdate(data){
    return post('/product/saveOrUpdate',data)
}
/**
 * @description: 产品上架
 * @param {*}
 * @return {*}
 */
 export function online(data){
    return get('/product/online',data)
}
/**
 * @description: 产品下架
 * @param {*}
 * @return {*}
 */
 export function offline(data){
    return get('/product/offline',data)
}
/**
 * @description: 通过id删除
 * @param {*}
 * @return {*}
 */
export function deleteById(data){
    return get('/product/deleteById',data)
}
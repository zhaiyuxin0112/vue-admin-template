import { get, post } from "@/utils/request";

/*
 * @Author: your name
 * @Date: 2022-04-11 14:56:16
 * @LastEditTime: 2022-04-14 23:39:27
 * @LastEditors: Please set LastEditors
 * @Description: 栏目管理api
 * @FilePath: \文档\项目\家政服务预约平台\vue-admin-template\src\api\column.js
 */
/**
 * @description: 分页获取栏目信息
 * @param {*} data
 * @return {*}
 */
export function pageQuery(data){
    return get('/productCategory/pageQuery',data)
}
/**
 * @description: 保存或更新产品分类信息
 * @param {*}
 * @return {*}
 */
export function saveOrUpdate(data){
    return post('/productCategory/saveOrUpdate',data)
}
/**
 * @description: 通过id删除产品分类
 * @param {*}
 * @return {*}
 */
 export function deleteById(data){
    return get('/productCategory/deleteById',data)
}
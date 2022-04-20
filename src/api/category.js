/*
 * @Author: your name
 * @Date: 2022-04-18 09:46:00
 * @LastEditTime: 2022-04-19 15:10:10
 * @LastEditors: Please set LastEditors
 * @Description: 网站咨询api
 * @FilePath: \文档\项目\家政服务预约平台\vue-admin-template\src\api\category.js
 */
import {get,post} from '@/utils/request';
/**
 * @description: 分页并根据条件获取资讯列表
 * @param {*}
 * @return {*}
 */
export function pageQuery(data){
    return get('/article/pageQuery',data)
}
/**
 * @description: 修改风采状态
 * @param {*}
 * @return {*}
 */
 export function changeStatus(data){
    return post('/article/changeStatus',data)
}
/**
 * @description: 保存和更新资讯信息
 * @param {*}
 * @return {*}
 */
 export function saveOrUpdate(data){
    return post('/article/saveOrUpdate',data)
}
/**
 * @description: 获取所有文章分类
 * @param {*}
 * @return {*}
 */
export function findAll(data){
    return get('/category/findAll',data)
}
/**
 * @description: 删除风采
 * @param {*}
 * @return {*}
 */
 export function deleteById(data){
    return get('/article/deleteById',data)
}
/**
 * @description: 保存和更新资讯分类
 * @param {*}
 * @return {*}
 */
 export function saveOrUpdatePro(data){
    return post('/category/saveOrUpdate',data)
}
/**
 * @description: 删除咨询分类
 * @param {*}
 * @return {*}
 */
 export function deleteByIdPro(data){
    return get('/category/deleteById',data)
}
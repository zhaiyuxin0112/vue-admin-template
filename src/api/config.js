/*
 * @Author: your name
 * @Date: 2022-04-20 09:21:51
 * @LastEditTime: 2022-04-20 09:27:29
 * @LastEditors: Please set LastEditors
 * @Description: 系统配置API
 * @FilePath: \文档\项目\家政服务预约平台\vue-admin-template\src\api\config.js
 */
import {get,post} from "@/utils/request";
/**
 * @description: 查询所有配置信息
 * @param {*}
 * @return {*}
 */
export function findAll(){
    return get('/baseConfig/findAll')
}
/**
 * @description: 根据id删除当前行的配置信息
 * @param {*}
 * @return {*}
 */
 export function deleteById(data){
    return get('/baseConfig/deleteById',data)
}
/**
 * @description: 保存和更新配置信息
 * @param {*}
 * @return {*}
 */
 export function saveOrUpdate(data){
    return post('/baseConfig/saveOrUpdate',data)
}
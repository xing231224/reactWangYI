/*
 * @Author: your name
 * @Date: 2021-07-09 15:01:01
 * @LastEditTime: 2021-09-18 16:41:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactWangYi\src\utils\storage.js
 */

// 增
export const setItem = (key, value) => {
    return localStorage.setItem(key, value)
}
// 查
export const getItem = (key) => {
    return localStorage.getItem(key)
}
// 删
export const removeItem = (key) => {
    return localStorage.removeItem(key)
}

// 全部删除
export const clearItem = () => {
    return localStorage.clear()
}
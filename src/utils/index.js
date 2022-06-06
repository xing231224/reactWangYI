/*
 * @Author: your name
 * @Date: 2021-11-26 15:36:07
 * @LastEditTime: 2021-11-26 15:36:08
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \reactWangYi\src\utils\index.js
 */
/**
 * @description: 防抖函数
 * @param {*} delay  时间 延迟多少执行一次
 * @param {*} callback 回调函数
 * @return {*}
 */
export function debounce(delay, callback) {
  let timer = null;
  return function (value) {
    // 闭包内存泄漏
    clearInterval(timer);
    timer = setTimeout(function () {
      callback(value);
    }, delay);
  };
}

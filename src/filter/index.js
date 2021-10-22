/*
 * @Author: your name
 * @Date: 2021-07-10 09:24:11
 * @LastEditTime: 2021-09-30 17:54:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactWangYi\src\filter\index.js
 */
export const filterPrice = (price) => {
  return price.toFixed(2);
};
export const filterTime = (time) => {
  let date = new Date(time);
  let y = date.getFullYear();
  let m = (date.getMonth() + 1 + "").padStart(2, "0");
  let d = (date.getDate() + "").padStart(2, "0");
  return `${y}-${m}-${d}`;
};
export const sfTime = (time) => {
  let date = new Date(time);
  let h = date.getHours(); //获取系统时，
  let m = (date.getMinutes() + "").padStart(2, "0"); //分
  let s = (date.getSeconds() + "").padStart(2, "0"); //秒

  h = h ? h + "h" : "";
  m = m ? m + "m" : "";
  s = s ? s + "s" : "";
  return h + m + s;
};

export const timeFormat = (seconds) => {
  var minite = Math.floor(seconds / 60);
  if (minite < 10) {
    minite = "0" + minite;
  }
  var second = Math.floor(seconds % 60);
  if (second < 10) {
    second = "0" + second;
  }
  return minite + ":" + second;
};
export const quantityFilter = (num) => {
  num = String(num);
  if (num.length >= 5)
    return num.substring(num.length - 6, num.length - 4) + "万";
  return num;
};
export const thousands = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+$)/g, ",");
};

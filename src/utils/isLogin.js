/*
 * @Author: your name
 * @Date: 2021-07-09 17:30:50
 * @LastEditTime: 2021-11-22 10:42:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactWangYi\src\utils\isLogin.js
 */
import { getItem } from './storage'
import { alert } from './tips'


let isLogin = (a) => {
    let _this = a
    let userInfo = getItem("userInfo") || ""
    if (userInfo === "") {
        // 去登录
        alert("提示未登录", "是否去登录？？？", "不了", "好的").then(() => {
            _this.props.history.push("/login")
            console.log("ok");
        }).catch(err => {
            _this.props.history.push("/index/browse?activeIndex=0")
        })
        return
    } else {
        return true
    }
}

export default isLogin
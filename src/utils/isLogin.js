/*
 * @Author: your name
 * @Date: 2021-07-09 17:30:50
 * @LastEditTime: 2021-09-28 14:29:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactWangYi\src\utils\isLogin.js
 */
import { getItem } from './storage'
import { alert } from './tips'


let isLogin = (a) => {
    console.log(a);
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
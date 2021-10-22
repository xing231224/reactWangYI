/*
 * @Author: your name
 * @Date: 2021-07-09 14:41:17
 * @LastEditTime: 2021-09-18 16:39:04
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \reactWangYi\src\utils\request.js
 */
import axios from "axios";
// import qs from "qs"
import { setItem, getItem } from './storage'

// 请求拦截
axios.interceptors.request.use(config => {

    let token = getItem("token") || ""

    if (token !== "") {
        config.headers = {
            ...config.headers,
            token,
            "Content-type": "application/x-www-form-urlencoded"
        }
    }

    return config

})
// 响应拦截
axios.interceptors.response.use(response => {

    if (response.config.url === "/login/cellphone" && response.status === 200) {
        setItem("token", response.data.token)
    }
    // console.log(response);

    return response
},err=>{
   return err
})


export default axios
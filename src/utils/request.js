/*
 * @Author: your name
 * @Date: 2021-07-09 14:41:17
 * @LastEditTime: 2021-11-29 10:27:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactWangYi\src\utils\request.js
 */
import axios from "axios";
import { setItem, getItem } from "./storage";
import { failToast } from "./tips";
import { clearItem } from "./storage";

// 请求拦截
axios.interceptors.request.use((config) => {
  let token = getItem("token") || "";
  if (token !== "") {
    config.headers = {
      ...config.headers,
      token,
      "Content-type": "application/x-www-form-urlencoded",
    };
  }

  return config;
});
// 响应拦截
axios.interceptors.response.use(
  (response) => {
    if (response.config.url === "/login/cellphone" && response.status === 200) {
      setItem("token", response.data.token);
    }
    return response;
  },
  (error) => {
    error = JSON.stringify(error);
    if (/301/.test(error)) {
      failToast("登录失效");
      clearItem();
    }else if(/404/.test(error)){
        console.log(404);
    }
    return Promise.reject(error);
  }
);



export default axios;

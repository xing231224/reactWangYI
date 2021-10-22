/*
 * @Author: your name
 * @Date: 2021-07-07 09:49:44
 * @LastEditTime: 2021-09-23 15:26:53
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \reactWangYi\src\index.js
 */
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// 配置路由模式
import { HashRouter } from "react-router-dom";
// 导入css
import "animate.css";
ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

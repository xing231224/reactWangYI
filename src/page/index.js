/*
 * @Author: your name
 * @Date: 2021-07-07 10:45:29
 * @LastEditTime: 2021-09-28 15:28:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactWangYi\src\page\index.js
 */
// 导入页面
// import Home from "./home/index"
// import Loading from "./loading/index"
// import Login from "./login/index"

import { asyncComponent } from "../utils/asyncComponent";

// 懒加载
const Home = asyncComponent(() => import("./home/index"));
const Loading = asyncComponent(() => import("./loading/index"));
const Login = asyncComponent(() => import("./login/index"));
const SongList = asyncComponent(() => import("./songList/index"));
// const PlayMusic = asyncComponent(() => import("./playMusic"));

// tabbar 页面
const Browse = asyncComponent(() => import("./tabbar/browse"));
const Discover = asyncComponent(() => import("./tabbar/discover"));
const Library = asyncComponent(() => import("./tabbar/library"));
const Profile = asyncComponent(() => import("./tabbar/profile"));
const Store = asyncComponent(() => import("./tabbar/store"));

// 导出
export {
  Home,
  //   PlayMusic,
  Loading,
  Login,
  SongList,
  Browse,
  Discover,
  Library,
  Profile,
  Store,
};

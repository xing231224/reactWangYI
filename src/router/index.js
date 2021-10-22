/*
 * @Author: your name
 * @Date: 2021-07-07 10:45:29
 * @LastEditTime: 2021-09-28 15:28:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactWangYi\src\router\index.js
 */
// 引入组件
import {
  Home,
  Loading,
  Login,
  // PlayMusic,
  SongList,
  Browse,
  Discover,
  Library,
  Profile,
  Store,
} from "../page";

// 配置路由规则
export const mainRoute = [
  {
    path: "/index",
    component: Home,
  },
  {
    path: "/loading",
    component: Loading,
    exact: true,
  },
  {
    path: "/login",
    component: Login,
    // exact:true
  },
  {
    path: "/songlist",
    component: SongList,
  },
  // {
  //     path: "/play",
  //     component: PlayMusic
  // }
];
export const tabbarRoute = [
  {
    activeIndex: 0,
    path: "/index/browse",
    component: Browse,
    exact: true,
  },
  { activeIndex: 1, path: "/index/discover", component: Discover },
  {
    activeIndex: 2,
    path: "/index/library",
    component: Library,
  },
  {
    activeIndex: 3,
    path: "/index/profile",
    component: Profile,
  },
  {
    activeIndex: 4,
    path: "/index/store",
    component: Store,
  },
];

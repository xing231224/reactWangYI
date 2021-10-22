/*
 * @Author: your name
 * @Date: 2021-07-16 16:55:42
 * @LastEditTime: 2021-09-24 11:27:03
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \reactWangYi\src\store\index.js
 */
import { Dispatcher } from "flux";

let state = {
  likeList: [],
};

let dispatcher = new Dispatcher();

dispatcher.register((action) => {
  switch (action.type) {
    case "getlist":
      state.likeList = action.list;
      break;
    default:
      return;
  }
});

export default {
  state,
  dispatcher,
};

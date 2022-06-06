/*
 * @Author: your name
 * @Date: 2021-07-16 16:55:42
 * @LastEditTime: 2021-11-26 10:22:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactWangYi\src\store\index.js
 */
import { Dispatcher } from "flux";
import Event from "events";

class State extends Event {
  constructor() {
    super();
    this.likeList = [];
    this.playList = [];
  }
}

let state = new State();

let dispatcher = new Dispatcher();

dispatcher.register((action) => {
  switch (action.type) {
    case "getlist":
      state.likeList = action.list;
      state.emit("change");
      break;
    case "getPlayList":
      state.playList = action.list;
      state.emit("change");
    default:
      return;
  }
});

export default {
  state,
  dispatcher,
};

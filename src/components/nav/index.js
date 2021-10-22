/*
 * @Author: your name
 * @Date: 2021-07-08 17:51:21
 * @LastEditTime: 2021-09-29 14:47:05
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \reactWangYi\src\components\nav\index.js
 */
import React from "react";
import { nav } from "../../utils/imgUrl";
import "./index.scss";

export default class Nav extends React.Component {
  constructor() {
    super();
  }

  goRoute() {
    console.log(this.props);
    this.props.history.goBack();
  }

  render() {
    return (
      <div className="nav">
        <img
          onClick={() => {
            this.goRoute();
          }}
          className="img"
          src={nav.navBack}
          alt=""
        />
      </div>
    );
  }
}

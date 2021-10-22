/*
 * @Author: your name
 * @Date: 2021-07-07 10:47:14
 * @LastEditTime: 2021-09-30 17:09:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactWangYi\src\page\home\index.js
 */
import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import HeaderNav from "../../components/headerNav";
import Tabbar from "../../components/tabbar";

import querystring from "querystring";
import { tabbarRoute } from "../../router";
export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      activeIndex: 4,
    };
  }
  changeIndex(index) {
    this.setState({
      activeIndex: index,
    });
  }
  componentWillMount() {
    let activeIndex =
      querystring.parse(this.props.history.location.search.slice(1))
        .activeIndex || "";
    if (activeIndex !== "") return this.setState({ activeIndex });
  }
  render() {
    let { activeIndex } = this.state;
    return (
      <div>
        {/* <HeaderNav activeIndex={activeIndex} /> */}
        <Switch>
          {tabbarRoute.map((route, index) => {
            return (
              <Route
                path={route.path}
                component={route.component}
                key={index}
              ></Route>
            );
          })}
          <Redirect to="/index/browse" exact />
        </Switch>
        
        <Tabbar activeIndex={activeIndex} />
      </div>
    );
  }
}

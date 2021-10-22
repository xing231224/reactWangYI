// import "./App.css"
import "antd-mobile/dist/antd-mobile.css";
import PlayMusic from "./components/playMusic";
// 配置路由
import { Route, Redirect, Switch } from "react-router-dom";
import { mainRoute } from "./router";
import React from "react";

export default class App extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <Switch>
          {mainRoute.map((route, index) => {
            return (
              <Route
                path={route.path}
                component={route.component}
                key={index}
              ></Route>
            );
          })}
          <Redirect to="/loading" from="/" exact />
        </Switch>
        <PlayMusic />
      </div>
    );
  }
}

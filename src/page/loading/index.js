/*
 * @Author: your name
 * @Date: 2021-07-07 10:58:29
 * @LastEditTime: 2021-09-18 16:44:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactWangYi\src\page\loading\index.js
 */
/*
 * @Author: your name
 * @Date: 2021-07-07 10:58:29
 * @LastEditTime: 2021-08-28 09:20:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactWangYi\src\page\loading\index.js
 */
import React, { Component } from "react";
import "./index.scss";
import { Carousel } from "antd-mobile";
import { bannerList, loginButton } from "../../utils/imgUrl";
export default class Loading extends Component {
  constructor() {
    super();
    this.state = {
      bannerIndex: 0,
    };
  }
  goRoute(status) {
    this.props.history.push("/login/" + status);
  }
  render() {
    const dotStyle = {
      width: "6px",
      height: "6px",
      borderRadius: "50%",
      backgroundColor: "#b5a2d2",
    };
    const dotActiveStyle = {
      border: " 1px solid #00aeef",
      backgroundColor: "#fff",
    };
    return (
      <div className="login">
        <Carousel autoplay infinite dotStyle={dotStyle} dotActiveStyle={dotActiveStyle}>
                    {
                        bannerList.map(item => {
                            return (
                                <div className="login-banner" key={item.id}>
                                    <img className="login-bannerImg" src={item.img} alt="" />
                                </div>
                            )
                        })
                    }
                </Carousel>
                <div className="login-foot">
                    <img className="imgW" src={loginButton.monkBoard} alt="" />
                    <div className="login-button">
                        <div className="login-btn">
                            <div className="login-b" onClick={() => { this.goRoute(1) }} >
                                <img src={loginButton.buttonLeft} alt="" />
                                <div className="login-icon">
                                    <img src={loginButton.facebook} alt="" />
                                </div>
                            </div>
                            <div className="login-b" onClick={() => { this.goRoute(2) }}>
                                <img src={loginButton.buttonRight} alt="" />
                                <div className="login-icon">
                                    <img src={loginButton.twitter} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="login-font">
                            <img src={loginButton.font} alt="" />
                        </div>
                    </div>
                </div>
      </div>
    );
  }
}

/*
 * @Author: your name
 * @Date: 2021-07-08 11:55:55
 * @LastEditTime: 2021-09-28 15:24:50
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \reactWangYi\src\page\login\index.js
 */
import "./index.scss";
import Nav from "../../components/nav";
import React from "react";
import { failToast, successToast } from "../../utils/tips";
import { phoneLogin } from "../../api/login";
import { setItem, getItem } from "../../utils/storage";

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      pageHeight: null,
      form: {
        phone: "",
        password: "",
      },
    };
  }
  componentDidMount() {
    this.setState({
      pageHeight: window.screen.height,
    });
    let userInfo = getItem("userInfo") || "";
    if (userInfo !== "")
      return this.props.history.push("/index/profile?activeIndex=4");
  }
  changeForm(e, key) {
    this.setState({
      form: {
        ...this.state.form,
        [key]: e.target.value,
      },
    });
  }
  submit() {
    let { form } = this.state;
    if (!/^1[3456789]\d{9}$/.test(form.phone)) {
      failToast("手机号码不合法，请重新输入");
      return false;
    }
    if (form.password.trim() === "") {
      failToast("密码不能为空！！！");
      return;
    }
    phoneLogin(form).then((res) => {
      if (res.data.code === 200) {
        setItem("userInfo", JSON.stringify(res.data.profile));
        setItem("token", res.data.token);
        successToast("登录成功！！！", 1, () => {
          this.props.history.push("/index/profile?activeIndex=4");
        });
      } else {
        failToast(res.data.msg);
      }
    });

    this.setState({
      form: {},
    });
  }

  render() {
    const pageHeight = {
      height: `${this.state.pageHeight - 50}px`,
    };
    let { form } = this.state;
    return (
      <div>
        <Nav history={this.props.history}></Nav>
        <div className="login" style={pageHeight}>
          <form action="">
            <div className="username">
              <span>Phone:</span>
              <input
                value={form.phone || ""}
                onChange={(e) => this.changeForm(e, "phone")}
                type="text"
              />
            </div>
            <div className="password">
              <span>PassWord:</span>
              <input
                value={form.password || ""}
                onChange={(e) => this.changeForm(e, "password")}
                type="password"
              />
            </div>
            <button
              type="submit"
              onClick={() => {
                this.submit();
              }}
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    );
  }
}

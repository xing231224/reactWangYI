
import axios from "../utils/request";
import qs from "qs"


// 手机号登录 
export const phoneLogin = (form) => {
    return axios({
        url: `/login/cellphone`,
        method: "post",
        data: qs.stringify(form)
    })
}
// 邮箱登录 
export const emailLogin = ({ email, password }) => {
    return axios({
        url: `/login?email=${email}&password=${password}`,
        method: "post"
    })
}

// 二维码key生成接口
export const qrKeyLogin = () => {
    return axios({
        url: "/login/qr/key",
        method: "post"
    })
}
// 二维码生成接口
export const qrLogin = (key) => {
    return axios({
        url: "/login/qr/create?key=" + key,
        method: "post"
    })
}
/*
二维码检测扫码状态接口
 轮询此接口可获取二维码扫码状态,
 800为二维码过期,
 801为等待扫码,
 802为待确认,
 803为授权登录成功
 (803状态码下会返回cookies)
*/
export const qrLoginStatus = (key) => {
    return axios({
        url: "/login/qr/check?key=" + key,
        method: "post"
    })
}

// 刷新登录 刷新登录状态
export const refreshLogin = () => {
    return axios({
        url: "/login/refresh",
        method: "post"
    })
}

// 发送验证码
export const sentCode = (phone) => {
    return axios({
        url: "/captcha/sent?phone=" + phone,
        method: "post"
    })
}

// 验证验证码
export const verifyCode = ({ phone, code }) => {
    return axios({
        url: "/captcha/verify?phone=" + phone + "&captcha=" + code,
        method: "post"
    })
}


// 注册（修改密码）
export const register = ({ phone, password, captcha, nickname }) => {
    return axios({
        url: `/register/cellphone?phone=${phone}&password=${password}&captcha=${captcha}&nickname=${nickname}`,
        method: "post"
    })
}

// 检测手机号是否被注册过
export const existence = (phone) => {
    return axios({
        url: "/cellphone/existence/check?phone=" + phone,
        method: "post"
    })
}

// 初始化昵称
export const initProfile = (nickname) => {
    return axios({
        url: "/activate/init/profile?nickname=" + nickname,
        method: 'POST'

    })
}
// 更换绑定手机号
export const rebind = ({ phone, oldcaptcha, captcha }) => {
    return axios({
        url: `/rebind?phone=${phone}&oldcaptcha=${oldcaptcha}&captcha=${captcha}`,
        method: "post"
    })
}

// 退出登录  
export const loginOut = () => {
    return axios({
        url: "/logout",
        method: "get"
    })
}
// 登录状态
export const loginStatus = () => {
    return axios({
        url: "login/status"
    })
}
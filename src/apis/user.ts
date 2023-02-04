// 导入axios实例
import httpRequest from "@/request/index";

// 定义接口的传参
export interface UserLoginInfo {
  userName: string;
  userPassword: string;
}

export interface UserRegisterInfo {
  userEmail: string;
  userName: string;
  userPassword: string;
  userPassword2: string;
  userMobile: string;
  userCaptcha: string;
}

export interface UserGetCaptchaInfo {
  userMobile: string;
}

// 获取用户信息 登陆
export function apiUserLogin(param: UserLoginInfo) {
  return httpRequest({
    url: "login",
    method: "post",
    data: param,
  });
}
//注册
export function apiUserRegister(param: UserRegisterInfo) {
  return httpRequest({
    url: "register",
    method: "post",
    data: param,
  });
}
//获取验证码
export function apiGetCaptcha(param: UserGetCaptchaInfo) {
  return httpRequest({
    url: "getCaptcha",
    method: "post",
    data: param,
  });
}

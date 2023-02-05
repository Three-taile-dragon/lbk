import service from "@/request/index";
// 导入axios实例
import type {
  UserLoginInfo,
  UserRegisterInfo,
  UserGetCaptchaInfo,
} from "@/model/user";

// 获取用户信息 登陆
export function apiUserLogin(param: UserLoginInfo) {
  return service({
    url: "login",
    method: "post",
    data: param,
  });
}
//注册
export function apiUserRegister(param: UserRegisterInfo) {
  return service({
    url: "register",
    method: "post",
    data: param,
  });
}
//获取验证码
export function apiGetCaptcha(param: UserGetCaptchaInfo) {
  return service({
    url: "getCaptcha",
    method: "post",
    data: param,
  });
}

import { ElMessage } from "element-plus";
import { defineStore } from "pinia";
import { apiGetCaptcha, apiUserLogin, apiUserRegister } from "@/apis/user";
import type {
  UserGetCaptchaInfo,
  UserLoginInfo,
  UserRegisterInfo,
} from "@/model/user";
import router from "@/router";
export const useUserStore = defineStore("storeUser", {
  state: () => {
    return {
      user: {
        name: "",
        mobile: "",
        status: "",
        code: 0,
      },
      tokenList: {
        accessToken: "",
        refreshToken: "",
        tokenType: "",
        accessTokenExp: "",
      },
    };
  },
  actions: {
    login(parmas: UserLoginInfo) {
      apiUserLogin(parmas).then((res) => {
        if (res.data.code != "200") {
          ElMessage({
            message: res.data.msg,
            type: "error",
            grouping: true,
          });
        } else {
          this.user = res.data.data.member;
          this.tokenList = res.data.data.tokenList;
          ElMessage({
            message: "登陆成功，正在转跳到主页面",
            type: "success",
            duration: 1000,
          });
          setTimeout(() => {
            router.push("/");
          }, 1000);
        }
      });
    },
    register(parmas: UserRegisterInfo) {
      apiUserRegister(parmas).then((res) => {
        if (res.data.code != "200") {
          ElMessage({
            message: res.data.msg,
            type: "error",
            grouping: true,
          });
        } else {
          ElMessage({
            message: "注册成功，正在转跳到主页面",
            type: "success",
            duration: 1000,
          });
          setTimeout(() => {
            router.push("/");
          }, 1000);
        }
      });
    },
    getCaptcha(params: UserGetCaptchaInfo) {
      apiGetCaptcha(params).then((res) => {
        if (res.data.code != 200) {
          ElMessage({
            message: res.data.msg,
            type: "error",
            grouping: true,
          });
        } else {
          ElMessage({
            message: "您的验证码为：" + res.data.data,
            type: "success",
            duration: 10000,
          });
        }
      });
    },
  },
});
export default useUserStore;

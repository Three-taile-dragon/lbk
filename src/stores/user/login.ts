import axios from "axios";
import { useConfigStore } from "./../config";
import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useRequest } from "vue-request";
import {
  apiGetCaptcha,
  apiUserLogin,
  apiUserRegister,
  type UserGetCaptchaInfo,
} from "@/apis/user";
import type { UserLoginInfo, UserRegisterInfo } from "@/apis/user";
import qs from "qs";
export const useUserStore = defineStore("login,register,getCaptcha", {
  state: () => {
    return {
      user: {
        id: 0,
        name: "",
      },
      token: {
        accessToken: "",
        refreshToken: "",
      },
    };
  },
  getters: {},
  actions: {
    login(parmas: UserLoginInfo) {
      apiUserLogin(parmas).then((res) => {
        console.log(res);
      });
    },
    register(parmas: UserRegisterInfo) {
      apiUserRegister(parmas).then((res) => {
        console.log(res);
      });
    },
    getCaptcha(params: UserGetCaptchaInfo) {
      apiGetCaptcha(params).then((res) => {
        console.log(res);
      });
    },
  },
});

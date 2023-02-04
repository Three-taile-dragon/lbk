import { defineStore } from "pinia";
export const useConfigStore = defineStore("config", {
  //定义初始化值
  state: () => {
    return {
      ServerConfig: {
        ip: "127.0.0.1",
        port: "8080",
      },
    };
  },
  //计算 修饰值
  getters: {},
  //可以做同步 异步 提交请求
  actions: {},
});

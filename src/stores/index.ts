import { defineStore } from "pinia";
export const useTestStore = defineStore("", {
  //定义初始化值
  state: () => {
    return {
      current: 1,
    };
  },
  //计算 修饰值
  getters: {},
  //可以做同步 异步 提交请求
  actions: {},
});

import { ElMessage } from "element-plus";
import { defineStore } from "pinia";
import { apiHomeMenu } from "@/apis/home";
// import { Menus } from "@/model/home";
export const useHomeStore = defineStore("storeHome", {
  state: () => {
    return {
      menus: "",
    };
  },
  getters: {
    menuUpdate(params: any) {
      this.menus.id = params.id;
      this.menus.title = params.title;
      this.menus.icon = params.icon;
      this.menus.url = params.url;
      this.menus.filePath = params.filePath;
      this.menus.params = params.params;
      this.menus.node = params.node;
      this.menus.status = params.status;
      this.menus.showSlider = params.showSlider;
      this.menus.children = params.children;
    },
  },
  actions: {
    getHomeMenu(params: "") {
      apiHomeMenu(params).then((res) => {
        if (res.data.code != 200) {
          ElMessage({
            message: res.data.msg,
            type: "error",
            grouping: true,
          });
        } else {
          this.menus = res.data.data;
          console.log(this.menus);
        }
      });
    },
  },
});
export default useHomeStore;

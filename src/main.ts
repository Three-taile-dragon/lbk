import { createApp } from "vue";
import { createPinia } from "pinia";
// import piniaPluginPersist from "pinia-plugin-persist";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router";
// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "./assets/main.css";
import { piniaPlugin } from "./stores";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
const pinia = createPinia();
// pinia.use(piniaPluginPersist);

pinia.use(
  piniaPlugin({
    key: "pinia",
  })
);
// pinia.use(piniaPersist);
app.use(pinia);
//@ts-ignore
app.use(router);
app.use(ElementPlus);
app.mount("#app");

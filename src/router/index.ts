import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import IndexView from "../views/IndexView.vue";
import NoFundView from "../views/NoFundView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import MobileView from "../views/MobileView.vue";
import { checkLogin } from "@/utils/checkLogin";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/404",
      name: "404",
      component: NoFundView,
    },
    {
      path: "/index",
      name: "index",
      component: IndexView,
    },
    {
      path: "/mobile",
      name: "mobile",
      component: MobileView,
    },
  ],
});
//路由白名单
const whiteList = ["/", "/login", "/register", "/404", "/mobile", "/index"];
//路由守卫
router.beforeEach((to, from, next) => {
  //如果 to.url 是包含在白名单内的，放行
  if (whiteList.includes(to.path)) {
    //验证是否登陆
    if (checkLogin()) {
      // TODO 验证是否是手机端——转跳患者页面
      next();
    } else {
      if (whiteList.indexOf(to.path) > -1) {
        next();
      } else {
        next("/login");
      }
    }
  } else {
    next("/404");
  }
});
export default router;

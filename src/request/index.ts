import axios, { AxiosError } from "axios";
import type { AxiosResponse, AxiosRequestConfig } from "axios";
import NProgress from "nprogress";
import { ElMessage } from "element-plus";
// 创建一个 axios 实例
const service = axios.create({
  baseURL: "/api", // 所有的请求地址前缀部分
  timeout: 2000, // 请求超时时间毫秒
  withCredentials: true, // 异步请求携带cookie
  headers: {
    // 设置后端需要的传参类型
    "Content-Type": "application/x-www-form-urlencoded",
    "Access-Control-Allow-Origin": "*",
    // token: "your token",
  },
});
service.defaults.headers["Access-Control-Allow-Origin"] = "*";
service.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded";
// // 添加请求拦截器
// service.interceptors.request.use(
//   function (config) {
//     // 在发送请求之前做些什么
//     return config;
//   },
//   function (error) {
//     // 对请求错误做些什么
//     console.log(error);
//     return Promise.reject(error);
//   }
// );

// // 添加响应拦截器
// service.interceptors.response.use(
//   function (response) {
//     console.log(response);
//     // 2xx 范围内的状态码都会触发该函数。
//     // 对响应数据做点什么
//     // dataAxios 是 axios 返回数据中的 data
//     const dataAxios = response.data;
//     // 这个状态码是和后端约定的
//     const code = dataAxios.reset;
//     return dataAxios;
//   },
//   function (error) {
//     // 超出 2xx 范围的状态码都会触发该函数。
//     // 对响应错误做点什么
//     console.log(error);
//     return Promise.reject(error);
//   }
// );

//请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = window.sessionStorage.getItem("token");
    if (token) {
      // @ts-ignore
      config.headers.token = token;
    }
    return config;
  },
  (error: Error) => {
    return error;
  }
);
// 响应拦截
service.interceptors.response.use(
  (res: any) => {
    //发请求前做的一些处理，数据转化，配置请求头，设置token,设置loading等，根据需求去添加
    switch (res.data.code) {
      case 111:
        sessionStorage.setItem("token", "");
        return res;
      case 200:
        // return JSON.stringify(res.data);
        return res;
      default:
        return res;
    }
  },
  (error: AxiosError) => {
    // 接收到异常响应的处理开始
    if (error && error.response) {
      // 1.公共错误处理
      // 2.根据响应码具体处理
      switch (error.response.status) {
        case 400:
          error.message = "错误请求";
          break;
        case 401:
          error.message = "未授权，请重新登录";
          break;
        case 403:
          error.message = "拒绝访问";
          break;
        case 404:
          error.message = "请求错误,未找到该资源";
          // window.location.href = "/NotFound";
          break;
        case 405:
          error.message = "请求方法未允许";
          break;
        case 408:
          error.message = "请求超时";
          break;
        case 500:
          error.message = "服务器端出错";
          break;
        case 501:
          error.message = "网络未实现";
          break;
        case 502:
          error.message = "网络错误";
          break;
        case 503:
          error.message = "服务不可用";
          break;
        case 504:
          error.message = "网络超时";
          break;
        case 505:
          error.message = "http版本不支持该请求";
          break;
        default:
          error.message = `连接错误${error.response.status}`;
      }
    } else {
      // 超时处理
      if (JSON.stringify(error).includes("timeout")) {
        ElMessage.error("服务器响应超时，请刷新当前页");
      }
      ElMessage.error("连接服务器失败");
    }
    ElMessage.error(error.message);
    //处理结束
    //如果不需要错误处理，以上的处理过程都可省略
    return Promise.resolve(error.response);
  }
);

export default service;

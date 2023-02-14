import service from "@/request/index";
// 导入axios实例

// 获取用户信息 登陆
export function apiHomeMenu(param: "") {
  return service({
    url: "index",
    method: "post",
    data: param,
  });
}

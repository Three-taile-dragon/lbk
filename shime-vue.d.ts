import * as axios from "axios";

declare module "qs";
declare module "element-plus";
declare module "axios";

declare module "axios" {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>;
  }
}

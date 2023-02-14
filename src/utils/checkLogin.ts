import useUserStore from "@/stores/user/user";
import jwtDecode from "jwt-decode";
import { isTokenExpired } from "@/utils/utils";
import type { UserRefreshToken } from "@/model/user";
export const checkLogin = () => {
  const userStore = useUserStore();
  const tokenList = userStore.tokenList;
  if (tokenList) {
    const refreshToken: UserRefreshToken = {
      refreshToken: tokenList.refreshToken,
    };
    const accessTokenExp = tokenList.accessTokenExp;
    //判断accessToken即将到期后刷新token
    if (accessTokenExp && isTokenExpired(accessTokenExp)) {
      userStore.refreshToken(refreshToken);
    }
    return true;
  }
  return false;
};

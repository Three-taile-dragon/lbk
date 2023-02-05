// 定义接口的传参
export interface UserLoginInfo {
  account: string;
  password: string;
}

export interface UserRegisterInfo {
  email: string;
  name: string;
  password: string;
  password2: string;
  mobile: string;
  captcha: string;
}

export interface UserGetCaptchaInfo {
  mobile: string;
}

export interface ResultResponse {
  code: number;
  msg: string;
  data: string;
}

interface member {
  name: string;
  mobile: string;
  statue: number;
  code: number;
}

interface tokenList {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  accessTokenExp: Date;
}

export interface LoginResultResponse {
  code: number;
  msg: string;
  data: {
    member: member;
    tokenList: tokenList;
  };
}

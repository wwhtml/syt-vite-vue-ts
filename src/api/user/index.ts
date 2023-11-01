import request from "@/utils/request";

import type { LoginData } from "./types";

//获取验证码接口
export const getCode = (phone: string) => {
  return request.get("/sms/send/" + phone);
};

//用户登录接口
export const getUserLogin = (data: LoginData) => request.post("/user/login", data);

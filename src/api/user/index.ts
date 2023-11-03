import request from "@/utils/request";

import type { LoginData } from "./types";

//获取验证码接口
export const getCode = (phone: string) => {
  return request.get("/sms/send/" + phone);
};

//用户登录接口
export const getUserLogin = (data: LoginData) => request.post("/user/login", data);

//获取用户信息
export const getUserInfo = () => {
  return request.get("/user/auth/getUserInfo");
};

//获取证件类型信息
export const getCertationTypes = (CertificatesType = "CertificatesType") =>
  request.get("/cmn/dict/findByDictCode/" + CertificatesType);

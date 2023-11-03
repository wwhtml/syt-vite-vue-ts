//用户登录接口需要携带参数类型
export interface LoginData {
  phone: string;
  code: string;
}

//用户信息
export interface Param {}

export interface UserInfoData {
  id: number;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: Param;
  openid?: any;
  nickName?: any;
  phone: string;
  name: string;
  certificatesType?: any;
  certificatesNo?: any;
  certificatesUrl?: any;
  authStatus: number;
  status: number;
}

//证件类型
export interface CertificateData {
  id: number;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: Param;
  parentId: number;
  name: string;
  value: string;
  dictCode: string;
  hasChildren: boolean;
}

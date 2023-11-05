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
//提交的数据
export interface RuleForm {
  certificatesNo: string;
  certificatesType: string;
  certificatesUrl: string;
  name: string;
}

//新增与修改已有的就诊人参数的数据ts类型
export interface PatientFormInfo {
  id?: string;
  name: string;
  certificatesType: string;
  certificatesNo: string;
  sex: number;
  birthdate: string;
  phone: string;
  isMarry: number;
  isInsure: number;
  addressSelected: string[];
  address: string;
  contactsName: string;
  contactsCertificatesType: string;
  contactsCertificatesNo: string;
  contactsPhone: string;
}

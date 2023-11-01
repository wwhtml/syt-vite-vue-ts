//hospital/hoscode/register页面
export interface BookingRule {
  cycle: number;
  releaseTime: string;
  stopTime: string;
  quitDay: number;
  quitTime: string;
  rule: string[];
}

export interface Param {
  hostypeString: string;
  fullAddress: string;
}

export interface Hospital {
  id: string;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: Param;
  hoscode: string;
  hosname: string;
  hostype: string;
  provinceCode: string;
  cityCode: string;
  districtCode: string;
  address: string;
  logoData: string;
  intro: string;
  route: string;
  status: number;
  bookingRule?: any;
}

export interface HosDetail {
  bookingRule: BookingRule;
  hospital: Hospital;
}

//department
export interface DepChildren {
  depcode: string;
  depname: string;
  children?: any;
}

export interface Department {
  depcode: string;
  depname: string;
  children: DepChildren[];
}

//医生个人信息
export interface Param1 {
  dayOfWeek: string;
  depname: string;
  hosname: string;
}

export interface HosDoctorInfo {
  id: string;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: Param1;
  hoscode: string;
  depcode: string;
  title: string;
  docname: string;
  skill: string;
  workDate: string;
  workTime: number;
  reservedNumber: number;
  availableNumber: number;
  amount: number;
  status: number;
  hosScheduleId: string;
}

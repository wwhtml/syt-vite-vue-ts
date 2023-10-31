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

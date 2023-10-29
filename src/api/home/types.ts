//过滤按钮数据
export interface FilterItem {
  id: number;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: any;
  parentId: number;
  name: string;
  value: string;
  dictCode?: any;
  hasChildren: boolean;
}

//医院列表的类型
export interface Param {
  hostypeString: string;
  fullAddress: string;
}

export interface BookingRule {
  cycle: number;
  releaseTime: string;
  stopTime: string;
  quitDay: number;
  quitTime: string;
  rule: string[];
}

export interface HoslistItem {
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
  bookingRule: BookingRule;
}

export interface Pageable {
  sort: Sort;
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface HospitalList {
  content: HoslistItem[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  sort: Sort;
  numberOfElements: number;
  size: number;
  number: number;
  empty: boolean;
}

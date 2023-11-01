import request from "@/utils/request";

//获取医院详情接口
export const getHospitalDetail = (hoscode: string) => {
  return request.get("/hosp/hospital/" + hoscode);
};

//获取医院科室列表
export const getHospitalDeparment = (hoscode: string) => {
  return request.get("/hosp/hospital/department/" + hoscode);
};

//获取某一个医院的某一个科室预约挂号日期列表
export const getHospitalWork = (page: number, limit: number, hoscode: string, depcode: string) =>
  request.get(`/hosp/hospital/auth/getBookingScheduleRule/${page}/${limit}/${hoscode}/${depcode}`);

//获取医院某一个科室某一天相应医生排班的数据
export const getHospitalDoctor = (hoscode: string, depcode: string, workDate: string) =>
  request.get(`/hosp/hospital/auth/findScheduleList/${hoscode}/${depcode}/${workDate}`);

//获取可以挂号医生的信息
export const getDoctorInfo = (scheduleId: string) => {
  return request.get(`/hosp/hospital/getSchedule/${scheduleId}`);
};

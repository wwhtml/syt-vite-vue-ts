import axios from "axios";
import type { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

//使用下面的方法，一定要引入element-ui的样式文件，（单单是按需引入element-ui是不行的）
import { ElMessage } from "element-plus";

const instance: AxiosInstance = axios.create({
  baseURL: "/api",
  timeout: 3000 //超时设置
});
let pending = []; //声明一个数组用于存储每个ajax请求的取消函数和ajax标识

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

let removePending = (config) => {
  for (let p in pending) {
    if (pending[p].u === config.url + "&" + config.method) {
      //当前请求在数组中存在时执行函数体
      pending[p].f(); //执行取消操作
      pending.splice(p, 1); //把这条记录从数组中移除
    }
  }
};

// console.dir(axios);
// console.dir(instance);

/**
 * @description: 请求拦截器
 * @returns {*}
 */
instance.interceptors.request.use(
  (config) => {
    //如果还处于获取数据的状态，就取消请求 ;

    //某一个相同路径的请求取消
    // if (config.url == "/hosp/hospital/1/10") {
    //   //   source.cancel();
    // }
    config.cancelToken = source.token;
    console.log(`output->config`, config);
    // console.log(`output->config`, config.url);

    // console.log(`output->qs()`, qs(config.url));

    return config;
  },
  (error: AxiosError) => {
    // console.log(`output->error`, error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // console.log(`output->response`, response);
    const { data } = response;
    return data;
  },
  (error: AxiosError) => {
    const status = error.response?.status;
    // console.log(error);

    // console.log(status);
    let message = "";

    switch (status) {
      case 401:
        message = "token 失效，请重新登录";
        break;
      case 403:
        message = "拒绝访问";
        break;
      case 404:
        message = "请求地址错误";
        break;
      case 500:
        message = "服务器故障";
        break;
      default:
        message = `${error.message}`;
    }
    ElMessage.error(message);

    return Promise.reject(error);
  }
);

/**
 * @description: 导出封装的请求方法
 * @returns {*}
 */
const request = {
  get<T = any>(url: string, params?: object, config?: AxiosRequestConfig): Promise<T> {
    return instance.get(url, { params, ...config });
  },

  post<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return instance.post(url, data, config);
  },

  put<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return instance.put(url, data, config);
  },

  delete<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return instance.delete(url, { data, ...config });
  }
};

export default request;

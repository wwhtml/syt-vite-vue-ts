import axios from "axios";
import type {
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from "axios";
//element
import { ElMessage } from "element-plus";

//创建axios实例
const instance: AxiosInstance = axios.create({
  baseURL: "/api",
  timeout: 3000 //超时设置
});

const pending: never[] = []; //声明一个数组用于存储每个ajax请求的取消函数和ajax标识
const cancelToken = axios.CancelToken;
const removePending = (config: InternalAxiosRequestConfig<any>) => {
  for (const p in pending) {
    if (pending[p].u === config.url + "&" + config.method) {
      //当前请求在数组中存在时执行函数体

      pending[p].f(); //执行取消操作

      pending.splice(p, 1); //把这条记录从数组中移除
    }
  }
};

/**
 * @description: 请求拦截器
 * @returns {*}
 */
instance.interceptors.request.use(
  (config) => {
    removePending(config); //在一个ajax发送前执行一下取消操作
    config.cancelToken = new cancelToken((c) => {
      // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
      pending.push({ u: config.url + "&" + config.method, f: c });
    });
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    //在一个axios响应后再执行一下取消操作，把已经完成的请求从pending中移除
    removePending(response.config);
    const { data } = response;
    return data;
  },
  (error: AxiosError) => {
    const status = error.response?.status;

    let message = "";
    switch (status) {
      case 401:
        message = "token 失效，请重新登录";
        ElMessage.error(message);

        break;
      case 403:
        message = "拒绝访问";
        ElMessage.error(message);

        break;
      case 404:
        message = "请求地址错误";
        ElMessage.error(message);

        break;
      case 500:
        message = "服务器故障";
        ElMessage.error(message);

        break;
      // default:
      //   message = `${error.message}`;
      //   ElMessage.error(message);
    }

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

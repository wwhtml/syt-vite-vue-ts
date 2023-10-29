import axios from "axios";
import type { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const service: AxiosInstance = axios.create({
  baseURL: "/api",
  timeout: 5000
});

/**
 * @description: 请求拦截器
 * @returns {*}
 */
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response;
    return data;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * @description: 导出封装的请求方法
 * @returns {*}
 */
const request = {
  get<T = any>(url: string, params?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.get(url, { params, ...config });
  },

  post<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.post(url, data, config);
  },

  put<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.put(url, data, config);
  },

  delete<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.delete(url, { data, ...config });
  }
};

export default request;

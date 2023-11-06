import axios from "axios";
import type { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
//element
import { ElMessage } from "element-plus";
//store
import { useUserStore } from "@/stores/user";
//创建axios实例
const instance: AxiosInstance = axios.create({
  baseURL: "/api",
  timeout: 3000 //超时设置
});

/**
 * @description: 请求拦截器
 * @returns {*}
 */
instance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    if (userStore.userInfo.token) {
      // 每次请求都要携带token；token的值是放在headers中,还是放在什么位置，要和后端保持同步
      config.headers.token = userStore.userInfo.token;
    }
    // console.log(`output->config`, config);
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
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
      default:
        message = `服务器挂了`;
        ElMessage.error(message);
    }
    //当前项目其他错误类型就不要处理了，交给组件

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

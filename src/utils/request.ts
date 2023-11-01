import axios from "axios";
import type { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
//使用下面的方法，一定要引入element-ui的样式文件，（单单是按需引入element-ui是不行的）
import { ElMessage } from "element-plus";

//store
import { useUserStore } from "@/stores/user";

const instance: AxiosInstance = axios.create({
  baseURL: "/api"
  // timeout: 5000
});

/**
 * @description: 请求拦截器
 * @returns {*}
 */
instance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    if (userStore.userInfo.token) {
      config.headers.token = userStore.userInfo.token;
    }
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
    console.log(error);

    console.log(status);

    switch (status) {
      case 401:
        ElMessage({
          message: "参数有误",
          type: "error"
        });
        break;

      case 404:
        //错误提示信息
        ElMessage({
          message: "请求失败路径出现问题",
          type: "error"
        });
        break;

      case 500 || 501 || 502 || 503 || 504 || 505:
        ElMessage({
          message: "服务器挂了",
          type: "error",
          duration: 0
        });
        break;

      default:
        ElMessage({
          message: `${error.message}`,
          type: "error",
          duration: 0
        });
        break;
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

import axios from "axios";
import type { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
//使用下面的方法，一定要引入element-ui的样式文件，（单单是按需引入element-ui是不行的）
import { ElMessage } from "element-plus";

//store
import { useUserStore } from "@/stores/user";

const instance: AxiosInstance = axios.create({
  baseURL: "/api",
  timeout: 5000 //超时设置
});

console.dir(`output->instance`, instance);
console.log(`output->instance`, instance.defaults);

/**
 * @description: 请求拦截器
 * @returns {*}
 */
instance.interceptors.request.use(
  (config) => {
    // const userStore = useUserStore();
    // if (userStore.userInfo.token) {
    //每次请求都要携带token；token的值是放在headers中,还是放在什么位置，要和后端保持同步
    //   config.headers.token = userStore.userInfo.token;
    // }
    // console.log(`output->config`, config);
    return config;
  },
  (error: AxiosError) => {
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

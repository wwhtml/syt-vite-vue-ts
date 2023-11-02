import axios from "axios";
import type { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

//使用下面的方法，一定要引入element-ui的样式文件，（单单是按需引入element-ui是不行的）
import { ElMessage } from "element-plus";

const instance: AxiosInstance = axios.create({
  baseURL: "/api"
  // timeout: 3000 //超时设置
});
//@ts-ignore

const pending: never[] = []; //声明一个数组用于存储每个ajax请求的取消函数和ajax标识

const cancelToken = axios.CancelToken;
//@ts-ignore
const removePending = (config) => {
  for (const p in pending) {
    //@ts-ignore

    if (pending[p].u === config.url + "&" + config.method) {
      //当前请求在数组中存在时执行函数体
      //@ts-ignore

      pending[p].f(); //执行取消操作
      //@ts-ignore

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
    removePending(config); //在一个ajax发送前执行一下取消操作
    config.cancelToken = new cancelToken((c) => {
      // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
      //@ts-ignore

      pending.push({ u: config.url + "&" + config.method, f: c });
    });
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
    removePending(response.config); //在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除

    const { data } = response;
    return data;
  },
  (error: AxiosError) => {
    const status = error.response?.status;
    // console.log(error);

    // console.log(status);

    if (error.name == "CanceledError") {
      // console.log(`output->error.name`, error.name);
      // console.log(`output->error`, error);
      return Promise.reject(error);
    }

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
        message = `${error.message}`;
        ElMessage.error(message);
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

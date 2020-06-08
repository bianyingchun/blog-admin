import axios from "axios";
import { API_CONFIG } from "../constant";
type TAxiosMethod = "get" | "GET" | "POST" | "post";
interface IAxioParams {
  [prop: string]: any;
}
let requests: any = [];
let isRefresh = false;
const instance = axios.create({ timeout: 1000 * 10 });
instance.defaults.baseURL = API_CONFIG.BASE_URL;
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    token && (config.headers.Authorization = `Bearer ${token}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response): any => {
    const { code } = response.data;
    if (code === 402) {
      const config = response.config;
      if (!isRefresh) {
        isRefresh = true;
        return refreshToken()
          .then((res) => {
            const { token } = res.result;
            localStorage.setItem("token", token);
            // 已经刷新了token，将所有队列中的请求进行重试
            requests.forEach((cb: any) => cb(token));
            requests = [];
            return instance(config);
          })
          .catch((res) => {
            window.location.href = "/login";
          })
          .finally(() => {
            isRefresh = false;
          });
      } else {
        // 正在刷新token，将返回一个未执行resolve的promise
        return new Promise((resolve) => {
          // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
          requests.push((token: string) => {
            config.baseURL = "";
            resolve(instance(config));
          });
        });
      }
    }
    return response.data;
  },
  (err) => {
    const code = err.response.status;
    if (code === 401 || code === 403) {
      //重新登录
      return (window.location.href = "/login");
    }
    Promise.reject(err);
  }
);

const request = async (
  url: string,
  method: TAxiosMethod,
  params?: IAxioParams
): Promise<any> => {
  let args = params || {};
  let requestData = {
    url,
    method,
    data: {},
    params: {},
  };
  if (method === "get" || method === "GET") {
    requestData.params = args;
  } else {
    requestData.data = args;
  }
  return instance(requestData);
};

const refreshToken = () => {
  const refreshtoken = localStorage.getItem("refreshtoken");
  return request("/user/refresh", "post", { refreshtoken });
};

export default request;

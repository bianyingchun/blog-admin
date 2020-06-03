import axios from "axios";
import store from "@/store";
const requestMap = {};

const getRequestIdentity = (config) => {
  let url = config.baseURL + "-" + config.method + "-" + config.url;
  return url;
};

const stopRepeatRequest = (config, cancel, errorMessage) => {
  let key = getRequestIdentity(config);
  if (requestMap[key]) {
    console.log("取消重复请求");
    cancel(errorMessage);
  } else {
    requestMap[key] = true;
  }
};

const allowRequest = (config) => {
  let key = getRequestIdentity(config);
  delete requestMap[key];
};

const errHandle = (err) => {
  switch (err.response.status) {
    case 400:
      err.message = "错误请求";
      break;
    case 401:
      err.message = "未授权，请重新登录";
      break;
    case 403:
      err.message = "拒绝访问";
      break;
    case 404:
      err.message = "请求错误,未找到该资源";
      break;
    case 405:
      err.message = "请求方法未允许";
      break;
    case 408:
      err.message = "请求超时";
      break;
    case 500:
      err.message = "服务器端出错";
      break;
    case 501:
      err.message = "网络未实现";
      break;
    case 502:
      err.message = "网络错误";
      break;
    case 503:
      err.message = "服务不可用";
      break;
    case 504:
      err.message = "网络超时";
      break;
    case 505:
      err.message = "http版本不支持该请求";
      break;
    default:
      err.message = "未知错误";
  }
  let errData = {
    code: err.response.status,
    message: err.message,
  };
  // 统一错误处理可以放这，例如页面提示错误...
  store.commit("setServiceError", errData);
};

const service = axios.create({ timeout: 1000 * 4 });
//可以根据环境切换地址
// if (process.env.NODE_ENV == "development") {
//     service.defaults.baseURL = "https://www.baidu.com";
// } else if (process.env.NODE_ENV == "debug") {
//     service.defaults.baseURL = "https://www.ceshi.com";
// } else if (process.env.NODE_ENV == "production") {
//     service.defaults.baseURL = "https://www.production.com";
// }
service.defaults.baseURL = "http://localhost:3000";

service.interceptors.request.use(
  (config) => {
    let cancel;
    config.cancelToken = new axios.CancelToken((c) => {
      cancel = c;
    });
    stopRepeatRequest(config, cancel, `${config.url} 请求被中断`);
    // const token = store.state.token;
    const token = localStorage.getItem("token");
    token && (config.headers.Authorization = token);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    allowRequest(response.config);
    return {
      code: response.status,
      message: response.statusText,
      data: response.data && response.data.result,
    };
  },
  (err) => {
    if (axios.isCancel(err)) {
      console.log("请求取消成功");
      return;
    }
    allowRequest(err.config);
    if (err && err.response) {
      errHandle(err);
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      if (!window.navigator.onLine) {
        // store.commit('setServiceError', errData)
        store.commit("changeNetwork", false);
      } else {
        store.commit("setServiceError", {});
      }
    }
  }
);

const request = (url, method, params) => {
  params = params || {};
  let requestData = {
    url,
    method,
  };
  if (method === "get") {
    requestData.params = params;
  } else {
    requestData.data = params;
  }
  return service(requestData);
};

export default request;

// https://blog.csdn.net/zhouping118/article/details/89355282
// https://blog.csdn.net/u011085172/article/details/85337972
// https://segmentfault.com/a/1190000014545422?utm_source=tag-newest

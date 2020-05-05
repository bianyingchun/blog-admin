import axios from "axios";
import { API_CONFIG } from "../constant";
type TAxiosMethod = "get" | "GET" | "POST" | "post";
interface IAxioParams {
  [prop: string]: any;
}
const service = axios.create({ timeout: 1000 * 10 });
service.defaults.baseURL = API_CONFIG.BASE_URL;

const request = async (
  url: string,
  method: TAxiosMethod,
  params?: IAxioParams
) => {
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
  try {
    const res = await service(requestData);
    return res.data;
  } catch (err) {
    // return err;
    console.log(err);
  }
};

export default request;

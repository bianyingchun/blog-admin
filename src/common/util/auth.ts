import { BASE_NAME } from "src/common/constant";
import { login as _login, getUserInfo } from "src/common/api";
import { APP_URL } from "../constant";

export async function login(params: any) {
  const res = await _login(params);
  if (res) {
    localStorage.setItem("token", res.result.token);
    localStorage.setItem("refreshtoken", res.result.refreshtoken);
    window.location.href = APP_URL;
  }
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshtoken");
  window.location.href = "/" + BASE_NAME + "/login";
}

export async function checkLogin() {
  const res = await getUserInfo();
  return !!res;
}

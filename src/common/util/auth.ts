import { login as _login, getUserInfo } from "src/common/api";

export async function login(params: any) {
  const res = await _login(params);
  if (res) {
    localStorage.setItem("token", res.result.token);
    localStorage.setItem("refreshtoken", res.result.refreshtoken);
    window.location.href = "/";
  }
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshtoken");
  window.location.href = "/login";
}

export async function checkLogin() {
  console.log("check - login");
  const res = await getUserInfo();
  return !!res;
}

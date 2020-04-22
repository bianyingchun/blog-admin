import React from "react";
import moment from "moment";
import "moment/locale/zh-cn";
import zhCN from "antd/es/locale/zh_CN";
import { ConfigProvider } from "antd";
import RouterView from "src/router";
import "./App.scss";
moment.locale("zh-cn");

// 防止路由切换，滚动条处于上个页面保持的位置，
function routerBeforeEnterHook(path: string) {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <div className="App">
        <RouterView beforeEnter={routerBeforeEnterHook} />
      </div>
    </ConfigProvider>
  );
}

export default App;

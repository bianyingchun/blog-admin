import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Layout, Menu, Modal } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import "./style.scss";
import { IWithSubRoutesProps, MenuType } from "src/types";
import { RouteWithSubRoutes } from "src/router";
import menuConfig from "src/common/menu-config";
import { logout, checkLogin } from "src/common/util/auth";
const rootSubmenuKeys: string[] = [];
menuConfig.forEach((item) => {
  if (item.children) {
    rootSubmenuKeys.push(item.key);
  }
});

const { Sider, Content } = Layout;
const Page: React.FC<IWithSubRoutesProps> = ({ routes }) => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>();
  const [collapsed, setCollapsed] = React.useState<boolean>(false);
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    checkLogin();
  }, []);
  useEffect(() => {
    let key = location.pathname.substring(1) || "home";
    setOpenKeys([key.split("-")[0]]);
    setSelectedKeys([key]);
  }, [location, location.pathname]);
  const [openKeys, setOpenKeys] = React.useState<string[]>([]);
  const onOpenChange = (keys: string[]) => {
    const latestOpenKey: any = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  const onClickMenuItem = (item: MenuType) => {
    const { path } = item;
    path && history.push(path);
  };
  const confirmLogout = () => {
    Modal.confirm({
      content: "确认退出登录？",
      onOk() {
        logout();
      },
    });
  };
  return (
    <Layout className="layout">
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
      >
        <Menu
          theme="light"
          openKeys={openKeys}
          mode="inline"
          onOpenChange={onOpenChange}
          selectedKeys={selectedKeys}
          defaultOpenKeys={["home"]}
        >
          <Menu.Item key="logout" onClick={confirmLogout}>
            <LogoutOutlined />
            <span>退出登录</span>
          </Menu.Item>
          {menuConfig.map((item) => {
            if (!item.children) {
              return (
                <Menu.Item key={item.key} onClick={() => onClickMenuItem(item)}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Menu.Item>
              );
            } else {
              return (
                <Menu.SubMenu
                  key={item.key}
                  title={
                    <span>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </span>
                  }
                >
                  {item.children.map((child) => (
                    <Menu.Item
                      key={child.key}
                      onClick={() => {
                        onClickMenuItem(child);
                      }}
                    >
                      {child.title}
                    </Menu.Item>
                  ))}
                </Menu.SubMenu>
              );
            }
          })}
        </Menu>
      </Sider>
      <Content className="main">
        {routes
          ? routes.map((route, index) => (
              <RouteWithSubRoutes key={index} {...route} />
            ))
          : null}
      </Content>
    </Layout>
  );
};

export default Page;

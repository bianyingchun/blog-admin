import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Menu } from "antd";
import { IMenuProps } from "src/types";
import menuConfig from "src/common/menu-config";
import Item from "antd/lib/list/Item";
const AdminMenu: React.FC<IMenuProps> = ({ collapsed }) => {
  let [openKey, setOpenKey] = useState<string[]>([""]);
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    const key = location.pathname.substring(1).split("-")[0];
    setOpenKey([key]);
  }, [location.pathname]);
  const handleOpen = (path: string) => {
    const openKey2 = [...openKey];
    const index = openKey2.indexOf(path);
    if (index === -1) {
      openKey2.push(path);
      setOpenKey(openKey2);
    } else {
      openKey2.splice(index, 1);
      setOpenKey(openKey2);
    }
  };
  const handleClick = (path?: string) => {
    path && history.push(path);
  };
  return (
    <Menu
      theme="dark"
      openKeys={openKey}
      mode="inline"
      inlineCollapsed={collapsed}
    >
      {menuConfig.map((item) => {
        if (!item.children) {
          return (
            <Menu.Item key={item.key}>
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
              onTitleClick={() => handleOpen(item.key)}
            >
              {item.children.map((child) => (
                <Menu.Item
                  key={child.key}
                  onClick={() => {
                    handleClick(child.path);
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
  );
};

export default AdminMenu;

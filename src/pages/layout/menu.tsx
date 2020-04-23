import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu } from "antd";
import { IMenuProps } from "src/types";
import menuConfig from "src/common/menu-config";

const AdminMenu: React.FC<IMenuProps> = ({ collapsed }) => {
  let [openKey, setOpenKey] = useState<string[]>([""]);
  const location = useLocation();
  useEffect(() => {}, []);
  const open = (path: string) => {
    setOpenKey([path]);
  };
  return (
    <Menu
      theme="dark"
      openKeys={openKey}
      mode="inline"
      inlineCollapsed={collapsed}
    >
      {menuConfig.map((item) => {
        return (
          <Menu.Item key={item.key}>
            <span>{item.title}</span>
          </Menu.Item>
        );
      })}
    </Menu>
  );
};

export default AdminMenu;

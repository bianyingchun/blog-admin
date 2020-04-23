import React from "react";
import Menu from "./menu";
import { AlignLeftOutlined, AlignRightOutlined } from "@ant-design/icons";

const Side: React.FC<{}> = () => {
  let [collapsed, setCollapsed] = React.useState<boolean>(false);
  const handleCollapse = () => setCollapsed(!collapsed);
  return (
    <div className="side">
          <Menu collapsed={collapsed} />
          <div className="closeMenu" onClick={handleCollapse}  style={{width: collapsed ? '80px' : '180px'}}>
              {collapsed ? <AlignLeftOutlined/>:<AlignRightOutlined/>}
          </div>
    </div>
  );
};

export default Side;

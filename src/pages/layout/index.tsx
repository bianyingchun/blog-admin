import React from "react";
import "./style.scss";
import Side from "./side";
import Main from "./main";
import { IWithSubRoutesProps } from "src/types";
const Layout: React.FC<IWithSubRoutesProps> = ({ routes }) => {
  return (
    <div className="layout">
      <Side />
      <Main routes={routes} />
    </div>
  );
};

export default Layout;

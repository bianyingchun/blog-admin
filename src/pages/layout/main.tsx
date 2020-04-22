import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { IMainProps } from "src/types";
import { RouteWithSubRoutes } from "src/router";
const Main: React.FC<IMainProps> = (props) => {
  return (
    <div className="main">
      {props.routes
        ? props.routes.map((route, index) => (
            <RouteWithSubRoutes key={index} {...route} />
          ))
        : null}
    </div>
  );
};

export default withRouter(Main);

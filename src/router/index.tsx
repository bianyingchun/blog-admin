import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import routerMap from "./config";
import { IRouterViewProps } from "src/types";
export default function (props: IRouterViewProps) {
  return (
    <BrowserRouter>
      <Switch>
        {routerMap.map((item, i) => (
          <Route
            key={i}
            path={item.path}
            component={item.component}
            {...props}
            exact={item.exact}
          />
        ))}
      </Switch>
    </BrowserRouter>
  );
}

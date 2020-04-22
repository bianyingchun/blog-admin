import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { IRouterViewProps, IRouteItem } from "src/types";
import loadable from "src/common/util/loadable";
const Layout = loadable(() => import("src/pages/layout"));
const Login = loadable(() => import("src/pages/login"));
const Logout = loadable(() => import("src/pages/logout"));
const ArticleAdd = loadable(() => import("src/pages/article-add"));
const ArticleList = loadable(() => import("src/pages/article-list"));
const ArticleClassify = loadable(() => import("src/pages/article-classify"));
const ArticleComments = loadable(() => import("src/pages/article-comments"));
const ArticleDraft = loadable(() => import("src/pages/article-draft"));
const Home = loadable(() => import("src/pages/home"));

export const routes: Array<IRouteItem> = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/logout",
    component: Logout,
  },
  {
    path: "/",
    component: Layout,
    routes: [
      {
        path: "/article",
        component: ArticleList,
      },
      {
        path: "/article-add",
        component: ArticleAdd,
      },
      {
        path: "/article-classify",
        component: ArticleClassify,
      },
      {
        path: "/article-draft",
        component: ArticleDraft,
      },
      {
        path: "/article-comments",
        component: ArticleComments,
      },
      {
        path: "/",
        component: Home,
        exact: true,
      },
    ],
  },
];

export function RouteWithSubRoutes(route: IRouteItem) {
  return (
    <Route
      path={route.path}
      render={(props) => <route.component {...props} {...route} />}
    />
  );
}

export default function (props: IRouterViewProps) {
  return (
    <BrowserRouter>
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} {...props} />
        ))}
      </Switch>
    </BrowserRouter>
  );
}

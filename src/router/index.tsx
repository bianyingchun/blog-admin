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
const ArticleReplies = loadable(() => import("src/pages/article-replies"));
const ArticleDraft = loadable(() => import("src/pages/article-draft"));
const Tags = loadable(() => import("src/pages/tags"));
const TagAdd = loadable(() => import("src/pages/tag-add"));
const Home = loadable(() => import("src/pages/home"));
const ProjectList = loadable(() => import("src/pages/project-list"));
const ProjectAdd = loadable(() => import("src/pages/project-add"));
const MusicList = loadable(() => import("src/pages/music-list"));
const MusicAdd = loadable(() => import("src/pages/music-add"));
// 测试页面
const Test = loadable(() => import("src/pages/test"));
export const routes: Array<IRouteItem> = [
  {
    path: "/test",
    component: Test,
  },
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
        path: "/article-edit/:id",
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
        path: "/discuss-comment",
        component: ArticleComments,
      },
      {
        path: "/discuss-reply",
        component: ArticleReplies,
      },
      {
        path: "/tags",
        component: Tags,
      },
      {
        path: "/tag-add",
        component: TagAdd,
      },
      {
        path: "/projects",
        component: ProjectList,
      },
      {
        path: "/project-add",
        component: ProjectAdd,
      },
      {
        path: "/project-edit/:id",
        component: ProjectAdd,
      },
      {
        path: "/musics",
        component: MusicList,
      },
      {
        path: "/music-add",
        component: MusicAdd,
      },
      {
        path: "/music-edit/:id",
        component: MusicAdd,
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
      exact={route.exact}
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

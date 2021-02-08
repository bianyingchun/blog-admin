import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { IRouterViewProps, IRouteItem } from "src/types";
import loadable from "src/common/util/loadable";
const Layout = loadable(() => import("src/pages/layout"));
const Login = loadable(() => import("src/pages/login"));
const ArticleAdd = loadable(() => import("src/pages/article-add"));
const ArticleList = loadable(() => import("src/pages/article-list"));
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
const MessageList = loadable(() => import("src/pages/message-list"));
const MessageAdd = loadable(() => import("src/pages/message-add"));

export const routes: Array<IRouteItem> = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/",
    component: Layout,
    routes: [
      {
        path: "/article-list",
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
        path: "/tag-list",
        component: Tags,
      },
      {
        path: "/tag-add",
        component: TagAdd,
      },
      {
        path: "/project-list",
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
        path: "/music-list",
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
        path: "/message-list",
        component: MessageList,
      },
      {
        path: "/message-add",
        component: MessageAdd,
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

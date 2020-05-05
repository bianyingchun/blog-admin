import { RouteComponentProps } from "react-router-dom";
import React from "react";
export interface IRouterViewProps {
  location?: any;
  // 进入路由之前的钩子
  beforeEnter?: (path: string) => void;
}

export interface IRouteItem {
  path: string;
  component: any;
  exact?: boolean;
  routes?: IRouteItem[];
}

export interface IWithSubRoutesProps extends IRouteItem, RouteComponentProps {}

export interface IMainProps {
  routes?: Array<IRouteItem>;
}

export interface IMenuProps {
  collapsed: boolean;
}

export interface menuType {
  title: string;
  key: string;
  icon?: any;
  path?: string;
  children?: menuType[];
}

export interface IEditProps {
  content: string;
  handleEditChange: (content: string, editContent: string) => void;
}

interface FieldData {
  name: string[];
  value: any;
  touched: boolean;
  validating: boolean;
  errors: string[];
}

export interface IBaseInfoProps {
  onChange: (fields: FieldData[]) => void;
  fields: FieldData[];
}

export interface ITagItem {
  name: string;
  desc: string;
  _id: string;
  [otherProps: string]: any;
}
export interface IArticleMeta {
  views: number;
  likes: number;
  comments: number;
}
export interface IArticleItem {
  _id: string;
  name: string;
  desc: string;
  title: string;
  tags: ITagItem[];
  keywords: string;
  state: 1 | 2;
  publish: 1 | 2;
  type: 1 | 2 | 3;
  editContent: string;
  Content: string;
  create_at: Date;
  update_at: Date;
  thumb?: String;
  meta: IArticleMeta;
}
export interface IEditableCellProps {
  editing: boolean;
  dataIndex: string;
  title: string;
  record: ITagItem;
  index: number;
  children: React.ReactNode;
}
export interface IHandler {
  (_id: string): void;
}

export interface IArticleTableProps {
  title: string;
  data: IArticleItem[];
  Operate: React.FC;
}

export interface IVisitor {
  gravatar: String;
  name: String;
  email: String;
  site: String;
}

export interface ICommentProps {
  _id: String;
  post_id: String;
  pid: Number;
  content: String;
  likes: Number;
  ip: String;
  city: String;
  range: String;
  country: String;
  agent: String;
  author: IVisitor;
  state: Number;
  reply: Number;
  create_at: Date;
  update_at: Date;
}

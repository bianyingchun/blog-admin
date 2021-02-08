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

export interface MenuType {
  title: string;
  key: string;
  icon?: any;
  path?: string;
  children?: MenuType[];
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
  thumb?: string;
  meta: IArticleMeta;
}
export interface IEditableCellProps {
  editing: boolean;
  dataIndex: string;
  title: string;
  record: ITagItem;
  index: number;
  editRender?: (_: any) => any;
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
  gravatar: string;
  name: string;
  email: string;
  site?: string;
}
export interface IMessageItem {
  _id: string;
  content: string;
  from: IVisitor;
  state: number;
  create_at: Date;
  update_at: Date;
  ip?: string;
  city?: string;
  range?: string;
  country?: string;
  agent?: string;
}
export interface ICommentItem extends IMessageItem {
  post_id: string;
  pid?: number;
  post_title?: string;
  likes: number;
  reply: number;
}
export interface ICommentItemProps extends ICommentItem {
  remove: (id: string) => void;
  like: (id: string) => void;
}

export interface IReplyItem {
  _id: string;
  post_id: string;
  cid: string;
  from: IVisitor;
  to?: IVisitor;
  content: string;
  likes: number;
  state: number;
  reply: number;
  create_at: Date;
  update_at: Date;
  ip?: string;
  city?: string;
  range?: string;
  country?: string;
  agent?: string;
}
export interface IReplyAddParams {
  post_id: string;
  cid: string;
  content: string;
  from: IVisitor;
  to?: IVisitor;
}
export interface IReplyItemProps extends IReplyItem {
  // remove: (id: string) => void;
  // like: (id: string) => void;
  addReply: (reply: IReplyAddParams) => void;
}

export interface IColumn {
  title: string;
  key: string;
  dataIndex?: string;
  editable?: boolean;
  render?: (_: any, record: any, index: number) => JSX.Element;
  editRender?: (_: any) => JSX.Element;
}
export interface IPageInfo {
  current_page: number;
  page_size: number;
}
export interface IEditableTableProps {
  columns: Array<IColumn>;
  fetchData: (pageInfo: IPageInfo) => Promise<any>;
  editData: (id: string, info: any) => Promise<any>;
  deleteData: (id: string) => Promise<any>;
}
export interface IInputUploadValue {
  text?: string;
  fileList?: File[];
}

export interface IInputUploadProps {
  value?: IInputUploadValue;
  onChange?: (value: IInputUploadValue) => void;
  accept: string;
}

export interface IETableProps {
  columns: Array<IColumn>;
  fetchData: (pageInfo: IPageInfo) => Promise<any>;
  editData: (id: string) => void;
  viewData: (id: string) => void;
  deleteData: (id: string) => Promise<any>;
}

export interface IProjectItem {
  _id: string;
  title: string;
  desc: string;
  tags: ITagItem[];
  github: string;
  create_at: Date;
  update_at: Date;
}

export interface IMusicItem {
  _id: string;
  title: string;
  singer: string;
  poster: string;
  lyrics: string;
  state: number;
  url: string;
  create_at: Date;
  update_at: string;
}

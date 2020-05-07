import { IVisitor } from "./index";
export interface IArticlePageParams {
  current_page?: number;
  page_size?: number;
  keyword?: string;
  state?: 1 | 2;
  publish?: 1 | 2;
  type?: 1 | 2 | 3;
  hot?: boolean;
  date?: Date;
}

export interface IArticleEditParmas {
  title: string;
  tags: string[];
  content: string;
  editContent: string;
  keywords: string;
  desc: string;
}

export interface ITagEditParams {
  id: string;
  name?: string;
  desc?: string;
}

export interface ITagPageParams {
  current_page?: number;
  page_size?: number;
  keyword?: string;
}

export interface ICommentAddParmas {
  post_id: string;
  author: IVisitor;
  content: string;
}

export interface IReplyAddParams {
  post_id: string;
  cid: string;
  content: string;
  from: IVisitor;
  to?: IVisitor;
}
export interface ICommentPageParams {
  post_id?: string;
  current_page?: number;
  page_size?: number;
  keyword?: string;
  state?: 0 | 1 | 2;
  sort?: -1 | 1 | 2;
}
export interface IReplyPageParmas {
  cid: string;
  current_page?: number;
  page_size?: number;
  keyword?: string;
  state?: 0 | 1 | 2;
  sort?: -1 | 1 | 2;
}
// TODO 修改属性
export interface ICommentEditParams {
  [prop: string]: any;
}

export interface IReplyEditParams {
  [prop: string]: any;
}

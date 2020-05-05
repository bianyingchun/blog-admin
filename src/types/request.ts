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

export interface ICommentEditParmas {
  post_id: String;
  pid?: Number;
  content: String;
  likes?: Number;
  ip?: String;
  city?: String;
  range?: String;
  country?: String;
  agent?: String;
  author: IVisitor;
  state?: Number;
  reply?: Number;
}

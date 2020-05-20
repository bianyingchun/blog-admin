import { IVisitor, IInputUploadValue } from "./index";
export interface IPage {
  current_page?: number;
  page_size?: number;
}
export interface IArticlePageParams extends IPage {
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

export interface ITagPageParams extends IPage {
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
export interface ICommentPageParams extends IPage {
  post_id?: string;
  keyword?: string;
  state?: 0 | 1 | 2;
  sort?: -1 | 1 | 2;
}
export interface IReplyPageParmas extends IPage {
  cid?: string;
  keyword?: string;
  state?: 0 | 1 | 2;
  sort?: -1 | 1 | 2;
}

export interface ICommentEditParams {
  content: string;
  state: number;
}

export interface IReplyEditParams extends ICommentEditParams {}

export interface IMusicAddParams {
  title: string;
  url: IInputUploadValue;
  singer: string;
  lyrics: string;
  poster: IInputUploadValue;
}

export type IMuiscEditParams = Partial<IMusicAddParams>;

export interface IMuiscParams extends IPage {
  state?: number;
  id?: string;
}

export interface IProjectParams {
  title: string;
  desc: string;
  tags: string[];
  github: string;
}

export interface IProjectPageParams extends IPage {}

export interface IMusicPageParams extends IPage {
  state?: 0 | 1 | 2;
}

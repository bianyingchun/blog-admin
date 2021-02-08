import { IVisitor, IInputUploadValue } from "./index";
export interface IPage {
  current_page?: number;
  page_size?: number;
}

export interface IArticlePageParams extends IPage {
  keyword?: string;
  state?: number;
  publish?: number;
  type?: number;
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
  origin: number;
  state?: number;
  thumb?: IInputUploadValue;
}

export interface ITagEditParams {
  id: string;
  name?: string;
  desc?: string;
}

export interface ITagPageParams extends IPage {
  keyword?: string;
}
export interface IMessageAddParams {
  content: string;
}
export interface IMessageEditParams {
  content: string;
  state: number;
}
export interface IMessagePageParams extends IPage {
  keyword?: string;
  state?: number;
}

export interface ICommentAddParams {
  post_id: string;
  author: IVisitor;
  content: string;
}

export interface ICommentPageParams extends IMessagePageParams {
  post_id?: string;
  sort?: number;
}
export interface ICommentEditParams extends IMessageEditParams {}

export interface IReplyAddParams {
  post_id: string;
  cid: string;
  content: string;
  from: IVisitor;
  to?: IVisitor;
}
export interface IReplyPageParmas extends IPage {
  cid?: string;
  keyword?: string;
  state?: number;
  sort?: number;
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
  url?: string;
  preview?: IInputUploadValue;
}

export interface IProjectPageParams extends IPage {}

export interface IMusicPageParams extends IPage {
  state?: number;
}

export interface ILoginParams {
  password: string;
  username: String;
}

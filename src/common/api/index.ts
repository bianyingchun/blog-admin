import request from "./request";
import {
  IArticleEditParmas,
  IArticlePageParams,
  ITagEditParams,
  ITagPageParams,
  ICommentEditParmas,
} from "src/types/request";
// 分页文章列表
export const getArtilesByPage = (params: IArticlePageParams) =>
  request("/article/getAll", "get", params);

//通过id获取文章信息
export const getArticleById = (id: string) =>
  request("/article/get", "get", { id });

// 文章分组列表
export const getArticlesByGroup = () => request("/article/group", "get");

// 新增文章
export const addArticle = (params: IArticleEditParmas) =>
  request("/article/add", "post", params);

// 喜欢文章

export const likeArticle = (id: string) =>
  request("/article/like", "post", { id });

// 删除文章
export const deleteArticle = (id: string) =>
  request("/article/delete", "post", { id });

export const editArticle = (id: string, info: IArticleEditParmas) =>
  request("/article/edit", "post", { id, info });

// 添加标签
export const addTag = (name: string, desc: string = "") =>
  request("/tag/add", "post", { name, desc });

// 删除标签
export const deleteTag = (id: string) => request("/tag/delete", "post", { id });

//编辑标签

export const editTag = (param: ITagEditParams) =>
  request("/tag/edit", "post", param);

// 获取标签
export const getTags = (params: ITagPageParams) =>
  request("/tag/getAll", "get", params);

// 测试
// 添加评论
export const addComment = (params: ICommentEditParmas) =>
  request("/comment/add", "post", params);

// 评论添加回复

// 用户回复评论回复

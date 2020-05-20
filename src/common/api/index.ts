import request from "./request";
import {
  IArticleEditParmas,
  IArticlePageParams,
  ITagEditParams,
  ITagPageParams,
  ICommentAddParmas,
  IReplyAddParams,
  ICommentEditParams,
  IReplyEditParams,
  ICommentPageParams,
  IReplyPageParmas,
  IMusicAddParams,
  IProjectParams,
  IProjectPageParams,
  IMusicPageParams,
} from "src/types/request";

// 分页文章列表
export const getArtilesByPage = (params: IArticlePageParams) =>
  request("/article/getAll", "get", params);
//通过id获取文章信息
export const getArticleById = (id: string) =>
  request("/article/get", "get", { id });
//文章分组列表
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
// 编辑文章
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

// 添加评论
export const addComment = (params: ICommentAddParmas) =>
  request("/comment/add", "post", params);
// 删除评论
export const deleteComment = (id: string) =>
  request("/comment/delete", "post", { id });
// 编辑评论
export const editComment = (id: string, info: ICommentEditParams) =>
  request("/comment/edit", "post", { id, info });
//喜欢评论
export const likeComment = (id: string) =>
  request("/comment/like", "post", { id });
//分页获取评论列表,参数有post_id :单篇文章评论list, 无post_id:全量评论列表
export const getComments = (params: ICommentPageParams) =>
  request("/comment/get", "get", params);

// 评论添加回复
export const addReply = (params: IReplyAddParams) =>
  request("/reply/add", "post", params);

// 删除回复
export const deleteReply = (id: string) =>
  request("/reply/delete", "post", { id });
// 编辑回复
export const editReply = (id: string, info: IReplyEditParams) =>
  request("/reply/edit", "post", { id, info });
//喜欢回复
export const likeReply = (id: string) => request("/reply/like", "post", { id });
//分页获取评论cid回复列表
export const getReplys = (params: IReplyPageParmas) =>
  request("/reply/get", "get", params);

// 上传音乐封面
export const uploadMusicPoster = (file: File) => {
  const formData = new FormData();
  formData.set("file", file);
  formData.set("name", file.name);
  return request("/music/upload", "post", formData);
};

const dealMusicParams = async (params: IMusicAddParams) => {
  const { title, url, singer, lyrics, poster } = params;
  let info = { title, url, singer, lyrics } as any;
  if (url.text) {
    info.url = url.text;
  } else if (url.fileList) {
    let res = await uploadMusicPoster(url.fileList[0]);
    if (res) {
      info.url = res.result;
    } else {
      return;
    }
  }
  if (poster.text) {
    info.poster = poster.text;
  } else if (poster.fileList) {
    let res = await uploadMusicPoster(poster.fileList[0]);
    if (res) {
      info.poster = res.result;
    } else {
      return;
    }
  }
  return info;
};
export const addMusic = async (params: IMusicAddParams) => {
  let addParams = await dealMusicParams(params);
  if (!addParams) return;
  return await request("/music/add", "post", addParams);
};
export const editMusic = async (id: string, params: IMusicAddParams) => {
  let info = await dealMusicParams(params);
  if (!info) return;
  return await request("/music/edit", "post", { id, info });
};

export const deleteMusic = (id: string) =>
  request("/muisc/delete", "post", { id });

export const getMusicById = (id: string) => request("music/get", "get", { id });

export const getMusicList = (params: IMusicPageParams) =>
  request("/music/getAll", "get", params);

// ================项目=========

export const addProject = (params: IProjectParams) =>
  request("project/add", "post", params);
// 删除
export const deleteProject = (id: string) =>
  request("/project/delete", "post", { id });
// 编辑
export const editProject = (id: string, info: IProjectParams) =>
  request("/project/edit", "post", { id, info });
//
export const getProjectById = (id: string) =>
  request("/project/get", "get", { id });

export const getProjectList = (params: IProjectPageParams) =>
  request("/project/getAll", "get", params);

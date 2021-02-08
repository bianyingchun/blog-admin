import { MenuType } from "src/types";
import {
  HomeOutlined,
  EditOutlined,
  MessageOutlined,
  TagsOutlined,
  CodeOutlined,
  PlayCircleOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
const menuConfig: MenuType[] = [
  {
    title: "HOME",
    key: "home",
    icon: HomeOutlined,
    path: "/",
  },
  {
    title: "文章管理",
    key: "article",
    icon: EditOutlined,
    children: [
      {
        title: "文章列表",
        key: "article-list",
        path: "/article-list",
      },
      {
        title: "添加文章",
        key: "article-add",
        path: "/article-add",
      },
      {
        title: "草稿箱",
        key: "article-draft",
        path: "/article-draft",
      },
    ],
  },
  {
    title: "标签管理",
    key: "tags",
    icon: TagsOutlined,
    children: [
      {
        title: "全部标签",
        key: "tag-list",
        path: "/tag-list",
      },
      {
        title: "新增标签",
        key: "tag-add",
        path: "/tag-add",
      },
    ],
  },
  {
    title: "留言墙管理",
    key: "message",
    icon: MessageOutlined,
    children: [
      {
        title: "全部留言",
        key: "message-list",
        path: "/message-list",
      },
      {
        title: "新增留言",
        key: "message-add",
        path: "/message-add",
      },
    ],
  },
  {
    title: "评论管理",
    key: "discuss",
    icon: CodeOutlined,
    children: [
      {
        title: "文章评论",
        key: "discuss-comment",
        path: "/discuss-comment",
      },
      {
        title: "评论回复",
        key: "discuss-reply",
        path: "/discuss-reply",
      },
    ],
  },
  {
    title: "项目管理",
    key: "project",
    icon: ProjectOutlined,
    children: [
      {
        title: "全部项目",
        key: "project-list",
        path: "/project-list",
      },
      {
        title: "新增项目",
        key: "project-add",
        path: "/project-add",
      },
    ],
  },
  {
    title: "音乐管理",
    key: "music",
    icon: PlayCircleOutlined,
    children: [
      {
        title: "音乐列表",
        key: "music-list",
        path: "/music-list",
      },
      {
        title: "新增音乐",
        key: "music-add",
        path: "/music-add",
      },
    ],
  },
];

export default menuConfig;

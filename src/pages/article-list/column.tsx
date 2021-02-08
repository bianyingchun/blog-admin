import { IArticleItem, ITagItem, IArticleMeta } from "src/types";
import { Tag, Divider } from "antd";
import React from "react";
import moment from "moment";
import { ARTICLE_TYPES } from "src/common/constant";
export default [
  {
    title: "#",
    key: "tIndex",
    render: (_: any, record: IArticleItem, index: number) => (
      <span>{index + 1}</span>
    ),
  },
  {
    title: "标题",
    key: "title",
    dataIndex: "title",
  },
  {
    title: "类型",
    key: "type",
    dataIndex: "type",
    render: (_: any, record: IArticleItem) => {
      return <span>{ARTICLE_TYPES[record.type || 0].text}</span>;
    },
  },
  {
    title: "标签",
    key: "tags",
    render: (_: any, record: IArticleItem) => {
      return (
        <span>
          {record.tags.map((item: ITagItem, index: number) => {
            return <Tag key={index}>{item.name}</Tag>;
          })}
        </span>
      );
    },
  },
  {
    title: "更新日期",
    dataIndex: "update_at",
    key: "update_at",
    render: (t: Date) => <span>{moment(t).format("YYYY-MM-DD HH:mm")}</span>,
  },
  {
    title: "元信息",
    dataIndex: "meta",
    key: "meta",
    render: (meta: IArticleMeta) => (
      <div>
        <span>评论：{meta.comments}</span>
        <Divider type="vertical" />
        <span>浏览：{meta.views}</span>
        <Divider type="vertical" />
        <span>喜欢：{meta.likes}</span>
      </div>
    ),
  },
];

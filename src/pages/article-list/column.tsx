import { IArticleItem, ITagItem, IArticleMeta } from "src/types";
import { Tag } from "antd";
import React from "react";
import moment from "moment";
const colorArr = [
  "magenta",
  "geekblue",
  "red",
  "volcano",
  "orange",
  "gold",
  "lime",
  "green",
  "cyan",
  "purple",
];

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
    title: "标签",
    key: "tags",
    render: (_: any, record: IArticleItem) => {
      return (
        <span>
          {record.tags.map((item: ITagItem, index: number) => {
            return (
              <Tag key={index} color={colorArr[index % 10]}>
                {item.name}
              </Tag>
            );
          })}
        </span>
      );
    },
  },
  {
    title: "更新日期",
    width: 250,
    dataIndex: "update_at",
    key: "update_at",
    render: (t: Date) => <span>{moment(t).format("YYYY-MM-DD HH:mm")}</span>,
  },
  {
    title: "元信息",
    dataIndex: "meta",
    key: "meta",
    render: (meta: IArticleMeta) => (
      <span>{`评论：${meta.comments}、浏览：${meta.views}、喜欢：${meta.likes}`}</span>
    ),
  },
];

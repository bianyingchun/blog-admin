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
    title: "描述",
    key: "desc",
    dataIndex: "desc",
  },
  {
    title: "项目地址",
    key: "github",
    dataIndex: "github",
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
];

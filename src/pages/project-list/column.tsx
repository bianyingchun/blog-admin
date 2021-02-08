import { IProjectItem, ITagItem } from "src/types";
import { Tag } from "antd";
import React from "react";

export default [
  {
    title: "#",
    key: "tIndex",
    render: (_: any, record: IProjectItem, index: number) => (
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
    title: "线上地址",
    key: "url",
    dataIndex: "url",
  },
  {
    title: "标签",
    key: "tags",
    render: (_: any, record: IProjectItem) => {
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
    title: "预览图片",
    key: "preview",
    dataIndex: "preview",
    render: (preview: string) => {
      return (
        <img
          src={preview}
          alt="预览图片"
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
      );
    },
  },
];

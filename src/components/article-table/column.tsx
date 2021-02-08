import { IArticleItem, ITagItem, IArticleMeta } from "src/types";
import { Tag } from "antd";
import React from "react";
import moment from "moment";
const initColumns = (Operation: React.FC<any>) => {
  return [
    {
      title: "#",
      width: 50,
      key: "tIndex",
      render: (_: any, record: IArticleItem, index: number) => (
        <span>{index + 1}</span>
      ),
    },
    {
      title: "标题",
      width: 280,
      key: "title",
      dataIndex: "title",
    },
    {
      title: "标签",
      width: 250,
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
      width: 150,
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
    {
      title: "编辑",
      key: "operation",
      dataIndex: "operation",
      render: (_: any, record: IArticleItem) => {
        return <Operation id={record._id}></Operation>;
      },
    },
  ];
};

export default initColumns;

import { IMessageItem, IVisitor } from "src/types";
import React from "react";
import moment from "moment";
import { Form, Select } from "antd";

export default [
  {
    title: "#",
    key: "tIndex",
    render: (_: any, record: IMessageItem, index: number) => (
      <span>{index + 1}</span>
    ),
  },
  {
    title: "留言内容",
    key: "content",
    dataIndex: "content",
    editable: true,
  },
  {
    title: "留言日期",
    dataIndex: "create_at",
    key: "create_at",
    render: (t: Date) => <span>{moment(t).format("YYYY-MM-DD HH:mm:ss")}</span>,
  },
  {
    title: "IP",
    dataIndex: "ip",
    key: "ip",
  },
  {
    title: "留言者信息",
    dataIndex: "author",
    key: "author",
    render: (author: IVisitor) => {
      return (
        <span>
          <div>名称：{author.name}</div>
          <div>邮箱：{author.email}</div>
          <div>网站：{author.name}</div>
        </span>
      );
    },
  },
  {
    title: "状态",
    key: "state",
    dataIndex: "state",
    editable: true,
    editRender: (state: number) => (
      <Form.Item
        label="状态"
        name="state"
        rules={[{ required: true, message: "请选择状态" }]}
      >
        <Select placeholder="请选择状态">
          <Select.Option value={0}>待审核</Select.Option>
          <Select.Option value={1}>通过</Select.Option>
          <Select.Option value={2}>不通过</Select.Option>
        </Select>
      </Form.Item>
    ),
    render: (state: number) => (
      <span>{state === 0 ? "待审核" : state === 1 ? "通过" : "不通过"}</span>
    ),
  },
];

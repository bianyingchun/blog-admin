import React from "react";
import { Table } from "antd";
import initColumns from "./column";
import { IArticleItem, IArticleTableProps } from "src/types";
import EditableCell from "src/components/editable-cell";
const ArticleTable: React.FC<IArticleTableProps> = ({
  title,
  data,
  Operate,
}) => {
  const columns = initColumns(Operate);
  const isEditing = (record: IArticleItem) => false;
  const mergedColumns = columns.map((col) => {
    return {
      ...col,
      onCell: (record: IArticleItem) => ({
        record: record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <div>
      <div className="header-title">{title}</div>
      <div className="page-content">
        <Table
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowKey="_id"
          components={{ body: { cell: EditableCell } }}
        ></Table>
      </div>
    </div>
  );
};

export default ArticleTable;

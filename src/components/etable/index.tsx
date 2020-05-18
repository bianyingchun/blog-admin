import React, { useEffect, useState } from "react";
import { Table, Button, Divider } from "antd";
import { IArticleItem, IArticleTableProps, IETableProps } from "src/types";
import EditableCell from "src/components/editable-cell";
const ArticleTable: React.FC<IETableProps> = ({
  columns,
  fetchData,
  editData,
  viewData,
  deleteData,
}) => {
  const [data, setData] = useState<Array<any>>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(3);
  const paginationProps = {
    showTotal: () => `共${total}条`,
    pageSize: pageSize,
    current: currentPage,
    total: total,
    onChange: (current: number) => setCurrentPage(current),
  };
  const isEditing = (record: any) => false;
  const tableColumns = [
    ...columns,
    {
      title: "编辑",
      key: "operation",
      dataIndex: "operation",
      render: (_: any, record: any) => {
        const id = record.id;
        return (
          <span className="t_btn">
            <Button onClick={() => viewData(id)}>查看</Button>
            <Divider type="vertical" />
            <Button onClick={() => editData(id)}>修改</Button>
            <Divider type="vertical" />
            <Button onClick={() => deleteData(id)}>删除</Button>
          </span>
        );
      },
    },
  ];
  const mergedColumns = tableColumns.map((col) => {
    return {
      ...col,
      onCell: (record: any) => ({
        record: record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <div className="p20">
      <Table
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowKey="_id"
        pagination={paginationProps}
        components={{ body: { cell: EditableCell } }}
      ></Table>
    </div>
  );
};

export default ArticleTable;

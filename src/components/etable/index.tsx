import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm, message } from "antd";
import { IETableProps } from "src/types";
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
  const [pageSize] = useState<number>(10);
  const paginationProps = {
    showTotal: () => `共${total}条`,
    pageSize: pageSize,
    current: currentPage,
    total: total,
    onChange: (current: number) => setCurrentPage(current),
  };
  useEffect(() => {
    (async () => {
      let res = await fetchData({
        current_page: currentPage,
        page_size: pageSize,
      });
      if (res) {
        let { list, pagination } = res.result;
        setData(list || []);
        setTotal(pagination.total);
      }
    })();
  }, [currentPage, fetchData, pageSize]);
  async function remove(id: string) {
    const res = await deleteData(id);
    if (res) {
      const newData = [...data];
      const index = newData.findIndex((item) => item._id === id);
      newData.splice(index, 1);
      setData(newData);
      message.success("删除");
    } else {
      message.success("删除失败");
    }
  }

  const isEditing = (record: any) => false;
  const tableColumns = [
    ...columns,
    {
      title: "编辑",
      key: "operation",
      dataIndex: "operation",
      render: (_: any, record: any) => {
        const id = record._id;
        return (
          <div className="btn-groups">
            <Button onClick={() => viewData(id)}>查看</Button>
            <br />
            <Button onClick={() => editData(id)}>修改</Button>
            <br />
            <Popconfirm title="确认删除这条数据？" onConfirm={() => remove(id)}>
              <Button>删除</Button>
            </Popconfirm>
          </div>
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
    <div className="page-content">
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

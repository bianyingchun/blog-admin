import React, { useEffect, useState } from "react";
import { Button, Table, Form, Popconfirm, message } from "antd";
import { IEditableTableProps } from "src/types";
import EditableCell from "src/components/editable-cell";
const EditableTable: React.FC<IEditableTableProps> = ({
  columns,
  fetchData,
  editData,
  deleteData,
}) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
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
      } else {
        message.error("加载失败");
      }
    })();
  }, [currentPage, fetchData, pageSize]);

  const edit = async (record: any) => {
    form.setFieldsValue(record);
    setEditingKey(record._id);
  };
  const remove = async (id: string) => {
    const res = await deleteData(id);
    if (res) {
      const newData = [...data];
      const index = newData.findIndex((item) => item._id === id);
      newData.splice(index, 1);
      setData(newData);
      message.success("删除成功");
    } else {
      message.error("删除失败");
    }
  };
  const isEditing = (record: any) => record._id === editingKey;

  const save = async (record: any) => {
    try {
      const res = (await form.validateFields()) as any;
      const result = await editData(record._id, res);
      if (result) {
        const newData: any[] = [...data];
        const index = newData.findIndex((item: any) => record._id === item._id);
        newData.splice(index, 1, { ...record, ...res });
        setEditingKey("");
        setData(newData);
        message.success("修改成功");
      } else {
        message.error("修改失败");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const cancel = () => {
    setEditingKey("");
  };
  const tableColumns = [
    ...columns,
    {
      title: "编辑",
      key: "operation",
      dataIndex: "operation",
      render: (_: any, record: any) => {
        const editable = isEditing(record);

        return editable ? (
          <div className="btn-groups">
            <Button onClick={() => save(record)}>保存</Button>
            <br />
            <Button onClick={() => cancel()}>取消</Button>
          </div>
        ) : (
          <div className="btn-groups">
            <Button onClick={() => edit(record)}>修改</Button>
            <br />
            <Popconfirm
              title="确认删除这条数据？"
              onConfirm={() => remove(record._id)}
            >
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
        editing: col.editable && isEditing(record),
        editRender: col.editRender,
      }),
    };
  });
  return (
    <div className="page-content">
      <Form form={form} component={false}>
        <Table
          components={{ body: { cell: EditableCell } }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowKey="_id"
          pagination={paginationProps}
        ></Table>
      </Form>
    </div>
  );
};

export default EditableTable;

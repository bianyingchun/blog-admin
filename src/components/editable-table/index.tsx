import React, { useEffect, useState } from "react";
import { Button, Divider, Table, Form } from "antd";
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
  const [pageSize, setPageSize] = useState<number>(3);
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
      alert("删除成功");
    } else {
      alert("删除失败");
    }
  };
  const isEditing = (record: any) => record._id === editingKey;

  const save = async (record: any) => {
    try {
      const res = (await form.validateFields()) as any;
      await editData(record._id, res);
      const newData: any[] = [...data];
      const index = newData.findIndex((item: any) => record._id === item._id);
      newData.splice(index, 1, { ...record, ...res });
      setEditingKey("");
      setData(newData);
      alert("修改成功");
    } catch (err) {
      setEditingKey("");
      alert("修改失败");
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
          <span>
            <Button type="link" onClick={() => save(record)}>
              保存
            </Button>
            <Divider type="vertical" />
            <Button type="link" onClick={() => cancel()}>
              取消
            </Button>
          </span>
        ) : (
          <span className="t_btn">
            <Divider type="vertical" />
            <Button onClick={() => edit(record)}>修改</Button>
            <Divider type="vertical" />
            <Button onClick={() => remove(record._id)}>删除</Button>
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
        editing: col.editable && isEditing(record),
        editRender: col.editRender,
      }),
    };
  });
  return (
    <div className="p20">
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

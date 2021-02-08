import React, { useEffect, useState } from "react";
import { getTags, editTag, deleteTag } from "src/common/api";
import { ITagItem } from "src/types";
import { Table, Form, Button, message, Popconfirm } from "antd";
import EditableCell from "src/components/editable-cell";
const Tags: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<Array<ITagItem>>([]);
  const [editingKey, setEditingKey] = useState("");

  useEffect(() => {
    (async () => {
      const res = await getTags({});
      if (res) {
        setData(res.result.list || []);
      }
    })();
  }, []);
  const isEditing = (record: ITagItem) => record._id === editingKey;
  const edit = (record: ITagItem) => {
    form.setFieldsValue({ name: record.name, desc: record.desc });
    setEditingKey(record._id);
  };
  const save = async (id: string) => {
    try {
      const res = (await form.validateFields()) as ITagItem;
      await editTag({ id, ...res });
      const newData: ITagItem[] = [...data];
      const index = newData.findIndex((item: ITagItem) => id === item._id);
      newData.splice(index, 1, { ...res, _id: id });
      setEditingKey("");
      setData(newData);
      message.success("修改成功");
    } catch (err) {
      setEditingKey("");
      message.error("修改失败");
    }
  };
  const cancel = () => {
    setEditingKey("");
  };
  const remove = async (id: string) => {
    const res = await deleteTag(id);
    if (res) {
      const newData: ITagItem[] = [...data];
      const index = newData.findIndex((item: ITagItem) => id === item._id);
      newData.splice(index, 1);
      setData(newData);
      message.success("删除成功");
    } else {
      message.error("删除失败");
    }
    setEditingKey("");
  };
  const columns = [
    { title: "名称", dataIndex: "name", editable: true },
    { title: "描述", dataIndex: "desc", editable: true },
    {
      title: "操作",
      dataIndex: "opertaion",
      render: (_: any, record: ITagItem) => {
        const editable = isEditing(record);
        return editable ? (
          <div className="btn-groups">
            <Button onClick={() => save(record._id)}>保存</Button>
            <br />
            <Button onClick={() => cancel()}>取消</Button>
          </div>
        ) : (
          <div className="btn-groups">
            <Button onClick={() => edit(record)}>编辑</Button>
            <br />
            <Popconfirm
              title="确认删除此标签？"
              onConfirm={() => remove(record._id)}
            >
              <Button>删除</Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: ITagItem) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <div>
      <div className="header-title">标签列表</div>
      <div className="page-content">
        <Form form={form} component={false}>
          <Table
            components={{ body: { cell: EditableCell } }}
            bordered
            dataSource={data}
            columns={mergedColumns}
            rowKey="_id"
          ></Table>
        </Form>
      </div>
    </div>
  );
};

export default Tags;

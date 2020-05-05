import React, { useEffect, useState } from "react";
import { getTags, editTag, deleteTag } from "src/common/api";
import { ITagItem } from "src/types";
import { Table, Form, Button, Divider } from "antd";
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
      newData.splice(index, 1, { _id: id, ...res });
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
  const remove = async (id: string) => {
    const res = await deleteTag(id);
    if (res) {
      const newData: ITagItem[] = [...data];
      const index = newData.findIndex((item: ITagItem) => id === item._id);
      newData.splice(index, 1);
      setData(newData);
      alert("删除成功");
    } else {
      alert("删除失败");
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
          <span>
            <Button type="link" onClick={() => save(record._id)}>
              保存
            </Button>
            <Divider type="vertical" />
            <Button type="link" onClick={() => cancel()}>
              取消
            </Button>
          </span>
        ) : (
          <span>
            <Button type="link" onClick={() => edit(record)}>
              编辑
            </Button>
            <Divider type="vertical" />
            <Button type="link" onClick={() => remove(record._id)}>
              删除
            </Button>
          </span>
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
      <div className="p20">
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

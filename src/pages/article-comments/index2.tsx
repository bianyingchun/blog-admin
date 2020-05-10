import React, { useEffect, useState } from "react";
import { Button, Divider, Table, Form } from "antd";
import "./style.scss";
import { getComments, editComment, deleteComment } from "src/common/api";
import { ICommentItem } from "src/types";
import EditableCell from "src/components/editable-cell";
import initColumns from "./column";
const ArticleComments: React.FC = () => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [data, setData] = useState<Array<ICommentItem>>([]);

  useEffect(() => {
    (async () => {
      let res = await getComments({});
      if (res) {
        setData(res.result.list || []);
      }
    })();
  }, []);

  const edit = async (record: ICommentItem) => {
    form.setFieldsValue({ content: record.content, state: record.state });
    setEditingKey(record._id);
  };
  const remove = async (id: string) => {
    const res = await deleteComment(id);
    if (res) {
      const newData: ICommentItem[] = [...data];
      const index = newData.findIndex((item) => item._id === id);
      newData.splice(index, 1);
      setData(newData);
      alert("删除成功");
    } else {
      alert("删除失败");
    }
  };
  const isEditing = (record: ICommentItem) => record._id === editingKey;

  const save = async (record: ICommentItem) => {
    try {
      const res = (await form.validateFields()) as ICommentItem;
      await editComment(record._id, res);
      const newData: ICommentItem[] = [...data];
      const index = newData.findIndex(
        (item: ICommentItem) => record._id === item._id
      );
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

  const Operate: React.FC<{ record: ICommentItem }> = ({ record }) => {
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
  };
  //   const cloumns = initColumns(Operate);
  const cloumns = initColumns;
  const mergedColumns = cloumns.map((col) => {
    return {
      ...col,
      onCell: (record: ICommentItem) => ({
        record: record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: col.editable && isEditing(record),
        editRender: col.editRender,
      }),
    };
  });
  return (
    <div>
      <div className="header-title">评论列表</div>
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

export default ArticleComments;

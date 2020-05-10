import React from "react";
import { IEditableCellProps } from "src/types";
import { Input, Form } from "antd";
const editableCell: React.FC<IEditableCellProps> = ({
  editing,
  dataIndex,
  title,
  record,
  index,
  editRender,
  children,
}) => {
  const editTd = () => {
    if (editRender) {
      return editRender(record[dataIndex]);
    } else {
      return (
        <Form.Item
          name={dataIndex}
          rules={[{ required: true, message: `请输入${title}` }]}
        >
          <Input placeholder={`请输入${title}`} />
        </Form.Item>
      );
    }
  };
  return <td>{editing ? editTd() : children}</td>;
};

export default editableCell;

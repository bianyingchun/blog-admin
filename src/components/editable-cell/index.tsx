import React from "react";
import { IEditableCellProps } from "src/types";
import { Input, Form } from "antd";
const editableCell: React.FC<IEditableCellProps> = ({
  editing,
  dataIndex,
  title,
  record,
  index,
  children,
}) => {
  return (
    <td>
      {editing ? (
        <Form.Item
          name={dataIndex}
          rules={[{ required: true, message: `请输入${title}` }]}
        >
          <Input placeholder={`请输入${title}`} />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default editableCell;

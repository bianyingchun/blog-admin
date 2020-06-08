import React, { useState } from "react";
import { addMessage } from "src/common/api";
import { Button, Form, Input } from "antd";
import { useHistory } from "react-router-dom";
const MessageAdd: React.FC<any> = () => {
  const [content, setContent] = useState("");
  const history = useHistory();
  const sendMessage = async (values: any) => {
    const res = await addMessage({ content: values.content });
    if (res) {
      alert("新增留言成功");
      history.push("/messages");
    } else {
      setContent("");
      alert("新增留言失败");
    }
  };
  return (
    <div className="input_wraper">
      <div className="header-title">新增留言</div>
      <div className="p20">
        <Form onFinish={sendMessage}>
          <Form.Item
            name="content"
            rules={[
              {
                required: true,
                message: `请输入留言`,
              },
            ]}
          >
            <Input placeholder="留言内容" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="submit-btn">
              添加留言
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default MessageAdd;

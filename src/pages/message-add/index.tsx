import React from "react";
import { addMessage } from "src/common/api";
import { Button, Form, Input, message } from "antd";
const MessageAdd: React.FC<any> = () => {
  const [form] = Form.useForm();
  const sendMessage = async (values: any) => {
    const res = await addMessage({ content: values.content });
    if (res) {
      message.success("新增留言成功");
      form.resetFields();
    } else {
      message.error("新增留言失败");
    }
  };
  return (
    <div className="input_wraper">
      <div className="header-title">新增留言</div>
      <div className="page-content">
        <div className="form-container">
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
            <Form.Item style={{ justifyContent: "flex-end" }}>
              <Button type="primary" htmlType="submit" className="submit-btn">
                submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default MessageAdd;

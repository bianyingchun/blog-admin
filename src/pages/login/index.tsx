import React from "react";
import { Button, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./style.scss";
import { login } from "src/common/util/auth";
const Login: React.FC = () => {
  return (
    <div className="login-wraper">
      <div className="form-wraper">
        <h2>用户登录</h2>
        <Form onFinish={login}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: `请输入用户名`,
              },
            ]}
          >
            <Input
              placeholder="用户名"
              prefix={<UserOutlined className="site-form-item-icon" />}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: `请输入密码`,
              },
            ]}
          >
            <Input
              placeholder="密码"
              type="password"
              prefix={<LockOutlined className="site-form-item-icon" />}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="submit-btn">
              登录{" "}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;

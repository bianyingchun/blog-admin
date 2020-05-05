import React from "react";
import { Form, Input, Button } from "antd";
import { addTag } from "src/common/api";
const TagAdd: React.FC<any> = () => {
  const handleFormFinish = async (value: any) => {
    const res = await addTag(value.name, value.desc);
    if (res) {
      alert("添加成功");
    } else {
      alert("添加失败");
    }
  };
  return (
    <div>
      <div className="header-title">新增标签</div>
      <div className="p20">
        <Form
          layout="horizontal"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          onFinish={handleFormFinish}
        >
          <Form.Item
            label="标签名"
            name="name"
            rules={[{ required: true, message: "请输入标签名！" }]}
          >
            <Input placeholder="请输入标签名" />
          </Form.Item>
          <Form.Item label="描述" name="desc">
            <Input placeholder="请填写描述" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default TagAdd;

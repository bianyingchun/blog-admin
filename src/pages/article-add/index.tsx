import React, { useState, useEffect } from "react";
import { Button, message, Form, Input, Col, Select } from "antd";
import "./style.scss";
import Edit from "./edit";
const { Option } = Select;
const ArticleAdd: React.FC<any> = () => {
  const [form] = Form.useForm();
  const [title, setTitle] = useState<string>("");
  const [editContent, setEditContent] = useState<string>("");
  const [articleContent, setArticleContent] = useState({
    content: "",
    editContent: "",
  });
  const handleEditChange = function (content: string, editContent: string) {
    setArticleContent({ content, editContent });
  };
  const handleSubmit = function () {
    form
      .validateFields()
      .then((res) => {
        form.submit();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleFormFinish = function (values: any) {
    console.log(values);
  };
  const tags = [
    { _id: 1, name: "标签" },
    { _id: 2, name: "css" },
  ];
  const initValues = {
    title: "默认标题",
    desc: "默认描述",
    keywords: "java,python",
    tags: tags.map((item) => item._id),
  };
  const formInputConfigs = [
    {
      name: "title",
      label: "标题",
    },
    {
      name: "desc",
      label: "描述",
    },
    {
      name: "keywords",
      label: "关键字",
    },
  ];
  return (
    <div>
      <div className="header-title">{title}</div>
      <div className="p20">
        <div className="base-info">
          <Form
            form={form}
            initialValues={initValues}
            layout="inline"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 20 }}
            onFinish={handleFormFinish}
          >
            {formInputConfigs.map((item, index) => {
              return (
                <Col span={12} key={index}>
                  <Form.Item
                    {...item}
                    rules={[{ required: true, message: `请输入${item.label}` }]}
                  >
                    <Input placeholder={"请输入" + item.label} />
                  </Form.Item>
                </Col>
              );
            })}
            <Col span={12}>
              <Form.Item
                label="标签"
                name="tags"
                rules={[{ required: true, message: "请选择标签" }]}
              >
                <Select mode="multiple" placeholder="请选择标签">
                  {tags.map((item) => (
                    <Option value={item._id} key={item._id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Form>
        </div>
        <Edit handleEditChange={handleEditChange} content={editContent} />
        <div className="btnbox">
          <Button type="primary" onClick={handleSubmit}>
            提交
          </Button>
          <Button type="dashed">预览</Button>
          <Button type="dashed">存草稿</Button>
        </div>
      </div>
    </div>
  );
};

export default ArticleAdd;

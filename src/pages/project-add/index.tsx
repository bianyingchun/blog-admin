import React, { useState, useEffect } from "react";
import { Button, Form, Input, Col, Select } from "antd";
import "./style.scss";
import { useLocation, useParams, useHistory } from "react-router-dom";
import {
  addProject,
  getTags,
  getProjectById,
  editProject,
} from "src/common/api";
import { ITagItem } from "src/types";
const { Option } = Select;
const ProjectAdd: React.FC<{}> = () => {
  const location = useLocation();
  const history = useHistory();
  const param = useParams() as { id: string };
  const [isEditProject, setIsEditProject] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [tags, setTags] = useState([]);
  const [initialValues, setInitialValues] = useState({
    title: "默认值",
    desc: "",
    github: "",
    tags: [],
  });
  useEffect(() => {
    (async () => {
      const res = await getTags({});
      if (res) {
        const tags = res.result.list || [];
        setTags(tags);
        if (location.pathname.indexOf("edit") !== -1) {
          const res = await getProjectById(param.id);
          if (res && res.result) {
            const { desc, title, tags, github } = res.result;
            let values = {
              title,
              desc,
              github,
              tags: tags.map((item: ITagItem) => item._id),
            };
            setInitialValues(values);
            form.resetFields();
          }
          setIsEditProject(true);
        }
      }
    })();
  }, [form, location.pathname, param, param.id]);

  const handleSubmit = async () => {
    await form.validateFields();
    form.submit();
  };
  const handleFormFinish = async (values: any) => {
    const info = { ...values };

    if (isEditProject) {
      let res = await editProject(param.id, info);
      if (res) {
        alert("修改成功");
        history.push("/projects");
      }
    } else {
      let res = await addProject(info);
      if (res) {
        alert("保存成功");
        history.push("/projects");
      }
    }
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
      name: "github",
      label: "github地址",
    },
  ];
  return (
    <div>
      <div className="header-title">
        {isEditProject ? "编辑项目" : "添加项目"}
      </div>
      <div className="p20">
        <div className="base-info">
          <Form
            form={form}
            initialValues={initialValues}
            layout="horizontal"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
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
                  {tags.map((item: ITagItem) => (
                    <Option value={item._id} key={item._id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Form>
        </div>
        <div className="btnbox">
          <Button type="primary" onClick={() => handleSubmit()}>
            提交
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectAdd;

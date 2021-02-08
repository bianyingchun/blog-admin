import React, { useState, useEffect } from "react";
import { Button, Form, Input, Select, message } from "antd";
import "./style.scss";
import { useLocation, useParams, useHistory } from "react-router-dom";
import InputUpload from "src/components/input-upload";
import {
  addProject,
  getTags,
  getProjectById,
  editProject,
} from "src/common/api";
import { IInputUploadValue, ITagItem } from "src/types";
const checkFileOrText = (rule: any, value: IInputUploadValue) => {
  if (value.text || (value.fileList && value.fileList.length)) {
    return Promise.resolve();
  }
  return Promise.reject("请填写链接或上传文件");
};
const formInputConfigs = [
  {
    name: "title",
    label: "标题",
    required: true,
  },
  {
    name: "desc",
    label: "描述",
    required: true,
  },
  {
    name: "github",
    label: "github地址",
    required: true,
  },
  {
    name: "url",
    label: "线上地址",
    required: false,
  },
];
const { Option } = Select;
const ProjectAdd: React.FC<{}> = () => {
  const location = useLocation();
  const history = useHistory();
  const param = useParams() as { id: string };
  const [isEditProject, setIsEditProject] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [tags, setTags] = useState([]);
  const [initialValues, setInitialValues] = useState({
    title: "",
    desc: "",
    github: "",
    tags: [],
    url: "",
    preview: { text: "", fileList: [] },
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
            const {
              desc,
              title,
              tags,
              github,
              preview = "",
              url = "",
            } = res.result;
            let values = {
              title,
              desc,
              github,
              url,
              preview: { text: preview, fileList: [] },
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
        message.success("修改成功");
        history.push("/project-list");
      } else {
        message.error("修改失败");
      }
    } else {
      let res = await addProject(info);
      if (res) {
        message.success("添加成功");
        history.push("/project-list");
      } else {
        message.error("添加失败");
      }
    }
  };

  return (
    <div>
      <div className="header-title">
        {isEditProject ? "编辑项目" : "添加项目"}
      </div>
      <div className="page-content">
        <div className="form-container">
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
                <Form.Item
                  {...item}
                  key={index}
                  rules={[
                    { required: item.required, message: `请输入${item.label}` },
                  ]}
                >
                  <Input placeholder={"请输入" + item.label} />
                </Form.Item>
              );
            })}
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
            <Form.Item
              name="preview"
              label="预览图片链接"
              rules={[{ validator: checkFileOrText }, { required: false }]}
            >
              <InputUpload accept=".jpg, .jpeg, .png" />
            </Form.Item>
          </Form>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button type="primary" onClick={() => handleSubmit()}>
              提交
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectAdd;

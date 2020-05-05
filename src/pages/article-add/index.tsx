import React, { useState, useEffect } from "react";
import { Button, message, Form, Input, Col, Select } from "antd";
import "./style.scss";
import Edit from "./edit";
import { useLocation, useParams, useHistory } from "react-router-dom";
import {
  addArticle,
  getTags,
  getArticleById,
  editArticle,
} from "src/common/api";
import { ITagItem } from "src/types";
const { Option } = Select;
const ArticleAdd: React.FC<{}> = () => {
  const location = useLocation();
  const history = useHistory();
  const param = useParams() as { id: string };
  const [isEditArticle, setIsEditArticle] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [tags, setTags] = useState([]);
  let articleState = 1;
  const [articleContent, setArticleContent] = useState({
    content: "",
    editContent: "",
  });
  const [initialValues, setInitialValues] = useState({
    title: "默认值",
    desc: "",
    keywords: "",
    tags: [],
  });
  useEffect(() => {
    (async () => {
      const res = await getTags({});
      if (res) {
        const tags = res.result.list || [];
        setTags(tags);
        if (location.pathname.indexOf("edit") !== -1) {
          const res = await getArticleById(param.id);
          if (res && res.result) {
            const {
              desc,
              title,
              tags,
              content,
              editContent,
              keywords,
              state,
            } = res.result;
            let values = {
              title,
              desc,
              keywords,
              tags: tags.map((item: ITagItem) => item._id),
            };
            setInitialValues(values);
            form.resetFields();
            articleState = state;
            setArticleContent({ content, editContent });
          }
          setIsEditArticle(true);
        }
      }
    })();
  }, [location.pathname, param, param.id]);

  const handleEditChange = function (content: string, editContent: string) {
    setArticleContent({ content, editContent });
  };
  const handleSubmit = async (state: number) => {
    await form.validateFields();
    articleState = state;
    form.submit();
  };
  const handleFormFinish = async (values: any) => {
    const info = { ...values, ...articleContent, state: articleState };

    if (isEditArticle) {
      let res = await editArticle(param.id, info);
      if (res) {
        alert("修改成功");
        history.push("/article");
      }
    } else {
      let res = await addArticle(info);
      if (res) {
        alert("保存成功");
        history.push("/article");
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
      name: "keywords",
      label: "关键字",
    },
  ];
  return (
    <div>
      <div className="header-title">
        {isEditArticle ? "编辑文章" : "添加文章"}
      </div>
      <div className="p20">
        <div className="base-info">
          <Form
            form={form}
            initialValues={initialValues}
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
        <Edit
          handleEditChange={handleEditChange}
          content={articleContent.editContent}
        />
        <div className="btnbox">
          <Button type="primary" onClick={() => handleSubmit(1)}>
            提交
          </Button>
          <Button type="dashed">预览</Button>
          <Button type="dashed" onClick={() => handleSubmit(2)}>
            存草稿
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ArticleAdd;

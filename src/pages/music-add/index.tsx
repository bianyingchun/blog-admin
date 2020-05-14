import React, { useState, useEffect } from "react";
import { Button, message, Form, Input, Upload } from "antd";
import "./style.scss";
import { UploadOutlined } from "@ant-design/icons";
import { useLocation, useParams, useHistory } from "react-router-dom";
import {
  addArticle,
  getTags,
  getArticleById,
  editArticle,
} from "src/common/api";
import { ITagItem } from "src/types";
const { TextArea } = Input;

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

  return (
    <div>
      <div className="header-title">新增音乐</div>
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
            <Form.Item
              name="title"
              label="歌名"
              rules={[{ required: true, message: `请输入歌名` }]}
            >
              <Input placeholder="请输入歌名" />
            </Form.Item>
            <Form.Item
              name="singer"
              label="歌手"
              rules={[{ required: true, message: `请填写歌手` }]}
            >
              <Input placeholder="请填写歌手" />
            </Form.Item>
            <Form.Item
              name="lyrics"
              label="歌词"
              rules={[{ required: true, message: `请输入歌词` }]}
            >
              <TextArea placeholder="请填写歌词" />
            </Form.Item>
            <Form.Item
              name="poster"
              label="海报"
              rules={[{ required: true, message: `请填写海报` }]}
            >
              <Input placeholder="请填写海报链接" />
              <Upload>
                <Button type="link">
                  <UploadOutlined /> 点击上传海报{" "}
                </Button>
              </Upload>
            </Form.Item>
            <Form.Item
              name="url"
              label="歌曲链接"
              rules={[{ required: true, message: `请填写海报` }]}
            >
              <Input placeholder="请填写歌曲链接" />
              <Upload>
                <Button type="link">
                  <UploadOutlined /> 点击上传歌曲{" "}
                </Button>
              </Upload>
            </Form.Item>
          </Form>
        </div>
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
// https://www.jianshu.com/p/36d3574aeb78 文件上传
// 自定义表单控件

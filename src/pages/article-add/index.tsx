import React, { useState, useEffect } from "react";
import { Button, message, Form, Input, Col, Select, DatePicker } from "antd";
import "./style.scss";
import Edit from "./edit";
import { useLocation, useParams, useHistory } from "react-router-dom";
import InputUpload from "src/components/input-upload";
import moment from "moment";
import {
  addArticle,
  getTags,
  getArticleById,
  editArticle,
} from "src/common/api";
import { ITagItem } from "src/types";
import { ARTICLE_TYPES } from "src/common/constant";
moment.locale("zh_CN");
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
    title: "",
    desc: "",
    keywords: "",
    tags: [],
    type: 0,
    create_at: moment(new Date(), "YYYY-MM-DD HH:mm"),
    thumb: {
      text: "",
      fileList: [],
    },
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
              type = 0,
              thumb = "",
              create_at = new Date(),
            } = res.result;
            let values = {
              title,
              desc,
              keywords,
              type,
              create_at: moment(create_at, "YYYY-MM-DD HH:mm"),
              thumb: { text: thumb, fileList: [] },
              tags: tags.map((item: ITagItem) => item._id),
            };
            setInitialValues(values);
            form.resetFields();
            // eslint-disable-next-line react-hooks/exhaustive-deps
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
    try {
      await form.validateFields();
      articleState = state;
      form.submit();
    } catch (err) {
      console.log(err);
    }
  };
  const handleFormFinish = async (values: any) => {
    const info = { ...values, ...articleContent, state: articleState };
    info.create_at = info.create_at.toDate();
    if (isEditArticle) {
      let res = await editArticle(param.id, info);
      if (res) {
        message.success("修改成功");
        history.push("/article-list");
      } else {
        message.error("修改失败");
      }
    } else {
      let res = await addArticle(info);
      if (res) {
        message.success("添加成功");
        history.push("/article-list");
      } else {
        message.error("添加失败");
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
      <div className="page-content">
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
            <Col span={12}>
              <Form.Item
                label="类型"
                name="type"
                rules={[{ required: true, message: "请选择文章类型" }]}
              >
                <Select placeholder="请选择文章类型">
                  {ARTICLE_TYPES.map((item) => (
                    <Option value={item.val} key={item.val}>
                      {item.text}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="thumb" label="预览图">
                <InputUpload accept=".jpg, .jpeg, .png" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="create_at" label="日期">
                <DatePicker showTime format="YYYY-MM-DD HH:mm" />
              </Form.Item>
            </Col>
          </Form>
        </div>
        <Edit
          handleEditChange={handleEditChange}
          content={articleContent.content}
        />
        <div className="btnbox">
          <Button type="primary" onClick={() => handleSubmit(1)}>
            发布
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

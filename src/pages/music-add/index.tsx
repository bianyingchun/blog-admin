import React, { useState, useEffect } from "react";
import { Button, Form, Input } from "antd";
import "./style.scss";
import { useLocation, useParams, useHistory } from "react-router-dom";
import { addMusic, getMusicById, editMusic } from "src/common/api";
import InputUpload from "src/components/input-upload";
import { IInputUploadValue } from "src/types";
const { TextArea } = Input;

const MusicAdd: React.FC<{}> = () => {
  const location = useLocation();
  const history = useHistory();
  const param = useParams() as { id: string };
  const [isEditMusic, setIsEditMusic] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState({
    title: "歌名",
    singer: "歌手",
    lyrics: "歌词",
    poster: { text: "", fileList: [] },
    url: { text: "", fileList: [] },
  });

  useEffect(() => {
    (async () => {
      if (location.pathname.indexOf("edit") !== -1) {
        const res = await getMusicById(param.id);
        if (res && res.result) {
          const { title, singer, lyrics, poster, url } = res.result;
          let values = {
            title,
            singer,
            lyrics,
            poster: { text: poster, fileList: [] },
            url: { text: url, fileList: [] },
          };
          setInitialValues(values);
          form.resetFields();
        }
        setIsEditMusic(true);
      }
    })();
  }, [form, location.pathname, param.id]);
  const checkFileOrText = (rule: any, value: IInputUploadValue) => {
    if (value.text || (value.fileList && value.fileList.length)) {
      return Promise.resolve();
    }
    return Promise.reject("请填写链接或上传文件");
  };
  const handleSubmit = async () => {
    await form.validateFields();
    form.submit();
  };
  const handleFormFinish = async (values: any) => {
    if (isEditMusic) {
      let res = await editMusic(param.id, values);
      if (res) {
        alert("修改成功");
        history.push("/musics");
      }
    } else {
      let res = await addMusic(values);
      if (res) {
        console.log(res);
        alert("保存成功");
        history.push("/musics");
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
              label="海报"
              name="poster"
              rules={[{ validator: checkFileOrText }]}
            >
              <InputUpload accept=".jpg, .jpeg, .png" />
            </Form.Item>
            <Form.Item
              name="url"
              label="歌曲链接"
              rules={[{ validator: checkFileOrText }]}
            >
              <InputUpload accept=".flac, .ape, .mp3" />
            </Form.Item>
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

export default MusicAdd;

// https://www.jianshu.com/p/36d3574aeb78 文件上传
// 自定义表单控件

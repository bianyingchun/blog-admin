import React, { useState } from "react";
import { Upload, Input, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { IInputUploadProps, IInputUploadValue } from "src/types";
const InputUpload: React.FC<IInputUploadProps> = ({
  value = {},
  onChange,
  accept,
}) => {
  const [text, setText] = useState(value.text || '');
  const [fileList, setFileList] = useState<any>([]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setText(newText)
    triggerChange({ text: newText});
  };
  const triggerChange = (changedValue: IInputUploadValue) => {
    if (onChange) {
      onChange({ text, fileList, ...value, ...changedValue });
    }
  };
  const handleUploadChange = (info: any) => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1);
    fileList = fileList.map((file) => {
      const res = { ...file };
      if (file.response) {
        res.url = file.response.url;
      }
      return res;
    });
    setFileList(fileList);
  };
  const beforeUploadHandle = (file: any) => {
    setFileList([file]);
    triggerChange({fileList:[file]})
    return false;
  };
  const uploadProps = {
    action: "",
    accept: accept,
    onChange: handleUploadChange,
    beforeUpload: beforeUploadHandle,
  };

  return (
    <>
      <Input
        placeholder="请填写链接"
        value={text}
        onChange={handleInputChange}
      />
      <Upload {...uploadProps} fileList={fileList}>
        <Button type="link">
          <UploadOutlined /> 点击上传文件
        </Button>
      </Upload>
    </>
  );
};

export default InputUpload;

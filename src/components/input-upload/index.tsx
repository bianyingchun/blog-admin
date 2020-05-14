import React, { useState } from "react";
import { Upload, Input, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { IInputUploadProps } from "src/types";
const InputUpload: React.FC<IInputUploadProps> = ({
  inputVal,
  setInputVal,
  fileList,
  setFileList,
  accept,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
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
    console.log(file);
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
        placeholder="请填写海报链接"
        value={inputVal}
        onChange={handleInputChange}
      />
      <Upload {...uploadProps} fileList={fileList}>
        <Button type="link">
          <UploadOutlined /> 点击上传海报
        </Button>
      </Upload>
    </>
  );
};

export default InputUpload;

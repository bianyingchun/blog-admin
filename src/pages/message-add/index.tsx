import React, { useState } from "react";
import { addMessage } from "src/common/api";
import { Button } from "antd";
import { useHistory } from "react-router-dom";
const MessageAdd: React.FC<any> = () => {
  const [content, setContent] = useState("");
  const history = useHistory();
  const author = {
    gravatar: "avatar",
    name: "MarkTuan",
    email: "20932109@qq.com",
  };
  const sendMessage = async () => {
    const res = await addMessage({ content, author });
    if (res) {
      alert("新增留言成功");
      history.push("/messages");
    } else {
      setContent("");
      alert("新增留言失败");
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };
  return (
    <div className="input_wraper">
      <input type="text" onChange={handleInputChange} value={content} />
      <Button onClick={() => sendMessage()}>添加评论</Button>
    </div>
  );
};

export default MessageAdd;

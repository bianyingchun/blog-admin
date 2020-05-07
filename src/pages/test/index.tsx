import React, { useState, useEffect } from "react";
import * as service from "src/common/api";
import { Button } from "antd";
const Test: React.FC<any> = () => {
  const post_id = "5eb35690e4c1082ccc76fdf2";
  const [content, setContent] = useState("");
  const [commentList, setCommentList] = useState([]);
  const author = {
    gravatar: "user avatar",
    name: "user name",
    email: "20932109@qq.com",
  };
  function addComment() {
    service.addComment({ post_id, content, author });
  }
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setContent(e.target.value);
  }

  useEffect(() => {
    (async () => {
      let res = await service.getComments({ post_id });
      setCommentList(res.result.list || []);
    })();
  }, []);
  return (
    <div>
      <div className="input_wraper">
        <input type="text" onChange={handleInputChange} value={content} />
        <Button onClick={() => addComment()}>添加评论</Button>
      </div>
      <div className="comment_list">
        <div className="title">评论列表</div>
        <div className="list">{commentList}</div>
      </div>
    </div>
  );
};

export default Test;

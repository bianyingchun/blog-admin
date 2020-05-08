import React, { useState, useEffect } from "react";
import * as service from "src/common/api";
import { Button } from "antd";
import moment from "moment";
import "./style.scss";
import {
  ICommentItem,
  ICommentItemProps,
  IReplyItem,
  IReplyItemProps,
  IReplyAddParams,
} from "src/types";
const ReplyItem: React.FC<IReplyItemProps> = ({
  _id,
  post_id,
  content,
  likes,
  from,
  to,
  reply,
  state,
  cid,
  // create_at,
  // update_at,
  city,
  country,
  // like,
  // remove,
  addReply,
}) => {
  const id = Math.ceil(Math.random() * 100);
  const user = {
    gravatar: "avatar",
    name: "MarkTuan__" + id,
    email: "20932109@qq.com",
  };
  const [val, setVal] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  };
  return (
    <div>
      <div className="reply_item">
        <div>
          {from.name}
          {to ? `@${to.name}:${content}` : content}{" "}
        </div>
        <div>
          <Button
            type="ghost"
            onClick={() => {
              // like(_id);
            }}
          >
            点赞
          </Button>
          <span> 赞数:{likes} </span>
          <Button
            type="danger"
            onClick={() => {
              // remove(_id);
            }}
          >
            删除
          </Button>
        </div>
      </div>
      <div>
        <div className="input_wraper">
          <input type="text" onChange={handleInputChange} value={val} />
          <Button
            onClick={() => {
              addReply({
                post_id,
                cid,
                content: val,
                from: user,
                to: from,
              });
            }}
          >
            添加回复
          </Button>
        </div>
      </div>
    </div>
  );
};
const CommentItem: React.FC<ICommentItemProps> = ({
  _id,
  post_id,
  pid,
  content,
  likes,
  author,
  reply,
  state,
  create_at,
  update_at,
  city,
  country,
  like,
  remove,
}) => {
  const id = Math.ceil(Math.random() * 100);
  const user = {
    gravatar: "avatar",
    name: "MarkTuan__" + id,
    email: "20932109@qq.com",
  };
  const [val, setVal] = useState("");
  const [replyList, setReplyList] = useState<Array<IReplyItem>>([]);
  const addReply = async (reply: IReplyAddParams) => {
    const res = await service.addReply(reply);
    if (res) {
      setReplyList([...replyList, res.result]);
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  };
  useEffect(() => {
    (async () => {
      const res = await service.getReplys({ cid: _id });
      if (res) {
        setReplyList(res.result.list || []);
      }
    })();
  }, [_id]);
  return (
    <div className="comment_item">
      <div>评论内容:{content}</div>
      <div>
        <Button
          type="ghost"
          onClick={() => {
            like(_id);
          }}
        >
          点赞
        </Button>
        <span> 赞数:{likes} </span>
        <Button
          type="danger"
          onClick={() => {
            remove(_id);
          }}
        >
          删除
        </Button>
      </div>
      <div>
        创建于:{moment(create_at).format("YYYY-MM-DD HH:mm:ss")}，更新于:
        {moment(update_at).format("YYYY-MM-DD HH:mm:ss")}
      </div>
      <div>
        用户信息1：地址{city}-{country}
      </div>
      <div>
        用户信息2：用户名-{author.name}-用户头像-{author.gravatar}-用户邮箱-
        {author.email}
      </div>
      <div>
        <div className="input_wraper">
          <input type="text" onChange={handleInputChange} value={val} />
          <Button
            onClick={() => {
              addReply({ post_id, cid: _id, content: val, from: user });
            }}
          >
            添加回复
          </Button>
        </div>
        <div className="title">{reply}条回复</div>
        <div className="reply_list">
          {replyList.map((item) => (
            <ReplyItem {...{ ...item, addReply }} key={item._id} />
          ))}
        </div>
      </div>
    </div>
  );
};
// =============================================
const Test: React.FC<any> = () => {
  const post_id = "5eb35690e4c1082ccc76fdf2";
  const [content, setContent] = useState("");
  const [commentList, setCommentList] = useState<ICommentItem[]>([]);
  const id = Math.ceil(Math.random() * 100);
  const author = {
    gravatar: "avatar",
    name: "MarkTuan__" + id,
    email: "20932109@qq.com",
  };
  const addComment = async () => {
    service.addComment({ post_id, content, author });
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };
  const like = async (id: string) => {
    const res = await service.likeComment(id);
    if (res) {
      const newData: ICommentItem[] = [...commentList];
      const index = commentList.findIndex((item) => item._id === id);
      console.log(index);
      const item = newData[index];
      newData.splice(index, 1, { ...item, likes: item.likes + 1 });
      setCommentList(newData);
    }
  };
  const remove = async (id: string) => {
    const res = await service.deleteComment(id);
    if (res) {
      const newData: ICommentItem[] = [...commentList];
      const index = commentList.findIndex((item) => item._id === id);
      newData.splice(index, 1);
      setCommentList(newData);
    }
  };
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
        <div className="list">
          {commentList.map((item: ICommentItem) => (
            <CommentItem {...{ ...item, like, remove }} key={item._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Test;

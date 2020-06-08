import React, { useState, useEffect } from "react";
import ArticleTable from "src/components/article-table";
import { IArticleItem, IHandler } from "src/types";
import { getArtilesByPage, deleteArticle } from "src/common/api";
import { useHistory } from "react-router-dom";
import { Button, Divider } from "antd";

const AricleDraft: React.FC = () => {
  const [data, setData] = useState<IArticleItem[]>([]);
  const history = useHistory();
  const view: IHandler = (_id: string) => {};
  const edit: IHandler = (_id: string) => {
    history.push(`/article-edit/${_id}`);
  };
  const remove: IHandler = (_id: string) => {
    const res = deleteArticle(_id);
    if (res) {
      const newData: IArticleItem[] = [...data];
      const index = newData.findIndex((item) => _id === item._id);
      newData.splice(index, 1);
      setData(newData);
      alert("删除成功");
    } else {
      alert("删除失败");
    }
  };
  useEffect(() => {
    (async () => {
      const res = await getArtilesByPage({});
      if (res) {
        setData(res.result.list || []);
      }
    })();
  }, []);
  const Operate: React.FC<any> = ({ id }) => {
    return (
      <span className="t_btn">
        <Button onClick={() => view(id)}>查看</Button>
        <Divider type="vertical" />
        <Button onClick={() => edit(id)}>修改</Button>
        <Divider type="vertical" />
        <Button onClick={() => remove(id)}>删除</Button>
      </span>
    );
  };
  return (
    <ArticleTable title="草稿箱" data={data} Operate={Operate}></ArticleTable>
  );
};

export default AricleDraft;

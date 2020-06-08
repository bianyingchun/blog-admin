import React from "react";
import { getArtilesByPage, deleteArticle } from "src/common/api";
import ETable from "src/components/etable";
import columns from "../article-list/column";
import { useHistory } from "react-router-dom";
import { IPageInfo } from "src/types";
const AricleList: React.FC = () => {
  const history = useHistory();
  const view = (_id: string) => {};
  const edit = (_id: string) => {
    history.push(`/article-edit/${_id}`);
  };
  const fetchData = async (pageInfo: IPageInfo) =>
    getArtilesByPage({ ...pageInfo, state: 2 });

  return (
    <div>
      <div className="header-title">草稿箱列表</div>
      <ETable
        fetchData={fetchData}
        deleteData={deleteArticle}
        editData={edit}
        viewData={view}
        columns={columns}
      ></ETable>
    </div>
  );
};

export default AricleList;

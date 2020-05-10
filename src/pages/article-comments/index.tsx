import React from "react";
import "./style.scss";
import { getComments, editComment, deleteComment } from "src/common/api";
import EditableTable from "src/components/editable-table";
import columns from "./column";
const ArticleComments: React.FC = () => {
  return (
    <div>
      <div className="header-title">评论列表</div>
      <EditableTable
        fetchData={getComments}
        deleteData={deleteComment}
        editData={editComment}
        columns={columns}
      />
    </div>
  );
};

export default ArticleComments;

import React from "react";
import { getMessageList, editMessage, deleteMessage } from "src/common/api";
import EditableTable from "src/components/editable-table";
import columns from "./column";
const ArticleComments: React.FC = () => {
  return (
    <div>
      <div className="header-title">留言列表</div>
      <EditableTable
        fetchData={getMessageList}
        deleteData={deleteMessage}
        editData={editMessage}
        columns={columns}
      />
    </div>
  );
};

export default ArticleComments;

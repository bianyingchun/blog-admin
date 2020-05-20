import React from "react";
import { getMusicList, deleteMusic } from "src/common/api";
import ETable from "src/components/etable";
import columns from "./column";
import { useHistory } from "react-router-dom";
const MusicList: React.FC = () => {
  const history = useHistory();
  const view = (_id: string) => {};
  const edit = (_id: string) => {
    history.push(`/music-edit/${_id}`);
  };
  return (
    <div>
      <div className="header-title">项目列表</div>
      <ETable
        fetchData={getMusicList}
        deleteData={deleteMusic}
        editData={edit}
        viewData={view}
        columns={columns}
      ></ETable>
    </div>
  );
};

export default MusicList;

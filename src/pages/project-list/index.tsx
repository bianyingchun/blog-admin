import React from "react";
import { getProjectList, deleteProject, editProject } from 'src/common/api'
import ETable from 'src/components/etable'
import columns from './column'
import { useHistory } from "react-router-dom";
const ProjectList: React.FC = () => {
  const history = useHistory();
  const view = (_id: string) => {};
  const edit= (_id: string) => {
    history.push(`/project-edit/${_id}`);
  };
  return (<div>
    <div className="header-title">项目列表</div>
    <ETable
      fetchData={getProjectList}
      deleteData={deleteProject}
      editData={edit}
      viewData={view}
      columns={columns}
    ></ETable>
  </div>);
};

export default ProjectList;

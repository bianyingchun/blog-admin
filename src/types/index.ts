import { RouteComponentProps } from "react-router-dom";
export interface IRouterViewProps {
  location?: any;
  // 进入路由之前的钩子
  beforeEnter?: (path: string) => void;
}

export interface IRouteItem {
  path: string;
  component: any;
  exact?: boolean;
  routes?: IRouteItem[];
}

export interface IWithSubRoutesProps extends IRouteItem, RouteComponentProps {}

export interface IMainProps {
  routes?: Array<IRouteItem>;
}

export interface IMenuProps{
  collapsed:boolean
}

export interface menuType {
  title: string,
  key: string,
  icon?:any,
  path?: string,
  children?: menuType[]
}

export interface IEditProps{
  content:string,
  handleEditChange:(content:string, editContent:string) => void
}

interface FieldData {
  name: string[];
  value: any;
  touched: boolean;
  validating: boolean;
  errors: string[];
}

export interface IBaseInfoProps{
  onChange: (fields: FieldData[]) => void;
  fields: FieldData[];
}
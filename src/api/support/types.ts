export interface NavListItem {
  name: string;
  path: string;
}

export interface NavListGroup {
  name: string;
  id: string;
  children: NavListItem[];
}

export interface ResObject {
  msg: string;
  code: number;
  data: NavListGroup[];
}

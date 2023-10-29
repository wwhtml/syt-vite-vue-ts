interface ResData<T = any> {
  code?: number;
  message?: string;
  ok?: boolean;
  data: T;
  // [propname: string]: any; //这一行是为了防止后台接口还有别的属性
}

import { defineStore } from "pinia";

interface UserInfoType {
  name: string;
  token: number;
}

export const useUserStore = defineStore({
  id: "user",
  // app 是当前store的名称；在Vue DevTools 插件中显示；创建store必须命名
  state: () => {
    return {
      visiable: false,
      userInfo: {} as UserInfoType
    };
  },
  persist: {
    key: "syt-user", //
    paths: ["userInfo"] //count：是需要保存的state中的一个数据名称
  }
});

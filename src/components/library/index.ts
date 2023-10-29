import type { App } from "vue";

//全局注册组件
import AppSearch from "./app-search.vue";
import AppPage from "./app-page.vue";
import AppInfiniteLoading from "./app-infinite-loading.vue";

export default {
  install(app: App) {
    app.component("AppSearch", AppSearch);
    app.component("AppPage", AppPage);
    app.component("AppInfiniteLoading", AppInfiniteLoading);
  }
};

//如果不是大型项目，组件量不多的情况下，使用这种方式挺好的，一眼就能看明白！！！！

//如果将这些组件弄成按需加载就更好了！！！！ 可以借助：【defineAsyncComponent】  （还是那句话：少量组件没必要）

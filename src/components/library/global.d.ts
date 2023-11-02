import AppMenu from "./app-menu.vue";
import AppMenuItem from "./app-menu-item.vue";
import AppSearch from "./app-search.vue";
import AppPage from "./app-page.vue";
import AppInfiniteLoadingVue from "./app-infinite-loading.vue";

import AppInput from "./app-input.vue";

// 参考：
declare module "vue" {
  export interface GlobalComponents {
    AppMenu: typeof AppMenu;
    AppMenuItem: typeof AppMenuItem;
    AppSearch: typeof AppSearch;
    AppPage: typeof AppPage;
    AppInfiniteLoadingVue: typeof AppInfiniteLoadingVue;
    AppInput: typeof AppInput;
  }
}
export {};

import "./assets/styles/index.scss";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

//element-plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

//公共组件
import ui from "@/components/library/index";

// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(createPinia());
app.use(router);
app.use(ElementPlus);
app.use(ui);

app.mount("#app");

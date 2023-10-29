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

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus);
app.use(ui);

app.mount("#app");

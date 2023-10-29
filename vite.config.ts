import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      //配置scss
      scss: {
        //引入多个文件（注意字符串中不要有空格）
        additionalData: `@import "@/assets/styles/variables.scss";@import "@/assets/styles/mixins.scss";`
      }
    }
  },
  server: {
    host: "0.0.0.0",
    port: 9999,
    open: true,
    proxy: {
      "/api": {
        target: "http://syt.atguigu.cn",
        changeOrigin: true
      }
    }
  }
});

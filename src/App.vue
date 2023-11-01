<script lang="ts" setup>
//组件
import AppHeader from "@/components/app-header.vue";
import AppFooter from "@/components/app-footer.vue";
import AppLogin from "@/components/app-login.vue";

import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";

let userStore = useUserStore();
let { visiable } = storeToRefs(userStore);
visiable.value = false;
</script>

<template>
  <el-container>
    <el-header>
      <app-header></app-header>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
    <el-footer>
      <app-footer></app-footer>
    </el-footer>
  </el-container>

  <app-login v-model="visiable"></app-login>
</template>

<style scoped lang="scss">
.el-container {
  height: 100%;
}
.el-header {
  padding: 0;
  height: 70px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  z-index: 999;
}
.el-main {
  padding: 0;
}
.el-footer {
  padding: 0;
  height: 50px;
  background-color: $bg-footer-color;
}
</style>

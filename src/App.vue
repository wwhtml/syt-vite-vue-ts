<script lang="ts" setup>
//组件
import AppHeader from "@/components/app-header.vue";
import AppFooter from "@/components/app-footer.vue";

console.log(AppHeader);

const handle = () => {};
</script>

<template>
  <el-container>
    <el-header>
      <app-header @click="handle"></app-header>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
    <el-footer>
      <app-footer></app-footer>
    </el-footer>
  </el-container>
</template>

<style scoped lang="scss">
.el-container {
  height: 100%;
}
.el-header {
  padding: 0;
  height: 70px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
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

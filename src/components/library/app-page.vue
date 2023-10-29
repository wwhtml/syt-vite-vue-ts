<script lang="ts" setup>
//vue
import { ref } from "vue";
//page实例
const pageScrollRef = ref();
//导出
defineExpose({
  pageScrollRef
});
</script>

<template>
  <el-scrollbar wrap-class="show" ref="pageScrollRef" view-class="app-page" v-bind="$attrs">
    <slot></slot>
  </el-scrollbar>
  <el-backtop :bottom="100" target=".show"> </el-backtop>
</template>

<style scoped lang="scss">
// :deep(.app-page) {
//   background-color: antiquewhite;
// }
</style>

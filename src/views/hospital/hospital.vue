<script lang="ts" setup>
// 注意：script标签内容不能为空，如果这里的内容是空就不会编译
</script>

<template>
  <app-page>
    <div class="hospital container">
      <div class="left">left</div>
      <div class="right">right</div>
    </div>
  </app-page>
</template>

<style scoped lang="scss">
.hospital {
  min-height: 2000px;
  display: flex;
  .left {
    flex: 0 0 200px;
    background-color: antiquewhite;
  }
  .right {
    flex: 1;
    background-color: aqua;
  }
}
</style>

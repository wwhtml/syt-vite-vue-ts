<script lang="ts" setup>
// 注意：script标签内容不能为空，如果这里的内容是空就不会编译

import { useRouter } from "vue-router";
const router = useRouter();
</script>

<template>
  <div class="app-footer container">
    <ul class="left">
      <li><span> 京ICP备05021558号-24 </span></li>
      <li><span> 电话挂号010-114 </span></li>
    </ul>

    <ul class="right">
      <li v-for="item in 4" :key="item">
        <span @click="router.push('/information')">联系我们</span>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.app-footer {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  ul {
    display: flex;
    align-items: center;
    &.left {
      li {
        margin-right: 42px;
      }
    }
    &.right {
      li {
        margin-left: 20px;
      }
    }
  }
}
</style>

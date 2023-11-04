<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<template>
  <div class="patient">
    <h1 class="title">就诊人管理</h1>
    <ul>
      <li>注册账号最多可以同时绑定四个就诊人</li>
      <li>注册账号每自然年内，最多可以绑定八位就诊人</li>
      <li>同一手机号，最多同时可以被八位就诊人作为联系电话</li>
    </ul>

    <div class="add-btn" @click="router.push(`patient/add`)">
      <span> + 添加就诊人</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.patient {
  .title {
    margin-bottom: 30px;
  }

  ul {
    padding-left: 30px;
    li {
      font-size: 16px;
      margin-bottom: 10px;
      list-style-type: decimal;
    }
  }
  .add-btn {
    margin-top: 30px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    // padding-left: 120px;
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.04);
    transition: all 0.5s ease;
    &:hover {
      box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.1);
    }
    cursor: pointer;

    span {
      color: $active-color;
      font-size: 16px;
    }
  }
}
</style>

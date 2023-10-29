<script lang="ts" setup></script>

<template>
  <div class="app-header container">
    <h1 class="v-link active hover fs-20">
      <p class="logo">
        <img src="../assets/images/logo.png" alt="" />
      </p>
      <span>北京市预约挂号统一平台</span>
    </h1>
    <div class="search">
      <app-search></app-search>
    </div>
    <ul>
      <li><span class="v-link">敬老版</span></li>
      <li><span class="v-link">帮助中心</span></li>
      <li><span class="v-link fw-700">登录/注册</span></li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.app-header {
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    display: flex;
    align-items: center;
    p {
      width: 50px;
      height: 50px;
      margin-right: 10px;
    }
  }

  .search {
    width: 500px;
    height: 40px;
    background-color: antiquewhite;
  }

  ul {
    display: flex;
    align-items: center;
    li {
      margin-left: 20px;
    }
  }
}
</style>

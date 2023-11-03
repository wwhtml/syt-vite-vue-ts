<script lang="ts" setup>
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";
const router = useRouter();

//pinia

const userStore = useUserStore();

const { userInfo } = storeToRefs(userStore);

//点击登录.
const showLogin = () => {
  !userStore.visiable && (userStore.visiable = true);
};
//退出登录，清除token就可以了
const Exit = () => {
  userStore.$reset();
  router.push("/");
};
</script>

<template>
  <div class="app-header container">
    <h1 class="v-link active hover fs-20" @click="router.push('/')">
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
      <li><span class="v-link" @click="router.push(`/support/login`)">帮助中心</span></li>
      <li>
        <el-dropdown v-if="userInfo.name">
          <span class="el-dropdown-link v-link">
            <span>{{ userInfo.name }}</span>
            <!-- <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-arrow"></use>
            </svg> -->
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="router.push(`/user/authentication`)">
                实名认证</el-dropdown-item
              >
              <el-dropdown-item @click="router.push(`/user/order`)">挂号订单</el-dropdown-item>
              <el-dropdown-item @click="router.push(`/user/patient`)">就诊人管理</el-dropdown-item>
              <el-dropdown-item @click="router.push(`/user/account`)"
                >修改账户信息</el-dropdown-item
              >
              <el-dropdown-item @click="Exit">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <span v-else class="v-link fw-700" @click="showLogin">登录/注册</span>
      </li>
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

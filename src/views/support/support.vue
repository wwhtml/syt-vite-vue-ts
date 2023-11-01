<script lang="ts" setup>
//vue
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

//api
import { getSupportNavList } from "@/api/support/index";
import type { NavListGroup } from "@/api/support/types";

const route = useRoute();
const router = useRouter();

const currentRoute = computed(() => {
  return route.fullPath;
});

//navs数据
const supportNav = ref<NavListGroup[]>();
const getSupportNavListData = async () => {
  const res = await getSupportNavList();
  // console.log(res);
  if (res.code == 200) {
    supportNav.value = res.data;
  }
};
getSupportNavListData();

//选择menu
const menuRoute = (path: string) => {
  router.push(`/support/${path}`);
};
</script>

<template>
  <app-page>
    <div class="support container">
      <div class="left">
        <div class="nav-bar">
          <div class="nav-item-group" v-for="group in supportNav" :key="group.id">
            <div class="title">{{ group.name }}</div>
            <ul>
              <li
                v-for="nav in group.children"
                :key="nav.path"
                @click="menuRoute(nav.path)"
                :class="{ active: `/support/${nav.path}` == currentRoute }"
              >
                <span>{{ nav.name }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="right">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </app-page>
</template>

<style lang="scss" scoped>
.support {
  display: flex;
  .left {
    width: 200px;
  }
  .right {
    flex: 1;
  }
}

.nav-bar {
  position: sticky;
  top: 0;
  .nav-item-group {
    margin-bottom: 30px;
  }
  padding: 30px 0;
  ul {
    li {
      padding-left: 10px;
      margin-top: 20px;
      position: relative;
      display: flex;
      align-items: center;
      span {
        cursor: pointer;
        &:hover {
          color: $active-color;
        }
      }

      &.active {
        color: $active-color;
        // font-weight: 700;
        &:before {
          content: "";
          width: 5px;
          height: 5px;
          background-color: $active-color;
          position: absolute;
          left: 0;
        }
      }
    }
  }
}
</style>

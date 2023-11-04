<script lang="ts" setup>
// vue
import { computed, ref, watch } from "vue";
// vue-router
import { useRouter, useRoute } from "vue-router";
//element组件
import { ElScrollbar } from "element-plus";

//菜单
const route = useRoute();
const router = useRouter();
// console.log(`output->router`, router);
// console.log(`output->route`, route);

//路由左侧菜单

const routesMenu = computed(() => {
  const res = route.matched[0].children;
  return res.filter((item) => {
    return item.meta?.isMenu == true;
  });
});

const currentIndex = computed((): string => {
  return route.path as string;
});

// console.log(`output->routesMenu`, routesMenu);

//监听路由，每次路由切换，scroll都指定
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>();
watch(
  () => route.fullPath,
  () => {
    // @ts-ignore
    scrollbarRef.value!.pageScrollRef.setScrollTop(0);
  }
);
</script>

<template>
  <app-page ref="scrollbarRef">
    <div class="user container">
      <div class="left">
        <el-affix :offset="70">
          <app-menu :default-active="currentIndex">
            <app-menu-item
              v-for="item in routesMenu"
              :key="item.path"
              :index="`/user/` + item.path"
              @click="router.push(`/user/${item.path}`)"
            >
              <span>{{ item.meta?.title }}</span>
            </app-menu-item>
          </app-menu>
        </el-affix>
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

<style scoped lang="scss">
.user {
  display: flex;
  min-height: 2000px;
  .left {
    position: relative;
    flex: 0 0 200px;
    // background-color: antiquewhite;
  }
  .right {
    flex: 1;
    padding: 38px 0;
    // background-color: aqua;
  }
}
</style>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

//获取左侧路由菜单
const menuRoute = computed(() => {
  const res = route.matched[0].children;
  return res.filter((item) => {
    return item.meta?.isMenu;
  });
});
const currentIndex = computed((): string => {
  return route.name as string;
});
</script>

<template>
  <app-page>
    <div class="hospital container">
      <div class="left">
        <el-affix :offset="70">
          <app-menu :default-active="currentIndex">
            <app-menu-item
              v-for="(item, index) in menuRoute"
              :key="index"
              :index="item.path"
              @click="router.push({ path: item.path })"
            >
              <span>{{ item.meta?.title }} </span>
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
.hospital {
  min-height: 2000px;
  display: flex;
  .left {
    flex: 0 0 200px;
    // background-color: antiquewhite;
  }
  .right {
    flex: 1;
    // background-color: aqua;
    padding: 30px 0;
  }
}
</style>

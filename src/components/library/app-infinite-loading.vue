<script lang="ts" setup>
import { ref } from "vue";
import { useIntersectionObserver } from "@vueuse/core";

const emit = defineEmits(["infinite"]);

type Props = {
  loading: boolean;
  finished: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  finished: false
});

const target = ref(null);
// 监听target是否进入可视区
useIntersectionObserver(
  target,
  ([{ isIntersecting }]) => {
    // console.log(isIntersecting);

    if (isIntersecting) {
      console.log("进入可视区了");
      // 触发加载事件条件：请求加载完成，数据加载完毕
      if (!props.loading && !props.finished) {
        emit("infinite");
      }
    }
  },
  {
    threshold: 0
  }
);
</script>

<template>
  <div class="app-infinite-loading" ref="target">
    <div class="loading" v-if="loading">
      <span v-loading="true"></span>
      <span class="text">正在加载...</span>
    </div>
    <div class="none" v-if="loading == false && finished == true">
      <span class="img"></span>
      <span class="text">亲，没有更多了</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-infinite-loading {
  height: 150px; //注意：一定要有高度
  display: flex;
  align-items: center;
  justify-content: center;

  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    // height: 100px;
    padding: 30px;
    :deep(.el-loading-parent--relative) {
      height: 60px;
      width: 60px;
      margin-right: 20px;

      :deep(.el-loading-spinner) {
        padding: 0;
      }
    }
    .text {
      color: #999;
      font-size: 14px;
      letter-spacing: 2px;
    }
  }
  .none {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    // height: 100px;
    padding: 30px;
    .img {
      width: 70px;
      height: 50px;
      background: url(../../assets/images/empty.png) no-repeat center / contain;
    }
    .text {
      color: #999;
      font-size: 13px;
      padding: 10px;
      letter-spacing: 2px;
    }
  }
}
</style>

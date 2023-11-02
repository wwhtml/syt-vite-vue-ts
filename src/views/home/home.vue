<script lang="ts" setup>
//vue
import { reactive, ref } from "vue";
//api
import { getHosList } from "@/api/home/index";
import type { HospitalList, HoslistItem } from "@/api/home/types";
//组件
import HomeCarousel from "./home-carousel.vue";
import HomeFilter from "./home-filter.vue";
import HomeHosList from "./home-hos-list.vue";
import HomeSideBar from "./home-side-bar.vue";

//图片
import EmptyImg from "@/assets/images/empty.png";

//获取医院列表
const hosList = ref<HoslistItem[]>([]);

interface Params {
  page: number;
  limit: number;
  hostype: string;
  districtCode: string;
}
const params: Params = reactive({
  page: 1,
  limit: 10,
  hostype: "",
  districtCode: ""
});

const hosLoading = ref<boolean>(false);

const getHosListData = async () => {
  //添加一个限制
  //如果当前请求还没有请求成功就禁止下一个请求

  hosLoading.value = true;
  const res: ResData<HospitalList> = await getHosList(
    params.page,
    params.limit,
    params.hostype,
    params.districtCode
  ).catch((res) => {
    console.log(`output->res`, res);
  });
  try {
    if (res.code == 200) {
      const { content } = res.data;
      hosList.value?.push(...content);
      params.page++;

      hosLoading.value = false;
      if (content.length < 10) {
        finished.value = true;
        inLoading.value = false;
      }
    }
  } catch {
    console.log(`output->1`, "请求取消");
  }
};
getHosListData();

//更改过滤条件
//为了防止在快速切换的时候，第一次请求的数据覆盖了第二次请求的数据，这里做了一个防抖功能；在axios中又设置取消请求的功能 （双重保障）
//如果充分考虑  axios的timeout 、这里的防抖时间周期 、 网速 等因素，只设置一个防抖功能就好！！！毕竟发送请求，在取消请求还是比较耗费性能的
//防抖时间周期：不宜设置的太长，获取数据的延迟时间太长
//这里做了一个防抖（就是短时间内只有最后一次触发事件）
let timer = ref();
const handleFilterChange = (value: { hostype: string; districtCode: string }) => {
  hosLoading.value = true;

  if (timer.value) {
    clearTimeout(timer.value);
  }
  timer.value = setTimeout(() => {
    // console.log(`output->2222`, 2222);
    hosList.value = [];
    params.page = 1;
    params.limit = 10;
    params.hostype = value.hostype;
    params.districtCode = value.districtCode;
    finished.value = false;
    getHosListData();
  }, 400);
};

//滚动加载
const finished = ref<boolean>(false);
const inLoading = ref<boolean>(false);
const infiniteGetHosListData = async () => {
  inLoading.value = true;
  const res: ResData = await getHosList(
    params.page,
    params.limit,
    params.hostype as string,
    params.districtCode as string
  );

  if (res.code == 200 && res.data) {
    const { content } = res.data;
    console.log(content);
    hosList.value?.push(...content);
    params.page++;

    if (content.length < 10) {
      finished.value = true;
      inLoading.value = false;
    }
  }
};
</script>

<template>
  <app-page>
    <div class="home container">
      <!-- 轮播图 -->
      <home-carousel></home-carousel>
      <!-- 搜索框 -->
      <div class="home-search">
        <app-search></app-search>
      </div>

      <!-- 主体内容 -->
      <div class="main">
        <!-- home-filter -->
        <div class="left pr-80">
          <home-filter @change="handleFilterChange"></home-filter>

          <template v-if="hosList && hosList.length">
            <home-hos-list :hosList="hosList"></home-hos-list>
            <app-infinite-loading
              :finished="finished"
              :loading="inLoading"
              @infinite="infiniteGetHosListData"
            ></app-infinite-loading>
          </template>
          <div
            v-loading="hosLoading"
            v-else-if="hosList && !hosList.length && hosLoading"
            class="hos-loading"
          ></div>

          <el-empty v-else description="暂无数据" :image-size="130" :image="EmptyImg" />
        </div>
        <div class="right">
          <home-side-bar></home-side-bar>
        </div>

        <!-- home-side-bar -->
      </div>
    </div>
  </app-page>
</template>

<style scoped lang="scss">
.home {
  padding-bottom: 38px;
  .home-search {
    margin: 25px auto 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    :deep(.el-input) {
      font-size: 16px;
      height: 60px;
      width: 800px;
    }
  }

  .main {
    margin-top: 50px;
    min-height: 100vh;

    display: flex;
    .left {
      width: calc(100% - 200px);
      .hos-loading {
        height: 240px;
        :deep(.el-loading-mask) {
          background-color: transparent;
        }
      }
    }
    .right {
      width: 200px;
    }
  }
}
</style>

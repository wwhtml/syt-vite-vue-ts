<script lang="ts" setup>
import { ref, watch } from "vue";

//api
import { getHosLevelAndRegion } from "@/api/home/index";
import type { FilterItem } from "@/api/home/types";

//emit
// const emit = defineEmits(["change"]);

const emit = defineEmits<{
  (
    e: "change",
    params: {
      hostype: string;
      districtCode: string;
    }
  ): void;
}>();

// type Pa = {
//   hostype: string | undefined;
//   districtCode: string | undefined;
// };

// const emit = defineEmits<{
//   (e: "change", params: Pa): void;
// }>();

//获取数据
const hosLevel = ref<FilterItem[] | undefined>([]);
const hosArea = ref<FilterItem[] | undefined>([]);

const curLeval = ref<FilterItem>();
const curArea = ref<FilterItem>();

//获取数据
const getHosLevelData = async () => {
  const res: ResData<FilterItem[]> = await getHosLevelAndRegion("Hostype");
  if (res.code == 200) {
    hosLevel.value = res.data;
  }
};

const getHosAreaData = async () => {
  const res: ResData<FilterItem[]> = await getHosLevelAndRegion("Beijin");
  if (res.code == 200) {
    hosArea.value = res.data;
  }
};

getHosLevelData();
getHosAreaData();

//选择
const seletLevel = (item: FilterItem | undefined) => {
  curLeval.value = item;
};

const seletArea = (item: FilterItem | undefined) => {
  curArea.value = item;
};

//监听选项是否变化

watch(
  () => ({
    hostype: curLeval.value?.value as string,
    districtCode: curArea.value?.value as string
  }),
  (params) => {
    emit("change", params);
  }
);
</script>

<template>
  <div class="home-filter">
    <div class="title mb-30">医院</div>
    <div class="filter">
      <div class="label">等级：</div>
      <ul>
        <li :class="{ active: curLeval == undefined }" @click="seletLevel(undefined)">
          <span class="v-link">全部</span>
        </li>
        <li
          :class="{ active: curLeval == item }"
          v-for="(item, index) in hosLevel"
          :key="index"
          @click="seletLevel(item)"
        >
          <span class="v-link">{{ item.name }}</span>
        </li>
      </ul>
    </div>
    <div class="filter">
      <div class="label">地区：</div>
      <ul>
        <li :class="{ active: curArea == undefined }" @click="seletArea(undefined)">
          <span class="v-link">全部</span>
        </li>

        <li
          :class="{ active: curArea == item }"
          v-for="(item, index) in hosArea"
          :key="index"
          @click="seletArea(item)"
        >
          <span class="v-link">{{ item.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-filter {
  .filter {
    display: flex;
    .label {
      margin-right: 16px;
      flex-shrink: 0;
      color: $light-color;
    }
    ul {
      margin-bottom: 10px;
      display: flex;
      flex-wrap: wrap;
      li {
        margin: 0 24px 10px 0;
        &.active span {
          font-weight: 700;
          color: $active-color;
        }
      }
    }
  }
}
</style>

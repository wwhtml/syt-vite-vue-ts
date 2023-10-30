<script lang="ts" setup>
//vue
import { ref, computed } from "vue";
//marked
import { marked } from "marked";

//api
import { getUserAgreement } from "@/api/information/index";

//获取数据
const aggrement = ref<string>("");

const getAggrementData = async () => {
  const res = await getUserAgreement();
  console.log(res);
  if (res.code == 200) {
    const content = res.data.content;
    aggrement.value = content;
  }
};
getAggrementData();

// marked.setOptions({
//   gfm: true, //默认值是true；是否使用github标准的markdown；
//   breaks: true //默认值是false。允许回车换行。该选项要求 gfm 为true。
// });

const html = computed(() => marked(aggrement.value));
</script>

<template>
  <div class="markdown-body" v-html="html"></div>
</template>

<style scoped lang="scss">
.markdown-body {
  padding: 20px 0;
  color: $dark-color;
  font-size: 14px;
}
</style>

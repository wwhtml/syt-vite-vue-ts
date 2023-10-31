<script lang="ts" setup>
// 注意：script标签内容不能为空，如果这里的内容是空就不会编译
import { ref, computed } from "vue";
import { getCommon } from "@/api/support/index";
import { marked } from "marked"; // 引入marked

const article = ref<string>("");

const getCommonData = async () => {
  const res = await getCommon();
  console.log(res);
  if (res.code == 200) {
    article.value = res.data;
  }
};
getCommonData();

const html = computed(() => marked(article.value));
</script>

<template>
  <div class="markdown-body" v-html="html"></div>
</template>
<style lang="scss" scoped>
.markdown-body {
  padding: 40px 0;
  font-size: 14px;
}
</style>

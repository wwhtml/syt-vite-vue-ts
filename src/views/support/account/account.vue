<script lang="ts" setup>
// 注意：script标签内容不能为空，如果这里的内容是空就不会编译
import { ref, computed, onMounted, onUpdated, watch } from "vue";
import { getAccount } from "@/api/support/index";
import { marked } from "marked"; // 引入marked

const article = ref<string>("");

const getAccountData = async () => {
  const res = await getAccount();
  // console.log(res);
  if (res.code == 200) {
    article.value = res.data;
  }
};
getAccountData();

const markHtml = computed(() => marked(article.value));
</script>

<template>
  <div class="markdown-body" v-html="markHtml"></div>
</template>
<style lang="scss" scoped>
.markdown-body {
  padding: 40px 0;
  font-size: 14px;
}
</style>

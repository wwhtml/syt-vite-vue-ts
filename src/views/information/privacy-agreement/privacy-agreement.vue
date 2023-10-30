<script lang="ts" setup>
//vue
import { ref, computed } from "vue";
//marked
import { marked } from "marked";
//api
import { getPrivacyAgreement } from "@/api/information/index";

const privacy = ref("");

const getPrivacyData = async () => {
  const res = await getPrivacyAgreement();
  if (res.code == 200) {
    privacy.value = res.data.content;
  }
};
getPrivacyData();

marked.setOptions({
  gfm: true, //默认值是true；是否使用github标准的markdown；
  breaks: true //默认值是false。允许回车换行。该选项要求 gfm 为true。
});

const html = computed(() => marked(privacy.value));
</script>

<template>
  <div class="markdown-body" v-html="html"></div>
</template>

<style scoped lang="scss">
.markdown-body {
  padding: 20px 0;
  color: $dark-color;
  font-size: 14px;
  p {
    text-indent: 2em;
  }
}
</style>

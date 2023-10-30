<script lang="ts" setup>
// 注意：script标签内容不能为空，如果这里的内容是空就不会编译
</script>

<template>
  <div class="markdown-body">
    <h2>合作伙伴</h2>

    <ul>
      <li>
        <span class="mr-30 fw-400">主办单位: </span>
        <span>北京市卫生健康委员会</span>
      </li>
      <li>
        <span class="mr-30 fw-400">承办单位: </span>
        <span>中国联通北京分公司</span>
      </li>
      <li>
        <span class="mr-30">政府支持: </span>
        <span>中华人民共和国卫生部北京市政府北京卫生健康委员会</span>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.markdown-body {
  padding: 20px 0;
  color: $dark-color;
  font-size: 14px;
  ul {
    margin-top: 40px;
  }
  li {
    margin-top: 20px;
    .icon {
      margin-right: 10px;
    }
    list-style-type: none;
  }
}
</style>

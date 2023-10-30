<script lang="ts" setup>
// 注意：script标签内容不能为空，如果这里的内容是空就不会编译
</script>

<template>
  <div class="contact markdown-body">
    <h2>联系我们</h2>

    <ul class="content">
      <li>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-dianhua"></use>
        </svg>
        <span>电话预约挂号服务热线：114（北京用户）/ 010-114（非北京用户）</span>
      </li>
      <li>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-wangluo"></use>
        </svg>
        <span>网上预约挂号：www.114yygh.com</span>
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

<script lang="ts" setup>
// 注意：script标签内容不能为空，如果这里的内容是空就不会编译
</script>

<template>
  <el-carousel height="350px">
    <el-carousel-item v-for="item in 4" :key="item">
      <img src="../../assets/images/web-banner-1.png" alt="" />
    </el-carousel-item>
  </el-carousel>
</template>

<style scoped lang="scss">
img {
  height: 350px;
  width: 100%;
}
</style>

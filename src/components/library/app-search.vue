<script lang="ts" setup>
// 注意：script标签内容不能为空，如果这里的内容是空就不会编译

import { ref } from "vue";

const hosname = ref<string>();

const isFocus = ref<boolean>(false);

const handleFocus = () => {
  isFocus.value = true;
  console.log(1);
};

const handleBlur = () => {
  isFocus.value = false;
  console.log(2);
};
</script>
<!-- 
  :fetch-suggestions="querySearch"
      popper-class="my-autocomplete"
      placeholder="Please input"
      @select="handleSelect"

 -->
<template>
  <div class="app-search">
    <el-autocomplete
      v-model="hosname"
      placeholder="点击输入医院名称"
      :class="{ isFocus: isFocus }"
      :trigger-on-focus="false"
      @focus="handleFocus"
      @blur="handleBlur"
    >
      <template #prepend>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-search"></use>
        </svg>
      </template>
      <template #append>
        <span class="v-link active hover fw-700">搜索</span>
      </template>
      <template #default="{ item }">
        <div class="value">{{ item.value }}</div>
        <span class="link">{{ item.link }}</span>
      </template>
    </el-autocomplete>
  </div>
</template>

<style scoped lang="scss">
.app-search {
  :deep(.el-autocomplete) {
    position: relative;

    &:before {
      content: "";
      height: 1px;
      width: 1px;
      background-color: $active-color;
      position: absolute;
      left: 50%;
      bottom: -1px;
      transform: translate(-50%);
      z-index: 999;
      transition: all 0.3s ease;
    }
    &.isFocus {
      &:before {
        width: 100%;
      }
    }

    .el-input {
      background-color: #fff;
      box-shadow: 0 1px 0 #eee;
      transition: all 0.5s ease;
      height: 40px;
      width: 500px;
      &:hover {
        box-shadow: 0 1px 0 #ddd;
      }

      .el-input-group__append,
      .el-input-group__prepend {
        background-color: transparent;
        box-shadow: none;
      }

      .el-input__wrapper {
        padding: 0;
        background-color: transparent;
        box-shadow: none;
        .el-input__inner {
          height: 100%;
        }
      }
    }
  }
}
</style>

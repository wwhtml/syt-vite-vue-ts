<script lang="ts" setup>
import { ref } from "vue";

const isFocus = ref(false);

const handleFocus = () => {
  console.log(11);
  isFocus.value = true;
};
const handleBlur = () => {
  console.log(2);
  isFocus.value = false;
};
</script>

<template>
  <div class="app-input" :class="{ active: isFocus }">
    <el-input v-bind="$attrs" @focus="handleFocus" @blur="handleBlur" />
    <div class="line"></div>
  </div>
</template>

<style scoped lang="scss">
.app-input {
  position: relative;
  // margin-bottom: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  :deep(.el-input) {
    .el-input__wrapper {
      border-radius: 0;
      box-shadow: 0 1px 0 #dcdfe6;
      transition: all 0.5s ease;

      &:hover {
        box-shadow: 0 1px 0 #c0c4cc;
      }
    }
  }

  &:after {
    content: "";
    width: 0;
    height: 1px;
    background-color: $active-color;
    position: absolute;
    bottom: -1px;
    z-index: 999;
    transition: all 0.3s ease;
  }

  &.active {
    &:after {
      width: 100%;
    }
  }
}
</style>

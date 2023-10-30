<script lang="ts" setup>
import { provide, ref, reactive, watch } from "vue";
/* 
props
*/
type Props = {
  defaultActive?: string; //defaultActive 是字符串 | undefined
  box?: boolean; //选中的 menu 左侧小方框，默认显示
};
const props = withDefaults(defineProps<Props>(), {
  defaultActive: "",
  box: true
});

//当前选中menu的index值
const activeIndex = ref<string>("");
const menuBox = ref();

activeIndex.value = props.defaultActive;
menuBox.value = props.box;

const selectMenu = (menuItem: any) => {
  const { index } = menuItem;
  // console.log(`output->index`, index);
  if (index == null) {
    return;
  }
  activeIndex.value = index;
};

const rootMenu = reactive({
  props: props,
  activeIndex: activeIndex,
  menuBox: menuBox,
  selectMenu: selectMenu
});

provide("rootMenu", rootMenu);

watch(
  () => props.defaultActive,
  () => {
    activeIndex.value = props.defaultActive;
  }
);

watch(
  () => props.box,
  () => {
    menuBox.value = props.box;
  }
);
</script>

<template>
  <div class="app-menu">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.app-menu {
  padding: 10px 0;
}
</style>

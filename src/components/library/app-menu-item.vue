<script lang="ts" setup>
import { inject, computed } from "vue";

type Props = {
  index?: string | null;
};

const props = withDefaults(defineProps<Props>(), {
  index: null
});

const rootMenu = inject("rootMenu");

// console.log(`output->rootMenu`, rootMenu);

const active = computed(() => {
  //@ts-ignore
  return rootMenu?.activeIndex === props.index;
});

const menuBox = computed(() => {
  //@ts-ignore
  return rootMenu.menuBox;
});

const emit = defineEmits(["click"]);

const handleClick = () => {
  //@ts-ignore
  rootMenu.selectMenu({
    active: active.value,
    index: props.index
  });

  emit("click", {
    active: active.value,
    index: props.index
  });
};
</script>

<template>
  <div
    class="app-menu-item"
    ref="menuRef"
    :class="{ active: active, menuBox: menuBox }"
    @click="handleClick"
  >
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
$active-color-i: $active-color;

.app-menu-item {
  height: 70px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  position: relative;
  cursor: pointer;

  transition: all 0.5s ease;

  &:hover {
    color: $active-color-i;
  }

  :deep(.icon) {
    margin-right: 6px;
  }

  &:before {
    content: "";
    width: 0px;
    height: 0px;
    background-color: $active-color;
    position: absolute;
    left: 0;
    transition: all 0.5s ease;
  }

  &.active {
    @include font($active-color, 16px, 700);
    &.menuBox {
      &:before {
        content: "";
        width: 8px;
        height: 8px;
      }
    }
  }
}
</style>

<script lang="ts" setup>
//路由
import { useRouter } from "vue-router";
import type { HoslistItem } from "@/api/home/types";

type Props = {
  hosList: HoslistItem[] | undefined;
};
defineProps<Props>();

const router = useRouter();
</script>

<template>
  <div class="home-hos-list">
    <div
      class="hos-list-card"
      v-for="(hos, index) in hosList"
      :key="index"
      @click="router.push(`/hospital/${hos.hoscode}/register`)"
    >
      <div class="left">
        <div class="title">{{ hos.hosname }}</div>
        <div class="content">
          <span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-dengji"></use>
            </svg>
            {{ hos.param.hostypeString }}</span
          >
          <span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-time"></use>
            </svg>
            每天 {{ hos.bookingRule.releaseTime }} 放号
          </span>
        </div>
      </div>
      <div class="right">
        <img :src="`data:image/jpeg;base64,${hos.logoData}`" class="c-img" alt="" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-hos-list {
  padding-left: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .hos-list-card {
    margin-top: 30px;
    padding: 0 10px 0 20px;
    width: 440px;
    height: 98px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.04);
    transition: all 0.3s ease;
    cursor: pointer;
    &:hover {
      box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.1);
      .left {
        .title {
          font-weight: 700;
        }
      }
      .right {
        transform: scale(1.14);
      }
    }
    .left {
      transition: all 0.3s ease;

      height: 76px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title {
        font-weight: 400;
        height: 42px;
        line-height: 42px;
        transition: all 0.3s ease;
      }
      .content {
        color: $light-color;
        width: 250px;
        display: flex;
        justify-content: space-between;
      }
    }
    .right {
      margin-left: 12px;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      transition: all 0.5s ease;
    }
  }
}
</style>

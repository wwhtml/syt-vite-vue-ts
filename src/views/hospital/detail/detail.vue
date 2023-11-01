<script lang="ts" setup>
// 注意：script标签内容不能为空，如果这里的内容是空就不会编译

import { ref } from "vue";
import { useRoute } from "vue-router";
import { getHospitalDetail } from "@/api/hospital/index";
import type { HosDetail, Hospital } from "@/api/hospital/types";

const route = useRoute();

//获取数据
const hospital = ref<Hospital>();
const getHosDetail = async () => {
  const res: ResData<HosDetail> = await getHospitalDetail(route.params.hoscode as string);
  if (res.code == 200) {
    hospital.value = res.data.hospital;
  }
};
getHosDetail();
</script>

<template>
  <div class="detail">
    <div class="header">
      <div class="title">
        <h2>{{ hospital?.hosname }}</h2>
        <p>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-dengji"></use>
          </svg>
          <span>{{ hospital?.param.hostypeString }}</span>
        </p>
      </div>
      <div class="section">
        <div class="hos-logo">
          <img src="../../../assets/images/hos_logo.png" alt="" />
        </div>
        <div class="route">
          {{ hospital?.route }}
        </div>
      </div>
    </div>

    <div class="main">
      <div class="title">医院介绍</div>
      <div class="introduction">
        {{ hospital?.intro }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.detail {
  .header {
    .title {
      display: flex;
      align-items: center;
      margin-bottom: 50px;
      h2 {
        @include font($dark-color, 20px, 700);
        margin-right: 16px;
      }
      p {
        @include font($light-color, 14px, 400);
        .icon {
          margin-right: 5px;
        }
      }
    }
    .section {
      display: flex;
      .hos-logo {
        width: 80px;
        height: 80px;
        margin-right: 30px;
        flex-shrink: 0;
      }
      .route {
        flex: 1;
        color: $dark-color;
      }
    }
  }

  .main {
    .title {
      padding: 40px 0 20px 0;
    }
    .introduction {
      @include font($base-color, 12px, 400);
      line-height: 20px;
      letter-spacing: 1px;
      text-indent: 2em;
    }
  }
}
</style>

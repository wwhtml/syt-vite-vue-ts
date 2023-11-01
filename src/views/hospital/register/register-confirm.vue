<script lang="ts" setup>
//vue
import { ref } from "vue";
import { useRoute } from "vue-router";
//api
import { getDoctorInfo } from "@/api/hospital/index";
import type { HosDoctorInfo } from "@/api/hospital/types";

const route = useRoute();

const docInfo = ref<HosDoctorInfo>();
const getDoctorInfoData = async () => {
  const res = await getDoctorInfo(route.params.docId as string);
  console.log(res);
  docInfo.value = res.data;
};
getDoctorInfoData();

//获取所有就诊人的信息
//...
</script>

<template>
  <div class="register-confirm">
    <h1>确认挂号信息</h1>
    <div class="sub-title">选择就诊人</div>
    <div class="add">
      <span>+ 添加就诊人</span>
    </div>
    <div class="sub-title">挂号信息</div>
    <ul class="info">
      <li>
        就诊日期： <span>{{ docInfo?.workDate }}</span>
      </li>
      <li>
        就诊医院：<span>{{ docInfo?.param.hosname }}</span>
      </li>
      <li>
        就诊科室：<span>{{ docInfo?.param.depname }}</span>
      </li>
      <li>
        医生姓名：<span>{{ docInfo?.docname }}</span>
      </li>
      <li>
        医生职称：<span>{{ docInfo?.title }}</span>
      </li>
      <li>
        医专专长：<span>{{ docInfo?.skill }}</span>
      </li>
      <li>
        医生服务费：<span>{{ docInfo?.amount }}</span>
      </li>
    </ul>

    <div class="sub-title">用户信息</div>
    <ul class="info">
      <li>就诊人信息 <span></span></li>
    </ul>

    <div class="button">
      <el-button type="primary">确认挂号 </el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.register-confirm {
  color: $light-color;
  & > h1 {
    @include font($dark-color, 16px, 700);
    padding: 30px 0 0 0;
  }
  .add {
    margin-left: 40px;
    margin-bottom: 60px;
    width: 120px;
    height: 80px;
    // background-color: red;
    cursor: pointer;
    color: $active-color;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.04);
    &:hover {
      box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.1);
    }
  }
  .sub-title {
    margin: 80px 0 20px 0;
    display: flex;
    align-items: center;
    height: 20px;

    &:before {
      content: "";
      width: 4px;
      height: 20px;
      background-color: $active-color;
      margin-right: 10px;
      border-radius: 2px;
    }
  }

  .info {
    padding-left: 150px;
    & > li {
      margin-bottom: 30px;
      span {
        color: $dark-color;
        margin-left: 10px;
      }
    }
  }

  .button {
    display: flex;
    padding: 120px 0;
    .el-button {
      width: 140px;
      height: 44px;
      margin: 0 auto;

      // line-height: 44px;
    }
  }
}
</style>

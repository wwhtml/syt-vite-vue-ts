<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import { getAllPatient } from "@/api/user/index";
import type { PatientInfo } from "@/api/user/types";

const router = useRouter();

//获取就诊人，如果存在就渲染到页面，不存在就空着
const patientInfo = ref<PatientInfo[]>();

const getPatientInfoArr = async () => {
  const res: ResData<PatientInfo[]> = await getAllPatient();
  if (res.code == 200) {
    patientInfo.value = res.data;
  }
  console.log(`output->res`, res);
};

getPatientInfoArr();

//添加就诊人的时候，先验证是否已经认证，如果没有认证，提示框（认证 or 跳过），可以跳过，也可以跳转的认证页面
</script>

<template>
  <div class="patient">
    <h1 class="title">就诊人管理</h1>
    <ul>
      <li>注册账号最多可以同时绑定四个就诊人</li>
      <li>注册账号每自然年内，最多可以绑定八位就诊人</li>
      <li>同一手机号，最多同时可以被八位就诊人作为联系电话</li>
    </ul>

    <div class="patient-card" v-for="item in patientInfo" :key="item.id">
      <el-card class="mt-40">
        <template #header>
          <div class="card-header">
            <div class="left">
              <span>{{ item.name }}</span>
              <span>{{ item.certificatesNo }}</span>
            </div>
            <div
              class="right"
              style="cursor: pointer"
              @click="router.push(`/user/patient/detail/${item.id}`)"
            >
              <span class="mr-5">查看详情</span>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-arrow-right"></use>
              </svg>
            </div>
          </div>
        </template>
        <div class="content">
          <div class="card-blue">
            <p class="btn">
              <span>{{ item.isInsure }}</span>
            </p>
            <p>{{ item.certificatesType }}</p>
            <p>{{ item.certificatesNo }}</p>
          </div>
        </div>
      </el-card>
    </div>

    <div class="add-btn" @click="router.push(`/user/patient/add`)">
      <span> + 添加就诊人</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.patient {
  .title {
    margin-bottom: 30px;
  }

  ul {
    padding-left: 30px;
    li {
      font-size: 16px;
      margin-bottom: 10px;
      list-style-type: decimal;
    }
  }

  .patient-card {
    padding: 0 60px;
    .el-card__header {
      .card-header {
        display: flex;
        justify-content: space-between;
        .left {
          display: flex;
          span {
            margin-right: 20px;
          }
        }
      }
    }
    .el-card__body {
      .content {
        display: flex;
        .card-blue {
          color: #fff;
          display: flex;
          padding: 10px;
          background-color: #89c4ed;
          align-items: center;
          border-radius: 8px;
          width: 44%;
          p {
            margin-right: 20px;
            flex-shrink: 0;
            &.btn {
              padding: 3px 5px;
              border-radius: 3px;
              background-color: #fff;
              color: #89c4ed;
              font-size: 12px;
            }
          }
        }
      }
    }
  }
  .add-btn {
    margin: 0 60px;

    margin-top: 30px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    // padding-left: 120px;
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.04);
    transition: all 0.5s ease;
    &:hover {
      box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.1);
    }
    cursor: pointer;

    span {
      color: $active-color;
      font-size: 16px;
    }
  }
}
</style>

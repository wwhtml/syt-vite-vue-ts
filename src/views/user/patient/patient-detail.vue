<script lang="ts" setup>
// 注意：script标签内容不能为空，如果这里的内容是空就不会编译

import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import { getPatientDetail } from "@/api/user/index";
import type { PatientInfo } from "@/api/user/types";

const route = useRoute();

const pid = computed(() => route.params.id);

const patientDetail = ref<PatientInfo>();
const getData = async () => {
  const res: ResData<PatientInfo> = await getPatientDetail(pid.value);
  console.log(`output->res`, res);
  if (res.code == 200) {
    patientDetail.value = res.data;
  } else {
    console.log(`output->error`, "error");
  }
};
getData();
</script>

<template>
  <div class="patient-detail">
    <div class="title">就诊人详情</div>
    <p class="sub-title">
      <span>就诊人信息</span>
    </p>

    <div class="form-container">
      <el-form>
        <el-form-item label="姓名">
          <span>{{ patientDetail?.name }}</span>
        </el-form-item>
        <el-form-item label="证件类型">
          <span>{{ patientDetail?.certificatesType }}</span>
        </el-form-item>
        <el-form-item label="证件号码">
          <span>{{ patientDetail?.certificatesNo }}</span>
        </el-form-item>
        <el-form-item label="性别">
          <span>{{ patientDetail?.sex }}</span>
        </el-form-item>
        <el-form-item label="出生日期">
          <span>{{ patientDetail?.birthdate }}</span>
        </el-form-item>
        <el-form-item label="手机号码">
          <span>{{ patientDetail?.phone }}</span>
        </el-form-item>
        <el-form-item label="婚姻状况">
          <span>{{ patientDetail?.isMarry }}</span>
        </el-form-item>
        <el-form-item label="当前住址">
          <span>{{ patientDetail?.provinceCode }}</span>
        </el-form-item>
        <el-form-item label="详细地址">
          <span>{{ patientDetail?.address }}</span>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sub-title {
  margin-top: 60px;
  display: flex;
  margin-bottom: 30px;
  letter-spacing: 1px;

  &:before {
    content: "";
    width: 5px;
    background-color: $active-color;
    margin-right: 10px;
    border-radius: 5px;
  }
}
.form-container {
  padding-left: 120px;
}
</style>

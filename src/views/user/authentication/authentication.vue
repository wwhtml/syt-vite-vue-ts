<script lang="ts" setup>
//vue
import { ref, reactive } from "vue";

//api
import { getUserInfo, getCertationTypes } from "@/api/user/index";
import type { UserInfoData, CertificateData } from "@/api/user/types";

import imageUrl from "../../../assets/images/auth_example.png";

//获取认证信息(获取用户信息)
const userInfo = ref<UserInfoData>();
//
const certificatesTypes = ref<CertificateData[]>();

const getUserInfoData = async () => {
  try {
    const res: ResData<UserInfoData> = await getUserInfo();
    userInfo.value = res.data;
  } catch (error) {
    console.log(`output->error`, error);
  }
};
getUserInfoData();

const getCertificatesTypes = async () => {
  try {
    const res: ResData<CertificateData[]> = await getCertationTypes();
    console.log(res);
    certificatesTypes.value = res.data;
  } catch (error) {
    console.log(`output->error`, error);
  }
};
getCertificatesTypes();

//2.如果没有验证信息，输入验证信息，并提交
const userParams = reactive({
  certificatesNo: "", //证件号码
  certificatesType: "", //证件类型
  certificatesUrl: "", //证件图片地址
  name: ""
});
</script>

<template>
  <div class="authentication">
    <div class="header">实名认证</div>
    <div class="status-bar">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-jinggao2"></use>
      </svg>
      <span v-if="userInfo?.authStatus == 0">未认证1</span>
      <span v-if="userInfo?.authStatus == 1">已认证</span>
    </div>
    <div class="tips">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-jinggao"></use>
      </svg>
      <span>
        完成实名认证后才能添加就诊人，正常进行挂号，为了不影响后续步骤，建议提前实名认证。</span
      >
    </div>

    <div class="form-wrapper">
      <div>
        <el-form label-width="100px" :model="userParams" ref="formRef">
          <el-form-item label="姓名：">
            <el-input
              size="large"
              placeholder="请输入您的姓名"
              v-model="userParams.name"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="证件类型：">
            <el-select
              style="width: 100%"
              size="large"
              placeholder="请选择证件类型"
              v-model="userParams.certificatesType"
              clearable
            >
              <!-- <ElOption value="1"></ElOption>
              <ElOption value="2"></ElOption> -->
              <el-option
                :label="item.name"
                :value="item?.value"
                v-for="(item, index) in certificatesTypes"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码：">
            <el-input
              size="large"
              placeholder="请输入证件号码"
              v-model="userParams.certificatesNo"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="上传证件">
            <div class="upload-wrapper">
              <el-upload
                class="avatar-uploader mr-30"
                action="/api/oss/file/fileUpload?fileHost=userAuah"
                :show-file-list="false"
              >
                <!-- <img v-if="imageUrl" style="width: 100%; height: 100%" :src="imageUrl" alt="" /> -->
                <el-icon class="avatar-uploader-icon mr-10"><Plus /></el-icon>
                <div>添加证件</div>
              </el-upload>

              <div class="demo">
                <img style="width: 100%; height: 100%" :src="imageUrl" alt="" />
              </div>
            </div>
          </el-form-item>
        </el-form>

        <div class="bottom">
          <ElButton type="primary">提交</ElButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.authentication {
  padding: 38px 0;
  .header {
    @include font($dark-color, 16px, 700);
    letter-spacing: 1px;
  }
  .status-bar {
    margin-top: 20px;
    height: 80px;
    background-color: $bg-light-blue;
    display: flex;
    align-items: center;
    font-weight: 400;
    letter-spacing: 2px;

    color: $active-color;
    .icon {
      font-size: 26px;
      margin: 0 20px;
    }
  }
  .tips {
    @include font($light-color, 12px, 400);
    // text-align: center;
    margin: 40px 0;
    padding-left: 140px;

    .iconfont.icon-jinggao {
      margin-right: 5px;
      font-size: 12px;
    }
  }
  .form-wrapper {
    margin-left: 140px;
    width: 480px;

    :deep(.el-form) {
      .el-form-item {
        align-items: center;
        .el-form-item__label {
          justify-content: flex-start;
          height: 40px;
          line-height: 40px;
          color: $light-color;
        }

        .upload-wrapper {
          display: flex;
          .avatar-uploader {
            // margin-right: 30px;
            width: 160px;
            height: 125px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid $active-color;
            color: $active-color;
          }
        }
      }
    }

    .bottom {
      margin-top: 60px;
      display: flex;
      justify-content: center;
      .el-button {
        width: 140px;
        height: 44px;
        font-size: 16px;
      }
    }
  }
}
</style>

<script lang="ts" setup>
import { reactive, ref } from "vue";

import { getUserInfo, postUserCertation } from "@/api/user/index";
import type { UserInfoData, CertificateData, RuleForm } from "@/api/user/types";

import type { FormInstance, FormRules } from "element-plus";

const formRef = ref<FormInstance>();

//获取用户信息
const userInfo = ref<UserInfoData>();

const getUserInfoData = async () => {
  try {
    const res: ResData<UserInfoData> = await getUserInfo();
    userInfo.value = res.data;
  } catch (error) {
    console.log(`output->error`, error);
  }
};
getUserInfoData();

//提交的数据数据
const formData = reactive<RuleForm>({
  certificatesNo: "",
  certificatesType: "",
  certificatesUrl: "",
  name: ""
});

//规则
const rules = reactive<FormRules<RuleForm>>({
  name: [{ required: true, message: "请输入真实姓名", trigger: "change" }],
  certificatesType: [{ required: true, message: "请选择证件类型", trigger: "change" }],
  certificatesNo: [{ required: true, message: "请输入证件号码", trigger: "change" }]
});

//数据提交
const postData = async () => {
  try {
    const res: ResData<CertificateData> = await postUserCertation(formData);
    console.log(`output->res`, res);
  } catch (error) {
    console.log(`output->error`, error);
  }
};

//提交数据
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  console.log(`output->formEl`, formEl);

  await formEl.validate((valid) => {
    if (valid) {
      //没有报错信息
      // console.log("submit!");
      postData();
    } else {
      //存在报错信息
      // console.log("error submit!", fields);
    }
  });
};
//重置数据
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

//获取某一个错误信息
const nameFormItem = ref();
const typeFormItem = ref();
const numberFormItem = ref();

const focusResetField = (itemForm: any) => {
  if (!itemForm) return;
  itemForm.resetField();
};
</script>

<template>
  <div class="authentication">
    <div class="title">实名认证</div>
    <div class="status-bar">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-jinggao2"></use>
      </svg>
      <span>{{ userInfo?.authStatus == 1 ? "已认证" : "未认证" }}</span>
    </div>
    <div class="tips">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-jinggao"></use>
      </svg>
      <span>
        完成实名认证后才能添加就诊人，正常进行挂号，为了不影响后续步骤，建议提前实名认证。</span
      >
    </div>
    <div class="form-container">
      <el-form
        ref="formRef"
        style="max-width: 440px"
        size="large"
        label-position="left"
        label-width="100px"
        hide-required-asterisk
        :model="formData"
        :rules="rules"
      >
        <el-form-item prop="name" label="姓名：" ref="nameFormItem">
          <el-input
            class="v-input"
            v-model="formData.name"
            placeholder="请输入真实姓名"
            clearable
            @focus="focusResetField(nameFormItem)"
          ></el-input>
        </el-form-item>

        <el-form-item prop="certificatesType" label="证件类型：" ref="typeFormItem">
          <el-select
            class="v-select"
            v-model="formData.certificatesType"
            style="width: 100%"
            placeholder="请选择证件类型"
            clearable
            @focus="focusResetField(typeFormItem)"
          >
            <el-option label="身份证" :value="0" />
            <el-option label="居住证" :value="1" />
          </el-select>
        </el-form-item>
        <el-form-item prop="certificatesNo" label="证件号码： " ref="numberFormItem">
          <el-input
            class="v-input"
            v-model="formData.certificatesNo"
            placeholder="请输入证件号码"
            clearable
            @focus="focusResetField(numberFormItem)"
          ></el-input>
        </el-form-item>

        <!--    <el-form-item props="props.name" label="上传证件">
          <el-input v-model="formData.name" placeholder="请输入真实姓名"></el-input>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="submitForm(formRef)"> Create </el-button>
          <el-button @click="resetForm(formRef)">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.authentication {
  .title {
    color: $dark-color;
  }
  .status-bar {
    margin-top: 20px;
    padding-left: 20px;
    height: 80px;
    width: 100%;
    background-color: $bg-status-bar;
    color: $active-color;
    display: flex;
    align-items: center;

    .icon {
      font-size: 30px;
      margin-right: 15px;
    }
    span {
      font-size: 16px;
      font-weight: 700;
    }
  }
  .tips {
    .icon {
      margin-right: 3px;
    }
    margin: 40px 0;
    font-size: 12px;
    color: $light-color;
    padding-left: 140px;
  }
  .form-container {
    padding-left: 140px;
  }
}
</style>

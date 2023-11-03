<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";

const formRef = ref<FormInstance>();

interface RuleForm {
  name: string;
  type?: number;
  idNumber: string;
}

const formData = reactive<RuleForm>({
  name: "",
  type: undefined,
  idNumber: ""
});

const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: "Please input Activity name", trigger: "blur" },
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" }
  ],
  idNumber: [
    { required: false, message: "Please input Activity name", trigger: "blur" },
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" }
  ]
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<template>
  <div class="authentication">
    <div class="title">实名认证</div>
    <div class="status-bar">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-jinggao2"></use>
      </svg>
      <span>{{ false ? "已认证" : "未认证" }}</span>
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
        <el-form-item prop="name" label="姓名：">
          <el-input v-model="formData.name" placeholder="请输入真实姓名" clearable></el-input>
        </el-form-item>
        <el-form-item prop="type" label="证件类型：">
          <el-select
            v-model="formData.type"
            style="width: 100%"
            placeholder="请选择证件类型"
            clearable
          >
            <el-option label="身份证" :value="0" />
            <el-option label="居住证" :value="1" />
          </el-select>
        </el-form-item>
        <el-form-item props="idNumber" label="证件号码：">
          <el-input v-model="formData.idNumber" placeholder="请输入证件号码" clearable></el-input>
        </el-form-item>
        <!-- <el-form-item props="props.name" label="上传证件">
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

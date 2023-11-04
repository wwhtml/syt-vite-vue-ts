<script lang="ts" setup></script>

<template>
  <div class="patient-add">
    <h1 class="title">添加就诊人</h1>
    <p class="sub-title">
      <span>就诊人信息</span>
    </p>
    <div class="patient-info">
      <el-form label-width="100px" label-position="left" size="large" style="max-width: 440px">
        <el-form-item label="姓名：">
          <el-input class="v-input" placeholder="请输入真实姓名" />
        </el-form-item>
        <el-form-item label="证件类型：">
          <el-select class="v-select" placeholder="请选择证件类型" style="width: 100%">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码：">
          <el-input class="v-input" placeholder="请输入证件号码" />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.patient-add {
  .title {
    margin-bottom: 40px;
  }
  .sub-title {
    display: flex;
    margin-bottom: 30px;

    &:before {
      content: "";
      width: 5px;
      background-color: $active-color;
      margin-right: 10px;
      border-radius: 5px;
    }
  }

  .patient-info {
    // width: 500px;
    margin-left: 120px;
  }
}
</style>

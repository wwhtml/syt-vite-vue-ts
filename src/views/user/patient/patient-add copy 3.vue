<template>
  <div class="patient-add">
    <h1 class="title">添加就诊人</h1>
  </div>
</template>

<style scoped lang="scss">
.patient-add {
  .title {
    // margin-bottom: 40px;
  }
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

  .patient-info {
    // width: 500px;
    margin-left: 120px;
    :deep(.el-form) {
      .el-form-item {
        .el-form-item__label {
          color: $light-color;
        }
      }
    }
  }
}
</style>

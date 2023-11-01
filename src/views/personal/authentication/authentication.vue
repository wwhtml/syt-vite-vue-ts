<script lang="ts" setup>
// 注意：script标签内容不能为空，如果这里的内容是空就不会编译
</script>

<template>
  <div class="authentication">
    <div class="header">实名认证</div>
    <div class="status-bar">
      <i class="iconfont icon-search"></i>
      <span>未认证</span>
    </div>
    <div class="tips">
      <i class="iconfont icon-jinggao"></i>
      <span>
        完成实名认证后才能添加就诊人，正常进行挂号，为了不影响后续步骤，建议提前实名认证。</span
      >
    </div>

    <div class="form-wrapper">
      <div>
        <el-form label-width="100px">
          <el-form-item label="姓名：">
            <el-input style="height: 40px"></el-input>
          </el-form-item>
          <el-form-item label="身份证号：">
            <el-input style="height: 40px"></el-input>
          </el-form-item>
        </el-form>

        <div class="bottom">
          <el-button type="primary">提交</el-button>
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
    font-weight: 700;

    color: $active-color;
    .iconfont.icon-search {
      font-size: 20px;
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

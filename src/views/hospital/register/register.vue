<script lang="ts" setup>
// 注意：script标签内容不能为空，如果这里的内容是空就不会编译
</script>

<template>
  <div class="register">
    <div class="header">
      <div class="title">
        <h2>北京大学国际医院</h2>
        <p>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-dengji"></use>
          </svg>
          <span>二级乙等</span>
        </p>
      </div>
      <div class="section">
        <div class="hos-logo">
          <img src="../../../assets/images/hos_logo.png" alt="" />
        </div>
        <div class="rules">
          <div class="rule">
            <p>挂号规则</p>
            <ul>
              <li><span class="light">预约周期</span><span>8天</span></li>
              <li><span class="light">放号时间</span><span>18:00</span></li>
              <li><span class="light">停挂时间</span><span>18:00</span></li>
              <li><span class="light">退号时间</span><span>就诊前一工作日15:30前取消</span></li>
            </ul>
          </div>
          <div class="rule">
            <p>医院预约规则</p>
            <ul>
              <li>
                <span class="light">西院区预约号取号地点：西院区门诊楼一层大厅挂号窗口取号</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.register {
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
      }
      .rules {
        width: 640px;
        .rule {
          margin-bottom: 20px;
          p {
            @include font($dark-color, 16px, 400);
          }
          & > ul {
            display: flex;
            flex-wrap: wrap;
            li {
              @include font($dark-color, 12px, 400);
              margin-right: 50px;
              margin-top: 10px;
              .light {
                color: $light-color;
                margin-right: 10px;
              }
            }
          }
        }
      }
    }
  }
}
</style>

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

    <div class="main">
      <el-affix :offset="70">
        <div class="title">选择科室</div>
      </el-affix>
      <div class="dep">
        <div class="left">
          <el-affix :offset="150">
            <el-scrollbar height="460px">
              <ul class="menu">
                <li class="menu-item" v-for="item in 100" :key="item">
                  <span>专科{{ item }}</span>
                </li>
              </ul>
            </el-scrollbar>
          </el-affix>
        </div>
        <div class="right">
          <div class="dep-group">
            <div class="dep-title">
              <span>专科</span>
            </div>
            <ul>
              <li v-for="item in 10" :key="item">
                <span class="v-link">多发性硬化专科门诊 {{ item }}</span>
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
            letter-spacing: 1px;
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

  .main {
    margin-top: 10px;
    .title {
      padding: 40px 0 20px 0;
      background-color: #fff;
    }

    .dep {
      min-height: 1000px;

      display: flex;

      .left {
        flex-shrink: 0;
        width: 170px;

        .menu {
          padding: 10px 0;
          background-color: $bg-menu-color;
          .menu-item {
            padding: 10px;
            text-align: center;
            color: $dark-color;
            cursor: pointer;
            transition: all 0.5s ease;
            &:hover {
              background-color: #fff;
            }
            &.active {
              background-color: #fff;
              font-weight: 700;
            }
          }
        }
      }
      .right {
        flex: 1;
        background-color: aqua;
        margin-left: 30px;
        // padding: 20px;
        .dep-group {
          padding: 20px;

          &.active {
            background-color: $bg-menu-group-color;
          }
          .dep-title {
            font-weight: 700;
            color: $dark-color;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            &:before {
              content: "";
              height: 14px;
              width: 4px;
              background-color: $active-color;
              border-radius: 2px;
              margin-right: 5px;
              margin-bottom: -1px;
            }
          }
          ul {
            display: flex;
            flex-wrap: wrap;
            li {
              flex-shrink: 0;
              margin-top: 15px;
              width: 33%;
            }
          }
        }
      }
    }
  }
}
</style>

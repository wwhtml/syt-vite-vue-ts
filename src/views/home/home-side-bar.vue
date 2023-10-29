<script lang="ts" setup>
// 注意：script标签内容不能为空，如果这里的内容是空就不会编译
</script>

<template>
  <div class="hos-side-bar">
    <div class="tips">
      <div class="header">
        <div class="title">核酸检测</div>
        <p class="more">
          <span>全部</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-arrow-right"></use>
          </svg>
        </p>
      </div>
      <ul>
        <li><span class="v-link dark">北京大学第一医院</span></li>
        <li><span class="v-link dark">北京大学第一医院</span></li>
        <li><span class="v-link dark">北京大学第一医院</span></li>
        <li><span class="v-link dark">北京大学第一医院</span></li>
      </ul>
    </div>
    <div class="tips">
      <div class="header">
        <div class="title">常见科室</div>
        <p class="more">
          <span>全部</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-arrow-right"></use>
          </svg>
        </p>
      </div>
      <ul class="flex-wrap">
        <li><span class="v-link dark"> 神经内科111111111 </span></li>
        <li><span class="v-link dark">消化内科</span></li>
        <li><span class="v-link dark">呼吸内科</span></li>
        <li><span class="v-link dark">内科</span></li>
        <li><span class="v-link dark">妇科</span></li>
        <li><span class="v-link dark">消化内科</span></li>
        <li><span class="v-link dark">呼吸内科</span></li>
        <li><span class="v-link dark">内科内科内科内科</span></li>
      </ul>
    </div>

    <div class="tips notice platform">
      <div class="header">
        <div class="title">
          <div class="notice-icon">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-trumpet"></use>
            </svg>
          </div>
          平台公告
        </div>
        <p class="more">
          <span>全部</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-arrow-right"></use>
          </svg>
        </p>
      </div>
      <ul>
        <li>
          <span class="v-link dark"> 北京市预约挂号统一平台账号管理优化细则 </span>
        </li>
        <li><span class="v-link dark"> 北京市预约挂号统一平台账号管理优化细则 </span></li>
        <li><span class="v-link dark"> 北京市预约挂号统一平台账号管理优化细则 </span></li>
        <li><span class="v-link dark"> 北京市预约挂号统一平台账号管理优化细则 </span></li>
        <li><span class="v-link dark"> 北京市预约挂号统一平台账号管理优化细则 </span></li>
      </ul>
    </div>

    <div class="tips notice stop">
      <div class="header">
        <div class="title">
          <div class="notice-icon">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-notice"></use>
            </svg>
          </div>
          平台公告
        </div>
        <p class="more">
          <span>全部</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-arrow-right"></use>
          </svg>
        </p>
      </div>
      <ul>
        <li>
          <span class="v-link dark"> 北京市预约挂号统一平台账号管理优化细则 </span>
        </li>
        <li><span class="v-link dark"> 北京市预约挂号统一平台账号管理优化细则 </span></li>
        <li><span class="v-link dark"> 北京市预约挂号统一平台账号管理优化细则 </span></li>
        <li><span class="v-link dark"> 北京市预约挂号统一平台账号管理优化细则 </span></li>
        <li><span class="v-link dark"> 北京市预约挂号统一平台账号管理优化细则 </span></li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hos-side-bar {
  position: sticky;
  top: 20px;
  .tips {
    margin-bottom: 40px;
    .header {
      margin-bottom: 20px;

      display: flex;
      justify-content: space-between;
      align-items: center;

      .title {
        display: flex;
        align-items: center;
      }

      .more {
        font-size: 14px;
        color: $light-color;
        cursor: pointer;
        .icon {
          margin-left: 5px;
        }
      }
    }

    ul {
      padding-left: 10px;
      li {
        margin-bottom: 15px;
        @include ellipsis-1;
      }

      &.flex-wrap {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        li {
          width: 40%;
        }
      }
    }

    &.notice {
      .notice-icon {
        margin-right: 10px;
        height: 40px;
        width: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        background-color: #f2f8ff;
        color: $active-color;
      }

      ul {
        li {
          position: relative;
          padding-left: 15px;
          &:before {
            content: "";
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background-color: $active-color;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }

      &.stop {
        .notice-icon {
          background: #fffaf1;
          color: #ffaa51;
        }
        ul li {
          &:before {
            background-color: #ffaa51;
          }
          span {
            &:hover {
              color: #ffaa51;
            }
          }
        }
      }
    }
  }
}
</style>

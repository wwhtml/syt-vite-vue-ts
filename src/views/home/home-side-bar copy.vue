<script lang="ts" setup>
// 注意：script标签内容不能为空，如果这里的内容是空就不会编译
</script>

<template>
  <div class="home-side-bar">
    <div class="side-item-wrap">
      <div class="header">
        <div class="title">核酸检测</div>
        <p class="more">
          <span>全部</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-arrow"></use>
          </svg>
        </p>
      </div>
      <ul class="content">
        <li><span> 北京大学第三医院 </span></li>
        <li><span> 北京大学第三医院 </span></li>
        <li><span> 北京大学第三医院 </span></li>
      </ul>
    </div>

    <div class="side-item-wrap">
      <div class="header">
        <div class="title">科室</div>
        <p class="more">
          <span>全部</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-arrow"></use>
          </svg>
        </p>
      </div>
      <ul class="content jusi">
        <li><span> 神经内科 </span></li>
        <li><span> 神经内科 </span></li>
        <li><span> 内科 </span></li>
        <li><span> 神经内科 </span></li>

        <li><span> 神经内科 </span></li>
        <li><span> 内科 </span></li>
        <li><span> 内科 </span></li>
        <li><span> 神经内科 </span></li>
        <li><span> 内科 </span></li>
        <li><span> 神经内科 </span></li>
      </ul>
    </div>

    <div class="side-item-wrap">
      <div class="header">
        <div class="title">
          <span class="iconfont icon-gonggao mr-10">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-trumpet"></use>
            </svg>
          </span>

          <span>平台公告</span>
        </div>
        <p class="more">
          <span>全部</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-arrow"></use>
          </svg>
        </p>
      </div>
      <ul class="content point">
        <li><span> 10月13日升级公告 </span></li>
        <li><span> 北京大学第三医院 </span></li>
        <li><span> 北京大学第三医院 </span></li>
      </ul>
    </div>

    <div class="side-item-wrap">
      <div class="header">
        <div class="title">
          <span class="iconfont icon-gonggao1 mr-10">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-notice"></use>
            </svg>
          </span>

          <span>停诊公告</span>
        </div>
        <p class="more">
          <span>全部</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-arrow"></use>
          </svg>
        </p>
      </div>
      <ul class="content point">
        <li>
          <span class="ellipsis">
            解放军总医院京东医疗区(原解放军第二六三医院)风湿免疫专家停诊公告
          </span>
        </li>
        <li><span class="ellipsis"> 北京华医中西医结合皮肤病医院胎记专科停诊公告 </span></li>
        <li><span class="ellipsis"> 北京华医中西医结合皮肤病医院医疗美容科停诊公告 </span></li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-side-bar {
  position: sticky;
  top: 20px;
}
.side-item-wrap {
  color: $dark-color;
  margin-bottom: 30px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    .title {
      display: flex;
      align-items: center;
      .iconfont.icon-gonggao {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 20px;
        color: $active-light-color;
        background-color: #f2f8ff;
        font-size: 20px;
        font-weight: 300;
      }
      .iconfont.icon-gonggao1 {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 20px;
        color: #ffaa51;
        background: #fffaf1;
        font-weight: 300;
        font-size: 18px;
      }
    }
    .more {
      cursor: pointer;
      display: flex;
      align-items: center;
      color: red;
      span {
        font-size: 14px;
        margin-right: 5px;
      }
    }
  }

  .content {
    padding-left: 10px;
    li {
      padding-bottom: 16px;
      cursor: pointer;
      span {
        transition: all 0.3s ease;
        letter-spacing: 1px;
        &:hover {
          color: $active-color;
        }
      }
    }

    &.jusi {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li {
        width: 50%;
      }
    }

    &.point {
      // position: relative;
      & > li {
        display: flex;
        align-items: center;
      }
      & > li:before {
        content: "";
        height: 5px;
        width: 5px;
        border-radius: 50%;
        background-color: $active-color;
        margin-right: 10px;
        flex-shrink: 0;
      }
    }
  }
}
</style>

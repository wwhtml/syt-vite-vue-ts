<script lang="ts" setup>
//vue
import { ref, computed, onUpdated, inject, watch } from "vue";
//vue-router
import { useRoute } from "vue-router";

import { getHospitalDetail, getHospitalDeparment } from "@/api/hospital/index";
import type { HosDetail, Hospital, BookingRule, Department } from "@/api/hospital/types";

const hospitalAttr = inject("hospitalAttr");

//
const route = useRoute();

//获取参数
const hoscode = computed((): string => {
  return route.params.hoscode as string;
});

//获取数据
//获取数据
const bookingRule = ref<BookingRule | null>(null);
const hospital = ref<Hospital | null>(null);

const getHosDetail = async () => {
  const res: ResData<HosDetail> = await getHospitalDetail(hoscode.value);
  if (res.code == 200 && res.data) {
    bookingRule.value = res.data.bookingRule;
    hospital.value = res.data.hospital;
  }
};
getHosDetail();

//获取department数据
const depArr = ref<Department[]>([]);
const currentMenu = ref();

const getHosDeparment = async () => {
  const res: ResData<Department[]> = await getHospitalDeparment(hoscode.value);
  if (res.code == 200) {
    console.log(`output->res`, res);

    const data = res.data;
    //这里之所以删除最后一项，目的是为了完善点击menu，page滚动工能
    data.pop();
    depArr.value = data;
    currentMenu.value = data[0];
  }
};
getHosDeparment();

//获取右侧每一组科室距离顶部的距离组成的数据
//数组
const offsetTopArr = ref<number[]>([]);

//dom集合
const depGroupRef = ref([]);

const getOffsetTop = () => {
  //注意这个函数只能执行一次，所以不能放到 onUpdated 中,除非每次都清空
  // console.log(menuGroupRef.value);
  offsetTopArr.value = [];
  depGroupRef.value.map((item: HTMLDivElement) => {
    offsetTopArr.value.push(item.offsetTop - 80);
  });
};

onUpdated(() => {
  // console.log("onUpdated");
  getOffsetTop(); //如果每次修改dom，都调用这个函数会不会有些耗费性能？？？？
  //每次更新，都触发这个函数，也就是多次遍历，bug  ，可以每次清空
});

//选中menu
const selectMenu = (menu: any, index: any) => {
  currentMenu.value = menu;
  //调整父组件的scrollTop
  // @ts-ignore
  hospitalAttr?.pageScrollTo(offsetTopArr.value[index]);
};

//通过滚动的距离控制 currentMenu的值
watch(
  //@ts-ignore
  () => hospitalAttr.pageScrollTop,
  (newValue) => {
    if (newValue > offsetTopArr.value[0]) {
      currentMenu.value = depArr.value[0];
    }
    offsetTopArr.value.map((item, index) => {
      if (newValue > item - 120) {
        currentMenu.value = depArr.value[index];
      }
    });
  }
);
</script>

<template>
  <div class="register">
    <div class="header">
      <div class="title">
        <h2>{{ hospital?.hosname }}</h2>
        <p>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-dengji"></use>
          </svg>
          <span>{{ hospital?.param.hostypeString }}</span>
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
              <li>
                <span class="light">预约周期</span><span>{{ bookingRule?.cycle }} 天</span>
              </li>
              <li>
                <span class="light">放号时间</span><span>{{ bookingRule?.releaseTime }}</span>
              </li>
              <li>
                <span class="light">停挂时间</span><span>{{ bookingRule?.stopTime }}</span>
              </li>
              <li>
                <span class="light">退号时间</span
                ><span>就诊前一工作日 {{ bookingRule?.quitTime }} 前取消</span>
              </li>
            </ul>
          </div>
          <div class="rule">
            <p>医院预约规则</p>
            <ul>
              <li v-for="(item, index) in bookingRule?.rule" :key="index">
                <span class="light">{{ item }}</span>
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
                <li
                  class="menu-item"
                  :class="{ active: currentMenu === item }"
                  v-for="(item, index) in depArr"
                  :key="index"
                  @click="selectMenu(item, index)"
                >
                  <span>{{ item.depname }}</span>
                </li>
              </ul>
            </el-scrollbar>
          </el-affix>
        </div>
        <div class="right">
          <div
            ref="depGroupRef"
            class="dep-group"
            v-for="(item, index) in depArr"
            :key="index"
            :class="{ active: currentMenu == item }"
          >
            <div class="dep-title">
              <span>{{ item.depname }}</span>
            </div>
            <ul>
              <li v-for="(depChild, index) in item.children" :key="index">
                <span class="v-link">{{ depChild.depname }}</span>
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
        // background-color: aqua;
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

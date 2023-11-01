<script lang="ts" setup>
// 注意：script标签内容不能为空，如果这里的内容是空就不会编译
import { ref, reactive, watch, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

//api
import { getHospitalWork, getHospitalDoctor } from "@/api/hospital/index";

const router = useRouter();
const route = useRoute();
console.log(route);
console.log(router);

//声明数据
//工作日
const workData = ref();
//当前工作日
const currentWorkData = ref();
//值班医生
const workDoctor = ref();
//
const pageNumber = ref<number>(1);
const limit = ref<number>(7);
const hoscode = ref();
const depcode = ref();

//获取挂号的数据
const getWorkData = async () => {
  let res = await getHospitalWork(
    pageNumber.value,
    limit.value,
    route.params.hoscode as string,
    route.params.cdepcode as string
  );
  if (res.code == 200) {
    workData.value = res.data;
    //存储第一天日期的数据
    currentWorkData.value = workData.value.bookingScheduleList[0];
    //获取一次医生的数据
    getDoctorWorkData();
  }
};

//获取某一天医生排班的数据
const getDoctorWorkData = async () => {
  //获取排班医生的数据
  let res = await getHospitalDoctor(
    route.params.hoscode as string,
    route.params.cdepcode as string,
    currentWorkData.value.workDate
  );
  if (res.code == 200) {
    workDoctor.value = res.data;
  }
};

onMounted(() => {
  getWorkData();
});

//
//点击顶部某一天的时候触发回调
const changeCurrentWorkData = (item: any) => {
  //存储用户选择那一天的数据
  currentWorkData.value = item;
  //再发一次获取医生排班的数据
  getDoctorWorkData();
};

//通过页码切换数据
const handleCurrentChange = (value: any) => {
  pageNumber.value = value;
  getWorkData();
};

//计算出上午排班的医生数据
const moringArr = computed(() => {
  return workDoctor.value.filter((doc: any) => {
    return doc.workTime == 0;
  });
});
//计算出下午排班的医生的数据
const afterArr = computed(() => {
  return workDoctor.value.filter((doc: any) => {
    return doc.workTime == 1;
  });
});

const goHospital = () => {
  router.push(`/hospital/${route.params.hoscode}/register`);
};

//点击剩余号按钮 跳转到订单页面， 如果没有认证跳转值认证页面

const confirm = (id: any) => {
  console.log(1111);
  router.push(
    `/hospital/${route.params.hoscode}/${route.params.depcode}/${route.params.cdepcode}/${id}/confirm`
  );
};

// const confirm = () => {
//   console.log(111);
// };
</script>

<template>
  <div class="dep-container" v-if="workData">
    <div class="header" style="color: #666666">
      <span class="v-link" @click="goHospital">{{ workData.baseMap.hosname }}</span>
      |
      <span>{{ workData.baseMap.bigname }}</span>
    </div>
    <div class="title mt-20">{{ workData.baseMap?.depname }}</div>

    <div class="work-data">
      <div class="header">{{ workData.baseMap.workDateString }}</div>
      <div class="calender-list-wrapper">
        <!-- <div class="calendar-item current">
          <div class="top">
            <span>2023-10-14</span>
            <span class="week">周六</span>
          </div>
          <div class="bottom">停止挂号</div>
        </div> -->
        <div
          class="calendar-item clickable"
          v-for="(item, index) in workData.bookingScheduleList"
          :key="index"
          :class="{ current: item.workDate == currentWorkData.workDate }"
          @click="changeCurrentWorkData(item)"
        >
          <div class="top">
            <span>{{ item.workDate }}</span>
            <span class="week">{{ item.dayOfWeek }}</span>
          </div>
          <div class="bottom">{{ item.status == -1 ? "停止挂号" : "有号" }}</div>
        </div>
      </div>
      <el-pagination
        layout="prev, pager, next"
        :total="workData.total"
        v-model:current-page="pageNumber"
        @current-change="handleCurrentChange"
      />
    </div>

    <div class="work-doctor" v-if="workDoctor">
      <div class="header">上午号源</div>

      <div class="doc-item" v-for="(item, index) in moringArr" :key="index">
        <div class="left">
          <div class="title-wrap">
            <div class="title">{{ item.title }}</div>
            <div class="split"></div>
            <div class="docname">{{ item.docname }}</div>
          </div>
          <div class="skill">{{ item.skill }}</div>
        </div>
        <div class="right">
          <div class="price">$ {{ item.amount }}</div>
          <div class="count" @click="confirm(item.id)">剩余 {{ item.availableNumber }}</div>
        </div>
      </div>

      <div class="header">下午号源</div>

      <div class="doc-item" v-for="(item, index) in afterArr" :key="index">
        <div class="left">
          <div class="title-wrap">
            <div class="title">{{ item.title }}</div>
            <div class="split"></div>
            <div class="docname">{{ item.docname }}</div>
          </div>
          <div class="skill">{{ item.skill }}</div>
        </div>
        <div class="right">
          <div class="price">$ {{ item.amount }}</div>
          <div class="count">剩余{{ item.availableNumber }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
// .dep-container {
// background-color: aqua;
// padding: 38px 0;
// }

.work-data {
  margin-top: 30px;
  .header {
    margin-bottom: 20px;
    text-align: center;
    letter-spacing: 1px;
  }
  .calender-list-wrapper {
    display: flex;
    // justify-content: space-around;
    .calendar-item {
      width: 124px;
      border: 2px solid #e8f2ff;
      border-radius: 5px;
      margin-left: 16px;
      .top {
        color: #4990f1;
        background-color: #e8f2ff;
        font-weight: 700;
        padding: 10px 0;
        text-align: center;
        .week {
          margin-left: 10px;
          font-size: 12px;
        }
      }
      .bottom {
        padding: 10px 0;
        text-align: center;
        color: #4990f1;
      }
    }
    .calendar-item.current {
      width: 124px;
      border: 2px solid #4990f1;
      border-radius: 5px;
      .top {
        color: #fff;
        background-color: #4990f1;
        font-weight: 700;
        padding: 10px 0;
        text-align: center;
        .week {
          margin-left: 10px;
          font-size: 12px;
        }
      }
      .bottom {
        padding: 10px 0;
        text-align: center;
        color: #4990f1;
      }
    }
  }
  .el-pagination {
    // margin-top: 30px;
    margin: 30px auto 0 auto;
    justify-content: center;
  }
}

.work-doctor {
  .header {
    padding-left: 10px;
    margin: 30px 0;
    background: rgb(232 242 255 / 82%);
    height: 30px;
    border-left: 5px solid #4990f1;
    color: #999999;
    line-height: 30px;
  }
  .doc-item {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0, 0, 0, 0);
    margin-bottom: 10px;
    padding: 20px 20px;
    background-color: #e8f2ff4d;
    border-radius: 5px;
  }

  .left {
    width: 660px;

    .title-wrap {
      // margin-top: 30px;
      // font-size: 16px;
      font-weight: 700;
      display: flex;
      align-items: center;
      .split {
        border-left: 1px solid #eee;
        width: 1px;
        height: 16px;
        margin: 0 10px;
      }
    }
    .skill {
      color: #9999;
      margin-top: 30px;
      font-weight: 700;
    }
  }

  .right {
    display: flex;
    align-items: center;
    .price {
      color: #4990f1;
      font-weight: 700;
      font-size: 16px;
      margin-right: 16px;
    }
    .count {
      width: 140px;
      height: 44px;
      text-align: center;
      line-height: 44px;
      background-color: $active-color;
      color: #fff;
      font-weight: 700;
      font-size: 16px;
      border-radius: 5px;
    }
  }
}
</style>

<script lang="ts" setup>
import { ref } from "vue";

const order = ref("");

const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-02",
    name: "Tom1",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-04",
    name: "Tom2",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-01",
    name: "Tom3",
    address: "No. 189, Grove St, Los Angeles"
  }
];

const pictLoading = ref(true);

console.log(
  Object.keys({
    date: "2016-05-01",
    name: "Tom3",
    address: "No. 189, Grove St, Los Angeles"
  })
);
</script>

<template>
  <div class="order">
    <h1 class="title">挂号订单</h1>

    <el-form :inline="true" size="large">
      <el-form-item label="就诊人：" style="width: 320px">
        <el-input class="v-input" v-model="order" placeholder="就诊人"></el-input>
      </el-form-item>
      <el-form-item label="订单状态：">
        <el-input class="v-input" v-model="order" placeholder="订单状态"></el-input>
      </el-form-item>

      <el-form-item><span class="v-link fw-700 fs-16 active hover">查询</span></el-form-item>
    </el-form>

    <div class="info">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        :header-cell-class-name="() => 'table-header'"
      >
        <!-- <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" /> -->
        <el-table-column
          v-for="(item, index) in tableData"
          :prop="Object.keys(item)[index]"
          :label="Object.keys(item)[index]"
          :key="index"
        />
      </el-table>
    </div>
  </div>
</template>

<style scoped lang="scss">
.order {
  .title {
    margin-bottom: 60px;
  }

  .info {
    margin-top: 40px;
    :deep(.table-header) {
      background-color: $active-light-color;
      color: #fff;
    }
  }
}
</style>

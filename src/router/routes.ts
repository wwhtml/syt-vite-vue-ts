import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "home",
    meta: {
      title: "首页",
      isHiddenSearch: true
    },
    component: () => import("@/views/home/home.vue")
  },
  {
    path: "/hospital/:hoscode",
    name: "hospital",
    meta: {
      title: "挂号"
    },
    component: () => import("@/views/hospital/hospital.vue")
    // children: [
    //   {
    //     path: "register",
    //     name: "register",
    //     meta: {
    //       title: "预约挂号"
    //     },
    //     component: () => import("@/views/hospital/register/register.vue")
    //   },
    //   {
    //     path: "detail",
    //     name: "detail",
    //     meta: {
    //       title: "医院详情"
    //     },
    //     component: () => import("@/views/hospital/detail/detail.vue")
    //   },
    //   {
    //     path: "notice",
    //     name: "notice",
    //     meta: {
    //       title: "预约须知"
    //     },
    //     component: () => import("@/views/hospital/notice/notice.vue")
    //   }
    // ]
  }
];

export default routes;

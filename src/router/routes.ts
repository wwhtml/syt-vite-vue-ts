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
  },

  /************************************
   * 网站信息
   */
  {
    path: "/information",
    name: "information",
    component: () => import("@/views/information/information.vue"),
    redirect: "/information/contact",
    children: [
      {
        path: "contact",
        name: "contact",
        meta: {
          title: "联系我们",
          isMenu: true
        },
        component: () => import("@/views/information/contact/contact.vue")
      },
      {
        path: "cooperate",
        name: "cooperate",
        meta: {
          title: "合作伙伴",
          isMenu: true
        },
        component: () => import("@/views/information/cooperate/cooperate.vue")
      },
      {
        path: "user-agreement",
        name: "user-agreement",
        meta: {
          title: "用户协议",
          isMenu: true
        },
        component: () => import("@/views/information/user-agreement/user-agreement.vue")
      },
      {
        path: "privacy-agreement",
        name: "privacy-agreement",
        meta: {
          title: "隐私协议",
          isMenu: true
        },
        component: () => import("@/views/information/privacy-agreement/privacy-agreement.vue")
      }
    ]
  },

  /* 
  帮助中心
  */
  {
    path: "/support",
    name: "support",
    meta: {
      title: "帮助中心",
      isShowSearch: true
    },
    component: () => import("../views/support/support.vue"),
    children: [
      {
        path: "login",
        name: "login",

        meta: {
          title: "登录",
          isMenu: true
        },
        component: () => import("@/views/support/login/login.vue")
      },
      {
        path: "register",
        name: "register",

        meta: {
          title: "注册",
          isMenu: true
        },
        component: () => import("@/views/support/register/register.vue")
      }
    ]
  }
];

export default routes;

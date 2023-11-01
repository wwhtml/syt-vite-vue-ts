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

  /* 
  hospital
  */
  {
    path: "/hospital/:hoscode",
    name: "hospital",
    meta: {
      title: "挂号"
    },
    component: () => import("@/views/hospital/hospital.vue"),

    children: [
      {
        path: "register",
        name: "register",
        meta: {
          title: "预约挂号",
          isMenu: true
        },
        component: () => import("@/views/hospital/register/register.vue")
      },
      {
        //门诊科室(挂号页面)
        path: ":depcode/:cdepcode/source",
        name: "repart",
        meta: {
          title: "source",
          isShowHeaderSearch: true
        },
        component: () => import("@/views/hospital/register/register-source.vue")
      },
      {
        //门诊科室(挂号页面)
        path: ":depcode/:cdepcode/:docId/confirm",
        name: "repart1",
        meta: {
          title: "confirm",
          isShowHeaderSearch: true
        },
        component: () => import("@/views/hospital/register/register-confirm.vue")
      },
      {
        path: "detail",
        name: "detail",
        meta: {
          title: "医院详情",
          isMenu: true
        },
        component: () => import("@/views/hospital/detail/detail.vue")
      },
      {
        path: "notice",
        name: "notice",
        meta: {
          title: "预约须知",
          isMenu: true
        },
        component: () => import("@/views/hospital/notice/notice.vue")
      }
    ]
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
      title: "帮助中心"
    },
    component: () => import("../views/support/support.vue"),
    children: [
      { path: "common", component: () => import("@/views/support/common/common.vue") },
      { path: "login", component: () => import("@/views/support/login/login.vue") },
      { path: "register", component: () => import("@/views/support/register/register.vue") },
      { path: "account", component: () => import("@/views/support/account/account.vue") },
      { path: "process", component: () => import("@/views/support/process/process.vue") },
      { path: "cancle", component: () => import("@/views/support/cancle/cancle.vue") },
      { path: "appeal", component: () => import("@/views/support/appeal/appeal.vue") },
      {
        path: "general-rules",
        component: () => import("@/views/support/general-rules/general-rules.vue")
      }
    ]
  },

  /* 
    用户信息相关
  */
  {
    path: "/personal",
    component: () => import("@/views/personal/personal.vue"),
    children: [
      {
        path: "authentication",

        meta: {
          title: "实名认证",
          isMenu: true
        },
        component: () => import("@/views/personal/authentication/authentication.vue")
      },

      {
        path: "order",
        meta: {
          title: "挂号订单",
          isMenu: true
        },
        component: () => import("@/views/personal/order/order.vue")
      },
      {
        path: "patient",
        meta: {
          title: "就诊人管理",
          isMenu: true
        },
        component: () => import("@/views/personal/patient/patient.vue")
      },
      {
        path: "patient/add",
        meta: {
          title: "添加就诊人"
        },
        component: () => import("@/views/personal/patient/patient-add.vue")
      },
      {
        path: "account",
        meta: {
          title: "修改账户信息",
          isMenu: true
        },
        component: () => import("@/views/personal/account/account.vue")
      }
    ]
  }
];

export default routes;

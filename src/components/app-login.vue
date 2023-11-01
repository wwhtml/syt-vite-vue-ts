<script lang="ts" setup>
// 注意：script标签内容不能为空，如果这里的内容是空就不会编译

//框架
import { ref, reactive } from "vue";

import { useRoute, useRouter } from "vue-router";

//api
import { getCode, getUserLogin } from "@/api/user/index";
//组件
import { ElMessage } from "element-plus";

import type { FormInstance, FormRules } from "element-plus";

//store
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);

//修改登录方式（wehat or phone）
const loginWay = ref("phone");
const changeLoginWay = (way: string) => {
  loginWay.value = way;
};

//是否同意协议
const isAgreen = ref(false);

//手机号登录
let loginParam = reactive({
  phone: "13322123123", //收集手机号码
  code: "" //收集验证码
});

//自定义校验规则:手机号码自定义校验规则
const validatorPhone = (rule: any, value: any, callBack: any) => {
  const reg = /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/;
  if (reg.test(value)) {
    // isOK.value = true;
    code_btn_disabled.value = false;
    callBack();
  } else {
    // isOK.value = false;
    code_btn_disabled.value = true;
    callBack(new Error("请输入正确的手机号码格式"));
  }
};
//验证码自定义校验规则
const validatorCode = (rule: any, value: any, callBack: any) => {
  if (/^\d{6}$/.test(value)) {
    callBack();
  } else {
    callBack(new Error("请输入正确的验证码格式"));
  }
};
const rules = {
  phone: [{ trigger: "change", validator: validatorPhone }],
  code: [{ trigger: "change", validator: validatorCode }]
};

//验证码相关的值
const code_btn_text = ref<string | number>("获取验证码");
const code_btn_loading = ref(false);
const code_btn_disabled = ref(false);

//倒计时
const countDown = (count: number) => {
  let seconde = count || 60;
  code_btn_disabled.value = true;

  code_btn_text.value = `${seconde} s`;

  let timer: any;
  if (timer) {
    clearInterval(timer);
  }
  timer = setInterval(() => {
    seconde--;
    code_btn_text.value = `${seconde} s`;
    if (seconde < 1) {
      clearInterval(timer);
      code_btn_text.value = `重新获取`;
      code_btn_disabled.value = false;
    }
  }, 1000);
};
//获取验证码
const getVerificationCode = async () => {
  code_btn_loading.value = true;

  const res = await getCode(loginParam.phone);

  if (res.code == 200) {
    const code = res.data;
    code_btn_loading.value = false;

    countDown(5);

    if (res.data) {
      ElMessage({
        message: "验证码：" + code,
        type: "success",
        duration: 3000
      });
    } else {
      ElMessage({
        message: "请稍后再尝试，获取太频繁了",
        type: "error",
        duration: 3000
      });
    }
  }
};

const formRef = ref<FormInstance>();

const $route = useRoute();
const $router = useRouter();
//登录
const login = async (formRef: FormInstance | undefined) => {
  if (!formRef) return;
  await formRef.validate(async (valid, fields) => {
    if (valid) {
      const res = await getUserLogin(loginParam);
      if (res.code == 200) {
        console.log(res.data);
        userInfo.value = res.data;
        userStore.visiable = false;
        //获取url的query参数
        let redirect = $route.query.redirect;
        if (redirect) {
          $router.push(redirect as string);
        } else {
          $router.push("/");
        }
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>

<template>
  <div class="app-login">
    <el-dialog v-bind="$attrs">
      <!-- <div class="login-contniner">eeee</div> -->
      <div class="left">
        <div class="login-wrapper">
          <div class="login-form" v-if="loginWay == 'phone'">
            <div class="login-title">用户登录</div>
            <el-form :model="loginParam" :rules="rules" ref="formRef">
              <el-form-item prop="phone">
                <el-input placeholder="请输入您的手机号" v-model="loginParam.phone" clearable />
              </el-form-item>
              <el-form-item class="code-wrap" prop="code">
                <el-input placeholder="请输入验证码" v-model="loginParam.code" clearable />
                <el-button
                  type="primary"
                  :disabled="code_btn_disabled"
                  :loading="code_btn_loading"
                  @click="getVerificationCode"
                >
                  {{ code_btn_text }}
                </el-button>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" style="width: 100%; height: 44px" @click="login(formRef)"
                  >登录</el-button
                >
              </el-form-item>
            </el-form>
            <div class="third-part-login">
              <div class="icon-wrap clickable" @click="changeLoginWay('wechat')">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-weixin"></use>
                </svg>
              </div>
              <p><span>第三方账号登录</span></p>
            </div>
          </div>
          <div class="login-wechat" v-else-if="loginWay == 'wechat'">
            <div class="code-img">
              <img src="../assets/images/code_login_wechat.png" alt="" />
            </div>
            <div class="info">
              <p>使用微信扫一扫登录</p>
              <p>“北京市预约挂号统一平台”</p>
            </div>
            <div class="third-part-login">
              <div class="icon-wrap clickable" @click="changeLoginWay('phone')">
                <!-- <i class="iconfont icon-shouji1"></i> -->
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-shouji1"></use>
                </svg>
              </div>
              <p><span>第三方账号登录</span></p>
            </div>
          </div>
        </div>
        <div class="tips">
          <input class="clickable" type="checkbox" v-model="isAgreen" />
          <span>是否同意</span><a href="">《用户协议》</a>和<a href="">《隐私协议》</a>
        </div>
      </div>
      <div class="right">
        <div>
          <div class="code-img-s">
            <img src="../assets/images/code_app.png" alt="" />
          </div>
          <div class="info">
            <div class="text">
              <i class="iconfont icon-weixin"></i>
              微信扫一扫关注
            </div>
            <div class="text">“北京114预约挂号”</div>
            <div class="text">预约挂号</div>
          </div>
        </div>

        <div class="slogan">
          <div>北京市卫健委官方指定平台</div>
          <div>快速挂号 安全放心</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-dialog) {
  width: 960px;
  height: 600px;
  border-radius: 5px;

  background-color: #f7fbff;
  background-repeat: repeat;
  background-image: url("../assets/images/login_bg.png");

  .el-dialog__header {
    padding-top: 10px;
    padding-bottom: 0;
    margin: 0;
  }

  .el-dialog__body {
    display: flex;
    padding-left: 60px;
  }
}

.left {
  display: flex;
  flex-direction: column;
  align-items: center;
  .login-wrapper {
    width: 440px;
    height: 480px;
    padding-bottom: 60px;
    background-color: #fff;
    box-shadow: 0 0 20px 0 rgba(73, 144, 241, 0.2);

    display: flex;
    justify-content: center;
  }
  .tips {
    margin-top: 30px;
    font-size: 12px;
    display: flex;
    align-items: center;

    a {
      color: $active-color;
    }
    input {
      margin-right: 5px;
      margin-top: 1px;
    }
  }

  .login-form {
    width: 320px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .login-title {
      margin: 70px 0;
      font-size: 16px;
      font-weight: 700;
      letter-spacing: 1px;
      color: #000;
    }

    :deep(.el-form) {
      .el-form-item {
        margin-bottom: 22px;
        .el-form-item__content {
          display: flex;
          flex-wrap: nowrap;
          .el-input {
            margin-right: 10px;
          }
        }
        .el-button {
          height: 36px;
          width: 100px;
          flex-shrink: 0;
        }
      }

      .el-input {
        height: 40px;
      }
    }
    .third-part-login {
      display: flex;
      flex-direction: column;
      align-items: center;
      // margin-top: 10px;
      .icon-wrap {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        background-color: #00c25f;

        display: flex;
        justify-content: center;
        align-items: center;
        .icon {
          font-size: 24px;
          color: #fff;
        }
      }
      p {
        margin-top: 10px;
        span {
          color: #cccccc;
        }
      }
    }
  }

  .login-wechat {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .code-img {
      margin-top: 40px;
      width: 200px;
      height: 200px;
    }
    .info {
      p {
        text-align: center;
        color: #666666;
        line-height: 20px;
      }
    }
    .third-part-login {
      display: flex;
      flex-direction: column;
      align-items: center;
      // margin-top: 20px;
      .icon-wrap {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        background-color: #4490f1;

        display: flex;
        justify-content: center;
        align-items: center;
        .icon {
          font-size: 24px;
          color: #fff;
        }
      }
      p {
        margin-top: 10px;
        span {
          color: #cccccc;
        }
      }
    }
  }
}

.right {
  padding: 70px 0 0 74px;
  .code-img-s {
    width: 140px;
    height: 140px;
    margin-bottom: 22px;
  }
  .info {
    width: 140px;
    .text {
      font-size: 14px;
      color: #333333;
      line-height: 24px;
      text-align: center;
      .icon-weixin {
        color: #00c25f;
      }
    }
  }
  .slogan {
    height: 68px;
    width: 318px;
    margin-top: 70px;
    font-size: 20px;
    font-weight: 300;
    font-style: italic;
    letter-spacing: 4px;
    color: #000;
    line-height: 44px;
    text-align: center;
  }
}
</style>

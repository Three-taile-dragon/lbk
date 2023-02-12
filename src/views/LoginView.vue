<template>
  <div class="page">
    <el-container>
      <el-header height="10%">
        <div class="head">
          <div class="item_info">
            <img src="@/assets/logo.svg" alt="" />
            <span class="text">中医药平台</span>
          </div>
          <span class="text_2"
            >此项目为一个中医药平台，旨在为---更好的服务</span
          >
        </div>
      </el-header>
      <el-main>
        <div class="login_box">
          <!-- 登录表单区域 -->
          <el-tabs :stretch="true">
            <el-tab-pane label="账号密码登录">
              <!-- 账号密码登录表单 -->
              <el-form
                ref="pwdLoginFormRef"
                :model="state.pwdLoginForm"
                :rules="state.pwdLoginFormRules"
              >
                <!-- 用户名 -->
                <el-form-item prop="username">
                  <el-input
                    placeholder="用户名/邮箱/手机号"
                    clearable
                    prefix-icon="User"
                    v-model="state.pwdLoginForm.username"
                  >
                  </el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                  <el-input
                    placeholder="密码"
                    type="password"
                    show-password
                    prefix-icon="lock"
                    v-model="state.pwdLoginForm.password"
                  >
                  </el-input>
                </el-form-item>
                <!-- 按钮区域 -->
                <el-form-item class="login_btns">
                  <el-button
                    type="primary"
                    @click="
                      pwdLogin(
                        state.pwdLoginForm.username,
                        state.pwdLoginForm.password
                      )
                    "
                    :loading="state.loading"
                    >登录</el-button
                  >
                  <!-- <el-button type="success" @click="toRegister">注册</el-button> -->
                  <div class="login_extends_option">
                    <a href="#" id="forge_pw">忘记密码</a>
                    <router-link id="new_reg" to="/register"
                      >新用户注册</router-link
                    >
                  </div>
                </el-form-item>
              </el-form>
            </el-tab-pane>

            <el-tab-pane label="手机验证登录">
              <!-- 手机验证登录表单 -->
              <el-form
                ref="phoneLoginFormRef"
                :model="state.phoneLoginForm"
                :rules="state.phoneLoginFormRules"
              >
                <!-- 手机号 -->
                <el-form-item prop="phone">
                  <el-input
                    placeholder="手机号"
                    clearable
                    prefix-icon="phone"
                    v-model="state.phoneLoginForm.phone"
                  >
                  </el-input>
                </el-form-item>
                <!-- 手机验证码 -->
                <el-form-item prop="phoneCode">
                  <el-input
                    placeholder="验证码"
                    prefix-icon="key"
                    v-model="state.phoneLoginForm.phoneCode"
                  >
                    <template #append>
                      <el-button>获取验证码</el-button>
                    </template>
                  </el-input>
                </el-form-item>
                <!-- 按钮区域 -->
                <el-form-item class="login_btns">
                  <el-button type="primary" @click="phoneLogin">登录</el-button>
                  <!-- <el-button type="success" @click="toRegister">注册</el-button> -->
                  <div class="login_extends_option">
                    <a href="#" id="forge_pw">忘记密码</a>
                    <router-link id="new_reg" to="/register"
                      >新用户注册</router-link
                    >
                  </div>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <div class="login_footer">
              登录即表示您已阅读并同意
              <a href="#">服务条款</a>
            </div>
          </el-tabs>
        </div>
      </el-main>
      <el-footer>
        <div class="foot">
          <span class="font_1">Copyright © DragonTeam出品</span>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useUserStore } from "@/stores/user/login";
import type { UserLoginInfo } from "@/model/user";
function checkEmail(rule: any, value: string, cb: (arg0: Error | any) => void) {
  // 验证邮箱的正则表达式
  const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
  if (regEmail.test(value)) {
    // 合法的邮箱
    return cb(undefined);
  }
  cb(new Error("请输入合法的邮箱"));
}
// 验证手机号的规则
var checkMobile = (
  rule: any,
  value: string,
  cb: (arg0: Error | any) => void
) => {
  // 验证手机号的正则表达式
  // const regMobile =
  //   /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
  const regMobile = /^1[3456789]\d{9}$/;
  if (regMobile.test(value)) {
    return cb(undefined);
  }
  cb(new Error("请输入合法的手机号"));
};
const pwdLoginFormRef = ref(null);
const phoneLoginFormRef = ref(null);
const state = reactive({
  pwdLoginForm: {
    username: "",
    password: "",
  },
  emailLoginForm: {
    email: "",
    emailCode: "",
  },
  phoneLoginForm: {
    phone: "",
    phoneCode: "",
  },
  pwdLoginFormRules: {
    username: [
      {
        required: true,
        message: "请输入你的账号",
        trigger: "blur",
      },
    ],
    // 验证密码是否合法
    password: [
      {
        required: true,
        message: "请输入你的密码",
        trigger: "blur",
      },
    ],
  },
  emailLoginFormRules: {
    email: [
      {
        required: true,
        message: "请输入你的邮箱",
        trigger: "blur",
      },
      {
        validator: checkEmail,
        trigger: "blur",
      },
    ],
    emailCode: [
      {
        required: true,
        message: "请输入你获取到的验证码",
        trigger: "blur",
      },
    ],
  },
  phoneLoginFormRules: {
    phone: [
      {
        required: true,
        message: "请输入你的手机号",
        trigger: "blur",
      },
      {
        validator: checkMobile,
        trigger: "blur",
      },
    ],
    phoneCode: [
      {
        required: true,
        message: "请输入你获取到的验证码",
        trigger: "blur",
      },
    ],
  },
  // 控制获取验证码
  loading: false,
  disabled: false,
  buttonText: "获取验证码",
  duration: 60,
  timer: 0,
});
// 账号密码登录
const userStore = useUserStore();
const pwdLogin = (name: string, passwd: string) => {
  const parmas: UserLoginInfo = {
    account: name,
    password: passwd,
  };
  userStore.login(parmas);
};
// 手机号验证登录
const phoneLogin = async () => {
  const obj = {
    phone: state.phoneLoginForm.phone,
    phoneCode: state.phoneLoginForm.phoneCode,
  };
  console.log(obj);
};
</script>

<style scoped>
.page {
  background-image: url(@/assets/background.png);
  width: 100%;
  height: 100%;
  /* overflow: hidden;
  position: fixed;
  background-size: cover; */
  /* 背景图垂直、水平均居中 */
  background-position: center center;
  /* 背景图不平铺 */
  background-repeat: no-repeat;
  /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
  background-attachment: fixed;
  /* 让背景图基于容器大小伸缩 */
  background-size: cover;
  /* 设置背景颜色，背景图加载过程中会显示背景色 */
  background-color: #464646;
}
.head {
  padding-top: 2%;
  width: 100%;
  height: 20%;
}
.head > img {
  width: 50%;
  height: 50%;
}
.item_info {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 1%;
}
.text {
  margin-left: 40px;
  color: #000000d9;
  font-size: 45px;
  font-family: HarmonyOSSansSC;
  font-weight: 600;
  text-align: left;
  /* line-height: 30px; */
}
.text_2 {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 21px;
  font-family: HarmonyOSSansSC;
  /* line-height: 24px; */
  color: #00000073;
  margin: 0 auto;
}
.el-footer {
  position: fixed;
  text-align: center;
  /* box-sizing: content-box; */
  white-space: nowrap;
  bottom: 2%;
  margin: 0 auto;
  left: 0;
  right: 0;
}
.foot {
  padding-top: 20px;
}
@media only screen and (max-width: 767px) {
  .page {
    background-image: url(@/assets/background_phone.png);
  }
}

@media (max-width: 400px) {
  .item_info > img {
    height: 1cm;
    width: 1cm;
  }
  .text {
    font-size: 1.5rem;
  }
  .text_2 {
    font-size: 1rem;
  }
  .foot {
    font-size: 0.8rem;
  }
}
@media (min-width: 401px) and (max-width: 639px) {
  .item_info > img {
    height: 1cm;
    width: 1cm;
  }
  .text {
    font-size: 1.7rem;
  }
  .text_2 {
    font-size: 1.2rem;
  }
  .foot {
    font-size: 0.85rem;
  }
}
@media (min-width: 640px) {
  .item_info > img {
    height: 1.5cm;
    width: 1.5cm;
  }
  .text {
    font-size: 2rem;
  }
  .text_2 {
    font-size: 1.5rem;
  }
  .foot {
    font-size: 0.9rem;
  }
}
.login_box {
  /* width: 30vw;
  height: 50vh; */
  max-width: 550px;
  max-height: 500px;
  margin: 1% auto;
}
.login_footer {
  margin-top: 5vh;
}

.el-tabs >>> .el-tabs__item.is-active {
  color: #000000;
  font-weight: 550;
}
/* .el-tab-pane {
  width: 100%;
} */
.el-form {
  text-align: center;
}

.el-input {
  width: 100%;
  --el-input-font-color: black;
}

.el-button {
  width: 100%;
  font-weight: 700;
}

.login_extends_optinon {
  position: relative;
  outline-style: none;
  cursor: pointer;
}
#forge_pw {
  position: absolute;
  font-size: 14px;
  left: 0;
  float: left;
  top: 30px;
  color: #6c7d8f;
  text-decoration: none;
}
#new_reg {
  position: absolute;
  font-size: 14px;
  right: 0;
  float: right;
  top: 30px;
  color: #067bef;
  text-decoration: none;
}
* >>> .el-input-group__append {
  justify-content: unset;
}
</style>

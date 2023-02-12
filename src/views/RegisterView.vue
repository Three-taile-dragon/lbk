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
        <div class="reg_box">
          <!-- 注册表单区域 -->
          <el-tabs :stretch="true">
            <el-tab-pane label="注册">
              <el-form
                ref="pwdRegisterFormRef"
                :model="state.pwdRegisterForm"
                :rules="state_rul.pwdRegisterFormRules"
              >
                <!-- 邮箱 -->
                <el-form-item prop="email">
                  <el-input
                    placeholder="邮箱"
                    clearable
                    prefix-icon="Message"
                    v-model="state.pwdRegisterForm.email"
                  >
                  </el-input>
                </el-form-item>
                <!-- 用户名 -->
                <el-form-item prop="username">
                  <el-input
                    placeholder="用户名"
                    clearable
                    prefix-icon="User"
                    v-model="state.pwdRegisterForm.username"
                  >
                  </el-input>
                </el-form-item>

                <el-popover
                  ref="popover"
                  placement="right"
                  title="密码强度"
                  :width="200"
                  trigger="click"
                  content=""
                >
                  <template #reference>
                    <!-- 密码 -->
                    <el-form-item prop="password">
                      <el-input
                        placeholder="密码须至少6位，且区分大小写"
                        type="password"
                        show-password
                        prefix-icon="lock"
                        v-model="state.pwdRegisterForm.password"
                      >
                      </el-input>
                    </el-form-item>
                  </template>
                  <el-form-item
                    v-if="
                      state.pwdRegisterForm.password !== '' &&
                      state.pwdRegisterForm.password !== undefined
                    "
                    label=""
                    align="center"
                    style="height: 25px"
                  >
                    <!-- 展示长度条 -->
                    <div
                      class="bar"
                      v-if="
                        state.pwdRegisterForm.password !== '' &&
                        state.pwdRegisterForm.password !== undefined
                      "
                      :style="{ background: barColor, width: width + '%' }"
                    >
                      <!-- 展示文字 -->
                      <div
                        class="strength"
                        :style="{ color: barColor }"
                        v-if="
                          state.pwdRegisterForm.password !== '' &&
                          state.pwdRegisterForm.password !== undefined
                        "
                      >
                        {{ strength }}
                      </div>
                    </div>
                  </el-form-item>
                </el-popover>
                <el-form-item prop="password2">
                  <el-input
                    placeholder="再次确认您的密码"
                    type="password"
                    show-password
                    prefix-icon="lock"
                    v-model="state.pwdRegisterForm.password2"
                  >
                  </el-input>
                </el-form-item>
                <!-- 手机号 -->
                <el-form-item prop="mobile">
                  <el-input
                    v-model="state.pwdRegisterForm.mobile"
                    placeholder="11位手机号"
                    class="input-with-select"
                    prefix-icon="Iphone"
                  >
                    <template #prepend>
                      <el-select
                        v-model="select"
                        placeholder="+86"
                        style="width: 115px"
                      >
                        <el-option label="+86" value="1" />
                      </el-select>
                    </template>
                  </el-input>
                </el-form-item>
                <!-- 验证码 -->
                <el-form-item prop="captcha">
                  <el-input
                    v-model="state.pwdRegisterForm.captcha"
                    placeholder="请输入验证码"
                    class="input_captcha"
                    prefix-icon="CircleCheck"
                  >
                    <template #append>
                      <el-button
                        icon="Position"
                        @click="getCaptcha(state.pwdRegisterForm.mobile)"
                        >获取验证码</el-button
                      >
                    </template>
                  </el-input>
                </el-form-item>
                <!-- 按钮区域 -->
                <el-form-item class="reg_btns">
                  <el-button
                    type="primary"
                    @click="
                      pwdRegister(
                        state.pwdRegisterForm.email,
                        state.pwdRegisterForm.username,
                        state.pwdRegisterForm.password,
                        state.pwdRegisterForm.password2,
                        state.pwdRegisterForm.mobile,
                        state.pwdRegisterForm.captcha
                      )
                    "
                    :loading="state.loading"
                    >注册</el-button
                  >
                  <!-- <el-button type="success" @click="toRegister">注册</el-button> -->
                  <div class="reg_extends_option">
                    <a href="#" id="forge_pw">忘记密码</a>
                    <router-link id="new_login" to="/login"
                      >已有账号?现在登陆</router-link
                    >
                  </div>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>

          <div class="reg_footer">
            注册即表示您已阅读并同意
            <a href="#">服务条款</a>
          </div>
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
import { ref, reactive, watch } from "vue";
import { useUserStore } from "@/stores/user/login";
import type { UserGetCaptchaInfo, UserRegisterInfo } from "@/model/user";
// 引入验证方法
import { checkPasswordRule, level } from "@/utils/checkPassword";
import { start, close } from "@/utils/nprogress";
// 强度条颜色
const barColor = ref("");
// 强度条长度
const width = ref("");
// 强度条说明
const strength = ref("");

const select = ref("");

var checkEmail = (
  rule: any,
  value: string,
  cb: (arg0: Error | any) => void
) => {
  // 验证邮箱的正则表达式
  const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
  if (regEmail.test(value)) {
    // 合法的邮箱
    return cb(undefined);
  }
  cb(new Error("请输入合法的邮箱"));
};
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
// 校验验证码
var checkCaptcha = (
  rule: any,
  value: string,
  cb: (arg0: Error | any) => void
) => {
  // 验证验证码的正则表达式 六位数字
  const regCaptcha = /^[1-9]\d{5}$/;
  if (regCaptcha.test(value)) {
    return cb(undefined);
  }
  cb(new Error("验证码格式不正确"));
};
// 校验密码强度
var checkPassword = (
  rule: any,
  value: string,
  cb: (arg0: Error | any) => void
) => {
  // 校验密码强度
  let name: string = "";
  if (state.pwdRegisterForm.username === "") {
    name = "空";
  } else {
    name = state.pwdRegisterForm.username;
    const result: string = checkPasswordRule(value, name);
    if (result === "校验通过") {
      return cb(undefined);
    }
    cb(new Error(result));
    console.log(result);
  }
};

var checkPassword2 = (
  rule: any,
  value: string,
  cb: (arg0: Error | any) => void
) => {
  // 校验密码强度
  let pwd: string = state.pwdRegisterForm.password;
  if (value === pwd) {
    return cb(undefined);
  }
  cb(new Error("两次输入的密码不一致,请检查"));
};

var checkAccount = (
  rule: any,
  value: string,
  cb: (arg0: Error | any) => void
) => {
  // 用户名正则表达式匹配 十位以内字母和数字
  const regCaptcha = /^[A-Za-z0-9_\-\u4e00-\u9fa5]{1,10}$/;
  if (regCaptcha.test(value)) {
    return cb(undefined);
  }
  cb(new Error("用户名应为十位以内字母或数字,请重新输入"));
};

const pwdRegisterFormRef = ref(null);
const state = reactive({
  pwdRegisterForm: {
    email: "",
    username: "",
    password: "",
    password2: "",
    mobile: "",
    captcha: "",
  },
  // 控制获取验证码
  loading: false,
  disabled: false,
  buttonText: "获取验证码",
  duration: 60,
  timer: 0,
});

const state_rul = reactive({
  pwdRegisterFormRules: {
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
    username: [
      {
        required: true,
        message: "请输入你的账号",
        trigger: "blur",
      },
      {
        validator: checkAccount,
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
      {
        validator: checkPassword,
        trigger: "blur",
      },
    ],
    password2: [
      {
        required: true,
        message: "至少6位密码，区分大小写",
        trigger: "blur",
      },
      {
        validator: checkPassword2,
        trigger: "blur",
      },
    ],
    mobile: [
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
    captcha: [
      {
        required: true,
        message: "请输入你获取到的验证码",
        trigger: "blur",
      },
      {
        validator: checkCaptcha,
        trigger: "blur",
      },
    ],
  },
});
watch(
  () => state.pwdRegisterForm.password,
  (newVal) => {
    if (newVal != "") {
      const res: string = level(newVal);
      if (res == "非常弱") {
        barColor.value = "red";
        width.value = "25";
        strength.value = "非常弱";
      } else if (res == "弱") {
        barColor.value = "#ee795c";
        width.value = "40";
        strength.value = "弱";
      } else if (res == "一般") {
        barColor.value = "orange";
        width.value = "60";
        strength.value = "一般";
      } else if (res == "强") {
        barColor.value = "green";
        width.value = "80";
        strength.value = "强";
      } else if (res == "非常强") {
        barColor.value = "#1B8EF8";
        width.value = "100";
        strength.value = "非常强";
      }
    }
  }
);

// 账号注册
const userStore = useUserStore();
const pwdRegister = (
  email: string,
  name: string,
  passwd: string,
  passwd2: string,
  mobile: string,
  captcha: string
) => {
  const parmas: UserRegisterInfo = {
    email: email,
    name: name,
    password: passwd,
    password2: passwd2,
    mobile: mobile,
    captcha: captcha,
  };
  // console.log(userStore.user);
  userStore.register(parmas);
};

const getCaptcha = (mobile: string) => {
  start();
  const params: UserGetCaptchaInfo = {
    mobile: mobile,
  };
  userStore.getCaptcha(params);
  close();
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
  height: 10%;
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
.reg_box {
  /* width: 30vw;
  height: 50vh; */
  max-width: 550px;
  max-height: 500px;
  margin: 2% auto;
}
.reg_footer {
  margin-top: 2vh;
}

.reg_extends_option {
  width: 10px;
  /* height: 10px; */
  margin-top: 2vh;
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

.reg_extends_optinon {
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
#new_login {
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

.strength {
  font-size: 13px;
  color: #271e25;
  position: relative;
  top: 5px;
  left: 0;
  transition: 0.5s all ease;
}
.bar {
  /* width: 400px; */
  height: 5px;
  background: red;
  transition: 0.5s all ease;
  max-width: 420px;
  margin: 2px 0 5px 5px;
  position: absolute;
}
</style>

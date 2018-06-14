<template>
    <div class="wrap">
        <van-nav-bar
            title="用户注册"
            left-text="返回"
            left-arrow
            @click-left="goBack"
        />
        <div class="register-panel">
            <van-field 
                v-model="username"
                label="用户名"
                icon="clear"
                placeholder="请输入用户名"
                required
                @click-icon="username = ''"
                :error-message="usernameErrorMsg"
            />
            <van-field 
                v-model="password"
                type="password"
                label="密码"
                placeholder="请输入密码"
                required
                :error-message="passwordErrorMsg"
            />
            <div class="register-button">
                <van-button type="primary"  @click="registerAction"  :loading="openLoading" size="large">马上注册</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { Toast } from "vant";

export default {
  data() {
    return {
      username: "",
      password: "",
      // 是否开启用户的Loading
      openLoading: false,
      usernameErrorMsg: "",
      passwordErrorMsg: ""
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    //用户注册
    registerUser() {
      // 进入这个方法的时候，先让他loading，防止重复提交
      this.openLoading = true;
      axios({
        url: this.$url.registerUser,
        method: "post",
        data: {
          userName: this.username,
          password: this.password
        }
      })
        .then(res => {
          if (res.data.code === 200) {
            Toast.success(res.data.message);
            this.$router.push("/");
          } else {
            Toast.fail("注册失败");
            this.openLoading = false;
          }
        })
        .catch(err => {
          Toast.fail("注册失败");
          this.openLoading = false;
        });
    },
    // 表单检测
    checkForm() {
      let isOk = true;

      if (this.username.length < 5) {
        this.usernameErrorMsg = "用户名不能小于5位";
        isOk = false;
      } else {
        this.usernameErrorMsg = "";
      }

      if (this.password.length < 6) {
        this.passwordErrorMsg = "密码不能小于6位";
        isOk = false;
      } else {
        this.passwordErrorMsg = "";
      }

      return isOk;
    },
    // 完整注册逻辑
    registerAction() {
      this.checkForm() && this.axiosRegisterUser();
    }
  }
};
</script>

<style scoped>
.wrap {
  background-color: white;
}
.register-panel {
  width: 90%;
  border-radius: 5%;
  margin: 0 auto;
  padding: 5rem 0;
}
.register-button {
  width: 40%;
  padding-top: 5rem;
  padding-left: 10rem;
}
</style>
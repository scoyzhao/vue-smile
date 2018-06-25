<template>
    <div class="wrap">
        <van-nav-bar
            title="用户登陆"
            left-text="返回"
            left-arrow
            @click-left="goBack"
        />
        <div class="login-panel">
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
            <div class="login-button">
                <van-button type="primary"  @click="loginAction"  :loading="openLoading" size="large">马上登陆</van-button>
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
  created() {
    if (localStorage.userInfo) {
      Toast.success("您已经登陆");
      this.$router.push("/");
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    //用户登陆
    loginUser() {
      // 进入这个方法的时候，先让他loading，防止重复提交
      this.openLoading = true;
      axios({
        url: this.$url.login,
        method: "post",
        data: {
          userName: this.username,
          password: this.password
        }
      })
        .then(res => {
          // 密码与用户名匹配
          if (res.data.code === 200 && res.data.message === true) {
            // 登陆状态存储
            new Promise((resolve, reject) => {
              localStorage.userInfo = {
                userName: this.username
              };
              setTimeout(() => {
                resolve();
              }, 500);
            })
              .then(() => {
                Toast.success("登陆成功");
                this.$router.push("/");
              })
              .catch(err => {
                Toast.fail("登陆状态保存失败");
                this.openLoading = false;
                console.log(err);
              });
          } else {
            Toast.fail("登陆失败");
            this.openLoading = false;
          }
        })
        .catch(err => {
          Toast.fail("登陆失败");
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
    // 完整登陆逻辑
    loginAction() {
      this.checkForm() && this.loginUser();
    }
  }
};
</script>

<style scoped>
.wrap {
  background-color: white;
}
.login-panel {
  width: 90%;
  border-radius: 5%;
  margin: 0 auto;
  padding: 5rem 0;
}
.login-button {
  width: 40%;
  padding-top: 5rem;
  padding-left: 10rem;
}
</style>
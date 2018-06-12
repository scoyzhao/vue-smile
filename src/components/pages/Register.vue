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
            />
            <van-field 
                v-model="password"
                type="password"
                label="密码"
                placeholder="请输入密码"
                required
            />
            <div class="register-button">
                <van-button type="primary"  @click="registerUser" size="large">马上注册</van-button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                username: '',
                password: '',
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1)
            },
            registerUser() {
                axios({
                    url: this.$url.registerUser,
                    method: 'post',
                    data: {
                        username: this.username,
                        password: this.password,
                    }
                })
                .then((res) => {
                    console.log(res)
                })
                .catch((err) => {
                    console.log(err)
                })
            },
        },
    }
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
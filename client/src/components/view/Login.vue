<template>
    <div class="login-wrap">
        <div class="ms-title">Boquete 后台管理系统</div>
        <div class="ms-login">
            <el-form :model="loginForm"
                     :rules="rules"
                     ref="loginForm"
                     label-width="0px"
                     class="demo-loginForm">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username"
                              placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password"
                              placeholder="密码"
                              v-model="loginForm.password"></el-input>
                </el-form-item>
                <el-form-item prop="verifycode">
                    <el-input placeholder="验证码"
                              style="width: 190px;"
                              v-model="loginForm.verifycode"
                              @keyup.enter.native="submitForm('loginForm')"></el-input>
                    <img :src="verifyImgSrc"
                         class="login-verifyimg">
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary"
                               @click="submitForm('loginForm')">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import { API } from '../../lib/config'
export default {
    data() {
        return {
            verifyImgSrc: `api/v1/verify-img?${Math.random()}`,
            loginForm: {
                username: '',
                password: '',
                verifycode: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                verifycode: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        submitForm(formName) {
            const loginForm = this.loginForm
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.login(loginForm.username, loginForm.password, loginForm.verifycode, formName)
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        login(username, password, verifycode, formName) {
            this.axios.post(API.LOGIN, {
                username: username,
                password: password,
                verifycode: verifycode
            }).then((res) => {
                const data = res.data
                if (data.err) {
                    throw data.message
                } else {
                    localStorage.setItem('username', data.data.user.username)
                    localStorage.setItem('user', JSON.stringify(data.data.user))
                    this.$router.push('/home')
                }
            }).catch((err) => {
                this.$notify.error({
                    title: '登录失败',
                    message: err
                })
                this.resetForm(formName)
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields()
        }
    }
}
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
}

.ms-title {
    position: absolute;
    top: 50%;
    width: 100%;
    margin-top: -230px;
    text-align: center;
    font-size: 30px;
    color: #fff;
}

.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 300px;
    height: 180px;
    margin: -150px 0 0 -190px;
    padding: 40px;
    border-radius: 5px;
    background: #fff;
}

.login-verifyimg {
    vertical-align: middle;
    padding-left: 15px;
}

.login-btn {
    text-align: center;
}

.login-btn button {
    width: 100%;
    height: 36px;
}
</style>

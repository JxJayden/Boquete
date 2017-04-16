<template>
    <div class="login-wrap">
        <div class="ms-title">后台管理系统</div>
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
                <div class="login-btn">
                    <el-button type="success"
                               @click="submitForm('loginForm')">注册</el-button>
                    <el-button type="primary"
                               @click="gotoLogin">登录</el-button>
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
            loginForm: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        submitForm(formName) {
            const loginForm = this.loginForm
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.login(loginForm.username, loginForm.password, formName)
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        login(username, password, formName) {
            this.axios.post(API.REGISTER, {
                username: username,
                password: password
            }).then((res) => {
                const data = res.data
                if (data.err) {
                    throw data.message
                } else {
                    this.$message.success('注册成功！请登录')
                    this.$router.push('/login')
                }
            }).catch((err) => {
                this.$notify.error({
                    title: '注册失败',
                    message: err
                })
                this.resetForm(formName)
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields()
        },
        gotoLogin() {
            this.$router.push('/login')
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
    height: 140px;
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
    text-align:center;
}

.login-btn button {
    width: 47%;
    height: 36px;
}
</style>

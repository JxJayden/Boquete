<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 设置</el-breadcrumb-item>
                <el-breadcrumb-item>密码设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div>
            <el-button type="warning" @click="changePassword">修改密码</el-button>
        </div>
    </div>
</template>

<script>
import { API } from '../../../lib/config'
import { _put } from '../../../lib/utils'
export default {
    data() {
        return {

        }
    },
    methods: {
        changePassword() {
            this.$prompt('请输入新密码', '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                inputValidator: function (value) {
                    return !!value
                },
                inputErrorMessage: '新密码不能为空'
            }).then(({ value }) => {
                this.postNewPassword(value)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                })
            })
        },
        postNewPassword(newPassword) {
            const data = {
                password: newPassword
            }
            _put(this, API.PASSWORD, data, function (data) {
                console.log(data)
                if (data.ok && data.ok === 1) {
                    this.$message.success('修改密码成功，请重新登录')
                    this.$router.push({ name: 'login' })
                }
            })
        }
    }
}
</script>

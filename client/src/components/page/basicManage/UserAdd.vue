<template>
    <el-dialog title="title"
               ref="addUserDialog"
               @close="handleClose"
               @open="resetUserForm"
               v-model="userDialogVisible">
        <el-form :model="user"
                 ref="userForm"
                 :rules="rules">
            <el-form-item label="管理员名称"
                          prop="username">
                <el-input v-model="user.username"
                          auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码"
                          prop="password">
                <el-input v-model="user.password"
                          type="password"
                          auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码"
                          prop="checkPass">
                <el-input v-model="user.checkPass"
                          type="password"
                          auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="是否为超级管理员"
                          prop="root">
                <el-switch v-model="user.root"
                           on-color="#13ce66"
                           off-color="#ff4949"
                           on-text="是"
                           off-text="否"
                           @change="handleCheckRootChange">
                </el-switch>
            </el-form-item>
            <el-form-item label="管理员权限" prop="all">
                <el-checkbox :indeterminate="isIndeterminate"
                             v-model="user.all"
                             @change="handleCheckAllChange"
                             :disabled="user.root">全选</el-checkbox>
                <div style="margin: 15px 0;"></div>
            <el-form-item prop="limits">
                <el-checkbox-group v-model="user.limits"
                                   @change="handleCheckedLimitsChange">
                    <el-checkbox v-for="limit in limitsValue"
                                 :label="limit"
                                 :disabled="user.root">{{limitsTag[limit]}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            </el-form-item>

        </el-form>
        <div slot="footer"
             class="dialog-footer">
            <el-button @click="handleDialogEvent(false)">取 消</el-button>
            <el-button type="primary"
                       @click="handleDialogEvent(true)">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
import { userLimits } from '../../../lib/config'
export default {
    props: ['title', 'dialogCloseCb', 'show', 'addUser'],
    data() {
        const validatePass = (rule, value, callback) => {
            if (this.user.checkPass !== '') {
                this.$refs.userForm.validateField('checkPass')
            }
            callback()
        }
        const validatePassConfirm = (rule, value, callback) => {
            if (value !== this.user.password) {
                callback(new Error('两次输入密码不一致!'))
            } else {
                callback()
            }
        }
        return {
            user: {
                username: '',
                password: '',
                checkPass: '',
                root: false,
                limits: [],
                all: false
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 15, message: '密码长度在 6 到 15 个字符', trigger: 'blur' },
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' },
                    { validator: validatePassConfirm, trigger: 'blur' }
                ],
                limits: [
                    { type: 'array', required: true, message: '请选择管理员权限', trigger: 'change' }
                ]
            },
            isIndeterminate: false,
            limitsValue: userLimits.value,
            limitsTag: userLimits.tag
        }
    },
    computed: {
        userDialogVisible() {
            return this.show
        }
    },
    methods: {
        handleCheckAllChange() {
            this.user.limits = event.target.checked ? this.limitsValue : []
            this.isIndeterminate = false
        },
        handleCheckedLimitsChange(value) {
            const checkedCount = value.length
            this.all = checkedCount === this.limitsValue.length
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.limitsValue.length
        },
        handleDialogEvent(ifAdd) {
            ifAdd && this.submitUserForm()
            this.$refs.addUserDialog.close()
        },
        handleClose() {
            this.dialogCloseCb()
        },
        handleCheckRootChange(root) {
            if (root) {
                this.all = true
                this.isIndeterminate = false
                this.user.limits = this.limitsValue
            } else {
                this.all = false
                this.isIndeterminate = false
                this.user.limits = []
            }
        },
        submitUserForm(cb) {
            this.$refs.userForm.validate((valid) => {
                if (valid) {
                    this.addUser(this.user)
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        resetUserForm() {
            this.isIndeterminate = false
            this.$refs.userForm && this.$refs.userForm.resetFields()
        }
    }
}
</script>

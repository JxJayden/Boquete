<template>
    <el-dialog :title="title"
               ref="editUserDialog"
               @close="handleClose"
               @open="resetUserForm"
               v-model="userDialogVisible">
        <el-form :model="user"
                 ref="userForm"
                 :rules="rules">
            <el-form-item label="管理员名称"
                          prop="username">
                <el-input v-model="user.username"
                          @change="handleChangeUsername"
                          auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="管理员权限"
                          prop="limits">
                <el-checkbox-group v-model="user.limits">
                    <el-checkbox v-for="limit in limitsValue"
                                 @change="handleChangeLimits"
                                 :label="limit">{{limitsTag[limit]}}</el-checkbox>
                </el-checkbox-group>
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
    props: ['title', 'dialogCloseCb', 'show', 'editUser', 'userInfo'],
    data() {
        return {
            isChange: false,
            change: {},
            user: {
                _id: '',
                username: '',
                limits: []
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                limits: [
                    { type: 'array', required: true, message: '请选择管理员权限', trigger: 'change' }
                ]
            },
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
        handleDialogEvent(ifEdit) {
            ifEdit && this.submitUserForm()
            this.$refs.editUserDialog.close()
        },
        handleClose() {
            this.dialogCloseCb()
        },
        submitUserForm() {
            this.$refs.userForm.validate((valid) => {
                if (valid) {
                    this.editUser(this.isChange, this.user._id, this.change)
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        resetUserForm() {
            this.user.username = this.userInfo.username
            this.user._id = this.userInfo._id
            this.user.limits = this.userInfo.limits
        },
        handleChangeLimits() {
            this.isChange = true
            this.change.limits = this.user.limits
        },
        handleChangeUsername(newVal) {
            this.isChange = true
            this.change.username = newVal
        }
    }
}
</script>

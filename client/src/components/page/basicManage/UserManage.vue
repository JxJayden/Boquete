<template>
    <div class="user-manage">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 设置</el-breadcrumb-item>
                <el-breadcrumb-item>管理员设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-table :data="userData"
                  border
                  ref="userTable"
                  :empty-text="userTableEmptyText"
                  style="width: 100%">
            <el-table-column prop="username"
                             label="名称">
            </el-table-column>
            <el-table-column label="权限"
                             align="center">
                <template scope="scope">
                    <el-tag v-for="limit in scope.row.limits"
                            :type="scope.row.tag === '是' ? 'primary' : 'success'"
                            style="margin-right: 10px;">{{limitTag[limit]}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="isRoot"
                             label="超级管理员"
                             :formatter="formatRoot">
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button size="small"
                               :disabled="scope.row.isRoot"
                               @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button size="small"
                               :disabled="scope.row.isRoot"
                               type="warning"
                               @click="handleEditPass(scope.row._id)">修改密码</el-button>
                    <el-button size="small"
                               type="danger"
                               :disabled="scope.row.isRoot"
                               @click="handleDelete(scope.row._id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-button type="primary"
                   icon="plus"
                   size="large"
                   class="user-add-btn"
                   :disabled="!userIsRoot"
                   @click="showAddUserDialog = true">添加新的管理员</el-button>

        <v-user-add title="添加新的管理员"
                    :dialogCloseCb="handleAddUserDialogCb"
                    :addUser="addUser"
                    :show="showAddUserDialog"></v-user-add>
        <v-user-edit title="修改管理员信息"
                     :userInfo="EditUserInfo"
                     :dialogCloseCb="handleEditUserDialogCb"
                     :editUser="editUser"
                     :show="showEditUserDialog"></v-user-edit>
    </div>
</template>

<script>
import vUserAdd from './UserAdd'
import vUserEdit from './UserEdit'
import { api, tag } from '../../../lib/config'

const user = JSON.parse(localStorage.getItem('user'))

export default {
    components: {
        vUserAdd, vUserEdit
    },
    data() {
        return {
            userIsRoot: user.isRoot,
            userTableEmptyText: '',
            userData: null,
            limitTag: tag,
            showAddUserDialog: false,
            showEditUserDialog: false,
            EditUserInfo: null
        }
    },
    mounted() {
        this.getUserList()
    },
    methods: {
        formatRoot(row, column) {
            return row.isRoot ? '是' : '否'
        },

        handleDelete(_id) {
            this.$confirm('此操作将永久删除该管理员, 是否继续？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteUser(_id)
            }).catch(() => {
                // maybe will do something
            })
        },
        deleteUser(_id) {
            this.axios.delete(api.user, {
                data: {
                    _id: _id
                }
            }).then(res => {
                if (res.data.err) {
                    throw res.data.message
                } else {
                    this.$notify({
                        title: '成功',
                        message: '删除管理员成功',
                        type: 'success'
                    })
                    this.getUserList()
                }
            }).catch(err => {
                this.$notify.error({
                    title: '删除失败',
                    message: err
                })
            })
        },
        getUserList() {
            if (!user.isRoot) {
                this.userTableEmptyText = '无访问权限'
            } else {
                this.axios.get(api.user).then(res => {
                    if (res.data.error) {
                        this.userTableEmptyText = res.data.message
                    }
                    this.userData = res.data.data.value
                }).catch(err => {
                    this.$notify.error({
                        title: '获取用户信息失败',
                        message: err
                    })
                })
            }
        },
        handleAddUserDialogCb() {
            this.showAddUserDialog = false
        },
        addUser(user) {
            console.log(user)
            this.axios.post(api.user, {
                username: user.username,
                password: user.password,
                limits: user.limits,
                isRoot: user.isRoot
            }).then(res => {
                if (!res.data.err) {
                    this.$notify({
                        title: '成功',
                        message: '添加新的管理员成功',
                        type: 'success'
                    })
                    this.getUserList()
                } else {
                    throw res.data.message
                }
            }).catch(err => {
                this.$notify.error({
                    title: '添加失败',
                    message: err
                })
            })
        },
        handleEdit(user) {
            this.EditUserInfo = user
            this.showEditUserDialog = true
        },
        handleEditUserDialogCb() {
            this.showEditUserDialog = false
        },
        editUser(isChange, userId, change) {
            if (!isChange) {
                return false
            } else {
                this.axios.put(api.user, {
                    _id: userId,
                    change: change
                }).then(res => {
                    if (!res.data.err) {
                        this.$notify({
                            title: '成功',
                            message: '编辑管理员信息成功',
                            type: 'success'
                        })
                        this.getUserList()
                    } else {
                        throw res.data.message
                    }
                }).catch(err => {
                    this.$notify.error({
                        title: '编辑失败',
                        message: err
                    })
                })
            }
        },
        handleEditPass(userId) {
            this.$prompt('请输入新密码', '修改密码', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /^.{6,15}$/,
                inputErrorMessage: '密码长度在 6 到 15 个字符'
            }).then(({ value }) => {
                this.editUserPass(userId, value)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                })
            })
        },
        editUserPass(userId, newPass) {
            this.axios.put(api.user, {
                _id: userId,
                change: {
                    password: newPass
                }
            }).then(res => {
                if (res.data.err) {
                    throw res.data.message
                }
                this.$notify({
                    type: 'success',
                    title: '成功',
                    message: '修改密码成功'
                })
            }).catch(err => {
                this.$notify.error({
                    title: '修改失败',
                    message: err
                })
            })
        }
    }
}
</script>
<style scoped>
.user-add-btn {
    margin-top: 30px;
    width: 100%;
}
</style>

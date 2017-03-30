<template>
    <div class="user-manage">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 基本设置</el-breadcrumb-item>
                <el-breadcrumb-item>管理员设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-table :data="userData"
                  border
                  style="width: 100%">
            <el-table-column prop="username"
                             label="名称"
                             width="150">
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
            <el-table-column label="操作"
                             width="180">
                <template scope="scope">
                    <el-button size="small"
                               @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small"
                               type="danger"
                               @click="handleDelete(scope.row._id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-button type="primary"
                   icon="plus"
                   size="large"
                   class="user-add-btn"
                   @click="showAddUserDialog = true">添加新的管理员</el-button>
        <v-user-add title="提示"
                    :dialogCloseCb="handleAddUserDialogCb"
                    :addUser="addUser"
                    :show="showAddUserDialog"></v-user-add>
    </div>
</template>

<script>
import vUserAdd from './UserAdd'
import { api, tag } from '../../../lib/config'
export default {
    components: {
        vUserAdd
    },
    data() {
        return {
            userData: null,
            limitTag: tag,
            showAddUserDialog: false
        }
    },
    mounted() {
        this.getUserList()
    },
    methods: {
        formatRoot(row, column) {
            return row.isRoot ? '是' : '否'
        },
        handleEdit(index, row) {
            this.$message('编辑第' + (index + 1) + '行')
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
            this.axios.get(api.user).then((res) => {
                this.userData = res.data.data.value
            })
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
                if (!res.data.error) {
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

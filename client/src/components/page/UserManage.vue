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
            <!--<el-table-column prop="isRoot"
                                     label="超级管理员"
                                     :formatter="formatRoot"
                                     :filters="[{ text: '是', value: 'true' }, { text: '否', value: 'false' }]"
                                     :filter-method="filterTag">
                        <template scope="scope">
                            <el-tag :type="scope.row.tag === '是' ? 'primary' : 'success'"
                                    close-transition>{{scope.row.tag}}
                            </el-tag>
                        </template>
                    </el-table-column>-->
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
        <!--<div class="pagination">
                <el-pagination layout="prev, pager, next"
                                :total="1000">
                </el-pagination>
            </div>-->
    </div>
</template>

<script>
import { api, tag } from '../../lib/config'
export default {
    data() {
        return {
            userData: null,
            limitTag: tag
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
            this.axios.delete(api.user, {
                data: {
                    _id: _id
                }
            }).then((res) => {
                if (res.data.err) {
                    throw res.data.message
                } else {
                    this.getUserList()
                }
            }).catch((err) => {
                this.$notify.error({
                    title: '删除失败',
                    message: err
                })
            })
        },
        getUserList() {
            this.axios.get(api.user).then((res) => {
                console.log(res)
                this.userData = res.data.data.value
            })
        }
    }
}
</script>

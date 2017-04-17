<template>
    <div class="page-list">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 页面管理</el-breadcrumb-item>
                <el-breadcrumb-item>列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <el-table :data="pageData"
                  border
                  style="width: 100%">
            <el-table-column prop="date"
                             label="创建日期"
                             sortable
                             :formatter="dateFormatter">
            </el-table-column>
            <el-table-column prop="title"
                             label="页面名称">
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button size="small"
                               type="primary"
                               @click="openUrl(scope.row.url)">查看页面</el-button>
                    <el-button size="small"
                               type="warning"
                               @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small"
                               type="danger"
                               @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="mgt20">
            <el-button @click="showPageNameDialog"
                       type="primary"
                       icon="plus">添加页面</el-button>
        </div>
        <!--<div class="pagination">
                                <el-pagination layout="prev, pager, next"
                                               :total="1000">
                                </el-pagination>
                            </div>-->
    </div>
</template>

<script>
import { _delete, _get, _post } from '../../../lib/utils'
import { API } from '../../../lib/config'
export default {
    data() {
        return {
            pageData: null
        }
    },
    mounted() {
        this.getPageData()
    },
    methods: {
        getPageData() {
            _get(this, API.PAGE, function (data) {
                this.pageData = data
            })
        },
        dateFormatter(row, column) {
            return row.date.slice(0, row.date.indexOf('T'))
        },
        handleEdit(index, row) {
            this.$router.push({ name: 'editPage', params: { id: row._id }})
        },
        handleDelete(index, row) {
            _delete(this, API.PAGE, { id: row._id }, function () {
                this.$message.success('删除成功')
                this.getPageData()
            })
        },
        openUrl(url) {
            window.open(url)
        },
        showPageNameDialog() {
            this.$prompt('请输入页面名称', '提示', {
                confirmButtonText: '添加',
                cancelButtonText: '取消',
                inputValidator: function (value) {
                    return !!value
                },
                inputErrorMessage: '页面名称不能为空！'
            }).then(({ value }) => {
                this.postAddPage(value)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                })
            })
        },
        postAddPage(title) {
            _post(this, API.PAGE, {
                title: title
            }, function (data) {
                this.$message({
                    type: 'success',
                    message: '添加' + title + '页面成功！'
                })
                this.getPageData()
            })
        }
    }
}
</script>

<style scoped>

</style>

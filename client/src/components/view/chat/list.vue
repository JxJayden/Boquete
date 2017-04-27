<template>
    <div class="page-list">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 在线咨询</el-breadcrumb-item>
                <el-breadcrumb-item>列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <el-table :data="chatData"
                  border
                  style="width: 100%">
            <el-table-column prop="date"
                             label="咨询日期"
                             sortable
                             :formatter="dateFormatter">
            </el-table-column>
            <el-table-column prop="customerName"
                             label="客户名">
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button size="small"
                               type="primary"
                               @click="gotoChat(scope.row.customerId)">进入聊天窗口</el-button>
                    <el-button size="small"
                               type="danger"
                               @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
import { _delete, _get, _post } from '../../../lib/utils'
import { API } from '../../../lib/config'
export default {
    data() {
        return {
            chatData: null
        }
    },
    mounted() {
        this.getChatData()
    },
    methods: {
        getChatData() {
            _get(this, API.CHAT, function (data) {
                console.log(data)
                this.chatData = data
            })
        },
        dateFormatter(row, column) {
            return row.date.slice(0, row.date.indexOf('T'))
        },
        handleDelete(index, row) {
            _delete(this, API.CHAT, { id: row._id }, function () {
                this.$message.success('删除成功')
                this.getChatData()
            })
        },
        gotoChat(customerId) {
            this.$router.push({ name: 'chat', params: { id: customerId }})
        }
    }
}
</script>

<style scoped>

</style>

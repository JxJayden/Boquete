<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 页面管理</el-breadcrumb-item>
                <el-breadcrumb-item>编辑</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <v-design v-model="customContent" :modules="defaultComponents"></v-design>
        <el-button @click="update">保存</el-button>
    </div>
</template>

<script>
import VDesign from '../design/index'
import { _post, _get, _put } from '../../../lib/utils'
import { API } from '../../../lib/config'
export default {
    data() {
        return {
            pageData: null,
            defaultComponents: ['video', 'image', 'carousel', 'text'],
            customContent: []
        }
    },
    components: {
        VDesign
    },
    mounted() {
        if (this.$route.params.id) {
            this.getOnePageData(this.$route.params.id)
        } else {
        }
    },
    watch: {
        $route() {
            if (this.$route.params.id) {
                this.getOnePageData(this.$route.params.id)
            }
        }
    },
    methods: {
        getOnePageData(id) {
            _get(this, API.PAGE + '?id=' + id, function (data) {
                this.pageData = data
            })
        },
        submit() {
            if (this.title === '') {
                this.$message.error('文章标题不能为空')
                return false
            }
            if (this.content === '') {
                this.$message.error('文章内容不能为空')
                return false
            }

            if (this.$route.query.id) {
                this.update(this.$route.query.id)
            } else {
                this.add()
            }
        },
        update() {
            const id = this.$route.params.id
            const data = {
                content: this.customContent,
                id: id
            }
            _put(this, API.PAGE, data, function (data) {
                this.$message.success('更新成功！')
            })
        }
    }
}
</script>
<style scoped>
.post-title {
    margin-bottom: 20px;
}
</style>

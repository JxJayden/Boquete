<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 页面管理</el-breadcrumb-item>
                <el-breadcrumb-item>编辑</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="btn-group">
            <el-button icon="plus"
                       type="primary"
                       v-for="item in defaultComponents"
                       @click="addComponents(item)">{{item.name}}</el-button>
        </div>
        <div class="custom-content mgt20">
            <draggable v-model="customComponents">
                    <div v-for="element in customComponents"
                         v-text="element.name">
                    </div>
            </draggable>
        </div>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import { _post, _get, _put } from '../../../lib/utils'
import { API } from '../../../lib/config'
const components = [
    {
        name: '轮播',
        type: 'carousel'
    },
    {
        name: '图片',
        type: 'image'
    },
    {
        name: '视频',
        type: 'video'
    }
]
export default {
    data() {
        return {
            pageData: null,
            defaultComponents: components,
            customComponents: []
        }
    },
    components: {
        draggable
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
        update(id) {
            const data = {
                content: this.content,
                title: this.title,
                id: id
            }
            _put(this, API.POST, data, function (data) {
                this.$message.success('更新成功！')
            })
        },
        add() {
            const data = {
                content: this.content,
                title: this.title
            }
            _post(this, API.POST, data, function (data) {
                this.$message.success('提交成功！')
            })
        },
        addComponents(item) {
            this.customComponents.push(item)
        }
    }
}
</script>
<style scoped>
.post-title {
    margin-bottom: 20px;
}
.custom-content {
    border-top: 1px solid #D3DCE6;
    padding-top: 20px;
}
</style>

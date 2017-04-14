<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 页面管理</el-breadcrumb-item>
                <el-breadcrumb-item>编辑</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="mgb20">
            <el-input v-model="title"
                      ref="title"
                      placeholder="请输入文章标题"
                      :autofocus="true"></el-input>
        </div>
        <quill-editor ref="myTextEditor"
                      v-model="content"
                      :config="editorOption"></quill-editor>
        <div class="mgt20">
            <el-button class="editor-btn"
                       type="primary"
                       @click="submit">提交</el-button>
            <el-button class="editor-btn"
                       type="danger"
                       @click="resetPostData">重置</el-button>
        </div>
    </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import { _post, _get, _put } from '../../../lib/utils'
import { API } from '../../../lib/config'
export default {
    data() {
        return {
            title: '',
            content: '<p>请输入文章内容</p>',
            editorOption: {
            }
        }
    },
    components: {
        quillEditor
    },
    mounted() {
        if (this.$route.query.id) {
            this.getOnePostData(this.$route.query.id)
        } else {
            this.resetPostData()
        }
    },
    watch: {
        $route() {
            if (this.$route.query.id) {
                this.getOnePostData(this.$route.query.id)
            } else {
                this.resetPostData()
            }
        }
    },
    methods: {
        resetPostData() {
            this.title = ''
            this.content = '<p>请输入文章内容</p>'
        },
        getOnePostData(id) {
            _get(this, API.POST + '?id=' + id, function (data) {
                this.title = data.title
                this.content = data.content
            })
        },
        onEditorChange({ editor, html, text }) {
            this.content = html
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
        }
    },
    computed: {
        editor() {
            return this.$refs.myTextEditor.quillEditor
        }
    }
}
</script>
<style scoped>
.post-title {
    margin-bottom: 20px;
}
</style>

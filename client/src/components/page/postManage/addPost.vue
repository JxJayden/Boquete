<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 文章管理</el-breadcrumb-item>
                <el-breadcrumb-item>添加</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="mgb20">
            <el-input v-model="title"
                      placeholder="请输入文章标题"
                      autofocus></el-input>
        </div>
        <quill-editor ref="myTextEditor"
                      v-model="content"
                      :config="editorOption"></quill-editor>
        <div class="mgt20">
            <el-button class="editor-btn"
                       type="primary"
                       @click="submit">提交</el-button>
        </div>
    </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import { _post } from '../../../lib/utils'
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
    methods: {
        onEditorChange({ editor, html, text }) {
            this.content = html
        },
        submit() {
            console.log(this.content)
            if (this.title === '') {
                this.$message.error('文章标题不能为空')
                return false
            }
            if (this.content === '') {
                this.$message.error('文章内容不能为空')
                return false
            }

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

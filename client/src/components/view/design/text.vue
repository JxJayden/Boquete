<template>
    <div>
        <quill-editor ref="myTextEditor"
                      v-model="textContent"
                      @blur="onEditorBlur"
                      :config="editorOption"></quill-editor>
    </div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor'

const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['link'],
    ['clean']
]
export default {
    name: 'text-component',
    props: ['content', 'moduleId'],
    data() {
        return {
            textContent: '',
            editorOption: {
                theme: 'snow',
                placeholder: ' 输入任何内容，支持 html',
                modules: {
                    toolbar: toolbarOptions
                }
            }
        }
    },
    components: {
        quillEditor
    },
    methods: {
        onEditorChange({ editor, html, text }) {
            this.textContent = html
        },
        onEditorBlur() {
            const content = '<div class=\"ql-editor\">' + this.textContent + '</div>'
            this.$emit('get-content', this.moduleId, content)
        }
    }
}
</script>

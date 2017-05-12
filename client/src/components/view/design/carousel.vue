<template>
    <div>
        <el-upload :action="uploadImgUrl"
                   list-type="picture-card"
                   :on-preview="handlePictureCardPreview"
                   :on-success="handleSuccess"
                   :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog v-model="dialogVisible"
                   size="tiny">
            <img width="100%"
                 :src="dialogImageUrl"
                 alt="">
        </el-dialog>
    </div>
</template>
<script>
import { API } from '../../../lib/config'
export default {
    name: 'carousel-component',
    props: ['content', 'moduleId'],
    data() {
        return {
            uploadImgUrl: API.UPLOAD_IMAGE,
            items: [],
            dialogImageUrl: '',
            dialogVisible: false,
            htmlContent: [
                '<div class=\"carousel carousel-slider\">',
                '</div>'
            ],
            returnData: []
        }
    },
    methods: {
        handleRemove(file, fileList) {
            this.items.splice(this.items.indexOf(file.content), 1)
            this.saveCarousel()
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url
            this.dialogVisible = true
        },
        handleSuccess(res, file) {
            const path = res.data.files[0].path
            const url = API.HOST + path.replace(/.*\/uploads/, 'uploads')

            file.url = url
            file.content = '<div class=\"carousel-item\"><img src=\"' + url + '\" /></div>'

            this.returnData.push(url)
            this.htmlContent[0] = this.htmlContent[0] + file.content

            this.items.push(file)
            this.saveCarousel(file)
        },
        saveCarousel(file) {
            const content = {
                type: 'carousel',
                content: this.htmlContent.join(''),
                data: this.returnData
            }

            this.$emit('get-content', this.moduleId, content)
        }
    }
}
</script>

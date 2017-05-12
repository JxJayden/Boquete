<template>
    <div class="module-image"
         ref="image">
        <el-upload class="image-uploader"
                   :action="uploadImgUrl"
                   :show-file-list="false"
                   :on-success="handleImageSuccess"
                   :before-upload="beforeImageUpload">
            <img v-if="imageUrl"
                 :src="imageUrl"
                 class="image">
            <i v-else
               class="el-icon-plus image-uploader-icon"></i>
        </el-upload>
    </div>
</template>
<script>
import { API } from '../../../lib/config'
export default {
    name: 'iamge-component',
    props: ['content', 'moduleId'],
    data() {
        return {
            uploadImgUrl: API.UPLOAD_IMAGE,
            imageUrl: '',
            returnData: [],
            htmlContent: ['<img class=\"responsive-img\" src=\"', '', '\" style=\"height: auto; width: 100%;\"/>']
        }
    },
    methods: {
        handleImageSuccess(res, file) {
            const path = res.data.files[0].path
            this.imageUrl = API.HOST + path.replace(/.*\/uploads/, 'uploads')
            this.htmlContent[1] = this.imageUrl
            this.returnData.push(this.imageUrl)
            this.saveImg(this.htmlContent.join(''), this.returnData)
        },
        beforeImageUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 2
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!')
            }
            return isLt2M
        },
        saveImg(htmlContent, data) {
            const content = {
                type: 'image',
                content: htmlContent,
                data: data
            }
            this.$emit('get-content', this.moduleId, content)
        }
    }
}
</script>
<style>

.image-uploader .el-upload {
    width: 100%;
    height: auto;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    overflow: visible;
}

.el-upload:hover {
    border-color: #20a0ff;
}

.image-uploader-icon {
    font-size: 40px;
    color: #8c939d;
    width: 100%;
    height: 400px;
    line-height: 400px;
    text-align: center;
}

.image {
    width: 100%;
    height: auto;
    display: block;
}
</style>

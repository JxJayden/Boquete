<template>
    <div class="module-image"
         ref="image">
        <div class="mgb20">
            <el-button type="danger"
                       icon="close"
                       @click="deleteModule"></el-button>
        </div>
        <el-upload :action="uploadImgUrl"
                   :show-file-list="false"
                   :on-success="handleAvatarSuccess"
                   :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl"
                 :src="imageUrl"
                 class="avatar">
            <i v-else
               class="el-icon-plus avatar-uploader-icon"></i>
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
            imageUrl: ''
        }
    },
    methods: {
        handleAvatarSuccess(res, file) {
            const path = res.data.files[0].path
            this.imageUrl = API.HOST + path.replace(/.*\/uploads/, 'uploads')
            this.saveImg(this.imageUrl)
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg'
            const isLt2M = file.size / 1024 / 1024 < 2

            if (!isJPG) {
                this.$message.error('上传图片只能是 JPG 格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!')
            }
            return isJPG && isLt2M
        },
        saveImg(imgUrl) {
            const contentTmp = '<img src="' + imgUrl + '" alt=""/>'
            this.$emit('get-content', this.moduleId, contentTmp)
        },
        deleteModule() {
            this.$emit('remove', this.moduleId)
        }
    }
}
</script>
<style scoped>

</style>

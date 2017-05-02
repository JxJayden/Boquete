<template>
    <div class="module-image"
         ref="image">
        <el-upload class="avatar-uploader"
                   :action="uploadImgUrl"
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
            const contentTmp = '<img class=\"responsive-img\" src=\"' + imgUrl + '\" />'
            this.$emit('get-content', this.moduleId, contentTmp)
        }
    }
}
</script>
<style>

.avatar-uploader .el-upload {
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

.avatar-uploader-icon {
    font-size: 40px;
    color: #8c939d;
    width: 100%;
    height: 400px;
    line-height: 400px;
    text-align: center;
}

.avatar {
    width: 100%;
    height: auto;
    display: block;
}
</style>

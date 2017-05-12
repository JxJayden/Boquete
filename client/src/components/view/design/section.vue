<template>
    <div>
        <el-row>
            <el-col :span="8" v-for="(item, index) in items">
                <div class="upload-wrapper">
                    <el-upload
                        class="image-uploader"
                        :action="uploadImgUrl"
                        :show-file-list="false"
                        :on-success="handleImageSuccess.bind(null, item)"
                        :before-upload="beforeImageUpload">
                        <img v-if="item.imageUrl" :src="item.imageUrl" class="image">
                        <i v-else class="el-icon-plus image-uploader-icon"></i>
                    </el-upload>
                </div>
                <div class="section-textarea-wrapper">
                    <textarea class="section-textarea" v-model="item.text" @blur="handleTextChange(item)"></textarea>
                </div>
            </el-col>
        </el-row>

    </div>
</template>
<script>
import { API } from '../../../lib/config'
export default {
    name: 'section-component',
    props: ['content', 'moduleId'],
    data() {
        return {
            uploadImgUrl: API.UPLOAD_IMAGE,
            imageUrl: '',
            items: [
                {
                    imageUrl: '',
                    text: '',
                    htmlContent: ['<div class=\"col s12 m4\"><div class=\"center\">',
                        '<img class=\"circle responsive-img center\" src=\"',
                        '',
                        '\" />',
                        '<p class=\"light\">',
                        '',
                        '</p></div></div>']
                },
                {
                    imageUrl: '',
                    text: '',
                    htmlContent: ['<div class=\"col s12 m4\"><div class=\"center\">',
                        '<img class=\"circle responsive-img center\" src=\"',
                        '',
                        '\" />',
                        '<p class=\"light\">',
                        '',
                        '</p></div></div>']
                },
                {
                    imageUrl: '',
                    text: '',
                    htmlContent: ['<div class=\"col s12 m4\"><div class=\"center\">',
                        '<img class=\"circle responsive-img center\" src=\"',
                        '',
                        '\" />',
                        '<p class=\"light\">',
                        '',
                        '</p></div></div>']
                }
            ],
            htmlContent: ['<div class=\"section container\"><div class=\"row\">', '', '</div></div>']
        }
    },
    methods: {
        handleImageSuccess(item, res, file) {
            const path = res.data.files[0].path
            item.imageUrl = API.HOST + path.replace(/.*\/uploads/, 'uploads')
            item.htmlContent[2] = item.imageUrl
            this.saveData(this.htmlContent, this.items)
        },
        beforeImageUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 2

            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!')
            }
            return isLt2M
        },
        saveData(htmlContent, items) {
            let tmp = ''
            items.forEach((element) => {
                tmp += element.htmlContent.join('')
            })
            htmlContent[1] = tmp
            const content = {
                type: 'section',
                content: htmlContent.join(''),
                data: items
            }
            this.$emit('get-content', this.moduleId, content)
        },
        handleTextChange(item) {
            item.htmlContent[5] = item.text
            this.saveData(this.htmlContent, this.items)
        }
    },
    computed: {

    }
}
</script>
<style scoped>
  .upload-wrapper {
      width: 178px;
      height: 178px;
      display: block;
      margin: auto;
  }
  .image-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .image-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .image-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .image {
    width: 178px;
    height: 178px;
    display: block;
  }
  .section-textarea-wrapper {
      width: 100%;
      height: 100px;
      margin: auto;
      padding-top: 10px;
      text-align: center;
  }
  .section-textarea {
      height: 100%;
      width: 80%;
  }
</style>

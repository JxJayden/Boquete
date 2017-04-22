<template>
    <div>
        <!--<el-carousel height="150px">-->
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
        <!--<el-carousel-item v-for="item in items">
                                            <img :src="item.imgUrl">
                                        </el-carousel-item>-->
        <!--</el-carousel>-->
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
            dialogVisible: false
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
            this.items.push(file.content)
            this.saveCarousel()
        },
        saveCarousel() {
            let contents = ''
            for (var i = 0; i < this.items.length; i++) {
                contents += this.items[i]
            }
            contents = '<div class=\"carousel carousel-slider\">' + contents + '</div>'
            this.$emit('get-content', this.moduleId, contents)
        }
    }
}
</script>

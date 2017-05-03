<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 设置</el-breadcrumb-item>
                <el-breadcrumb-item>基本设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form :model="website"
                     ref="websiteForm"
                     :rules="rules">
                <el-form-item label="网站名称"
                              prop="title">
                    <el-input v-model="website.title"
                              @change="handleChange"
                              auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="网站描述（description）"
                              prop="description">
                    <el-input v-model="website.description"
                              @change="handleChange"
                              auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="版权信息"
                              prop="copyright">
                    <el-input v-model="website.copyright"
                              @change="handleChange"
                              auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="关键字（keywords）"
                              prop="copyright">
                    <el-input v-model="website.keywords"
                              @change="handleChange"
                              auto-complete="off"></el-input>
                </el-form-item
                <el-form-item label="网站 logo">
                    <div style="clear: both;">
                        <el-upload class="logo-uploader"
                                   name="logo"
                                   :action="uploadLogoUrl"
                                   :with-credentials="true"
                                   :show-file-list="false"
                                   :on-error="handleLogoError"
                                   :on-success="handleLogoSuccess">
                            <img v-if="imageUrl"
                                 :src="imageUrl"
                                 class="logo">
                            <i v-else
                               class="el-icon-plus logo-uploader-icon"></i>
                        </el-upload>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                               :disabled="!isChange"
                               :loading="isLoading"
                               @click="onSubmit">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { API } from '../../../lib/config'
import { _put, _get } from '../../../lib/utils'
export default {
    data() {
        return {
            uploadLogoUrl: API.WEBSITELOGO,
            isChange: false,
            isLoading: false,
            imageUrl: '',
            change: {},
            website: {
                title: '',
                description: '',
                copyright: '',
                logo: '',
                keywords: ''
            },
            rules: {
                title: [{ required: true, message: '请输入网站名称', trigger: 'blur' }],
                description: [{ required: true, message: '请输入网站描述', trigger: 'blur' }],
                copyright: [{ required: true, message: '请输入网站版权信息', trigger: 'blur' }]
            }
        }
    },
    mounted() {
        this.getWebsiteInfo()
    },
    methods: {
        onSubmit() {
            this.isLoading = true
            const data = {
                _id: this.website._id,
                change: {
                    title: this.website.title,
                    description: this.website.description,
                    copyright: this.website.copyright,
                    keywords: this.website.keywords
                }
            }
            _put(this, API.WEBSITE, data, function (data) {
                this.isLoading = false
                this.isChange = false
                this.$message.success('提交成功！')
            })
        },
        getWebsiteInfo() {
            _get(this, API.WEBSITE, function (data) {
                this.website = data
                this.imageUrl = data.logo ? API.HOST + data.logo : ''
            })
        },
        handleChange() {
            this.isChange = true
        },
        handleLogoSuccess(res, file) {
            console.log(res)
            this.imageUrl = URL.createObjectURL(file.raw)
            this.$message.success('更新网站 logo 成功')
        },
        handleLogoError(res, file) {
            this.$message.error('提交失败！')
        }
    }
}
</script>
<style scope>
.logo-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 178px;
    height: 178px;
}

.logo-uploader .el-upload:hover {
    border-color: #20a0ff;
}

.logo-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.logo {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 设置</el-breadcrumb-item>
                <el-breadcrumb-item>导航栏</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form :rules="navRules"
                 ref="navForm"
                 class="nav-form"
                 v-for="(navigation, index) in navigations"
                 :model="navigation">
            <el-row :gutter="20">
                <el-col :span="11">
                    <el-form-item prop="label">
                        <el-input v-model="navigation.label"
                                  placeholder="导航栏名称">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item prop="url">
                        <el-input v-model="navigation.url"
                                  placeholder="导航栏链接">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="2">
                    <el-button type="danger"
                               @click="deleteNav(navigation)"
                               v-if="index + 1 !== navigations.length"
                               icon="delete"></el-button>
                    <el-button v-if="index + 1 === navigations.length"
                               icon="plus"
                               @click="addNav('navForm', index)"></el-button>
                </el-col>
            </el-row>
        </el-form>
        <el-dropdown @command="addCustomNav" trigger="click">
            <el-button type="primary">
                添加自定义页面<i class="el-icon-caret-bottom el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="(item, index) in pageItems" :command="String(index)">{{item.title}}</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-button type="primary" @click="addDefaultNav('post')">添加文章导航</el-button>
        <el-button type="success"
                   :loading="isSubmitBtnLoading"
                   @click="submitForm('navForm')">保存更改</el-button>
    </div>
</template>

<script>
import { API } from '../../../lib/config'
import { _put, _get, isArray } from '../../../lib/utils'
export default {
    data() {
        return {
            websiteUrl: '',
            navigations: [],
            isSubmitBtnLoading: false,
            newNav: {
                label: '',
                url: ''
            },
            navRules: {
                label: [{ required: true, message: '导航栏名称不能为空', trigger: 'blur' }],
                url: [{ required: true, message: '导航栏链接不能为空', trigger: 'blur' },
                { type: 'url', message: '导航栏链接格式错误', trigger: 'blur' }]
            },
            newNavRules: {
                label: [{ required: true, message: '导航栏名称不能为空' }],
                url: [{ required: true, message: '导航栏链接不能为空', trigger: 'blur' },
                { type: 'url', message: '导航栏链接格式错误', trigger: 'blur' }]
            },
            pageItems: []
        }
    },
    mounted() {
        this.getWebsiteNavInfo()
        this.getDefaultUrl()
        this.getPageData()
    },
    methods: {
        getWebsiteNavInfo() {
            _get(this, API.WEBSITENAV, function (data) {
                this.navigations = data.nav.concat([{
                    label: '',
                    url: ''
                }])
            })
        },
        getPageData() {
            _get(this, API.PAGE, function (data) {
                this.pageItems = data
            })
        },
        deleteNav(nav) {
            this.navigations.splice(this.navigations.indexOf(nav), 1)
        },
        addNav(formName, index, label, url) {
            this.checkOneFormAndCallBack(formName, index, this.pushNavArray)
        },
        pushNavArray(label, url) {
            this.navigations.push({
                label: label || '',
                url: url || ''
            })
        },
        updateChange() {
            this.isSubmitBtnLoading = true
            const data = {
                nav: this.navigations.slice(0, this.navigations.length - 1)
            }
            _put(this, API.WEBSITENAV, data, function () {
                this.getWebsiteNavInfo()
                this.isSubmitBtnLoading = false
            }, function () {
                this.isSubmitBtnLoading = false
            })
        },
        submitForm(formName) {
            this.checkAllFormAndCallBack(formName, this.updateChange)
        },
        checkAllFormAndCallBack(formName, cb) {
            const forms = this.$refs[formName]
            let isErr = false

            if (isArray(forms)) {
                for (let i = 0; i < forms.length - 1; i++) {
                    forms[i].validate((valid) => {
                        if (!valid) {
                            console.log('error submit!!')
                            isErr = true
                        }
                    })
                }

                if (!isErr) {
                    cb && cb()
                }
            }
        },
        checkOneFormAndCallBack(formName, index, cb) {
            const forms = this.$refs[formName]

            if (isArray(forms)) {
                forms[index].validate((valid) => {
                    if (valid) {
                        cb && cb()
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            }
        },
        resetForm(formName) {
            this.$refs[formName].resetFields()
        },
        getDefaultUrl() {
            _get(this, API.WEBSITEURL, function (data) {
                this.websiteUrl = data.url
            })
        },
        addDefaultNav(type) {
            console.log(arguments)
            this.navigations[this.navigations.length - 1] = {
                label: type,
                url: this.websiteUrl + '/' + type
            }
            this.pushNavArray()
        },
        addCustomNav(index) {
            const item = this.pageItems[index]
            this.navigations[this.navigations.length - 1] = {
                label: item.title,
                url: item.url
            }
            this.pushNavArray()
        }
    }
}
</script>
<style scope>

</style>

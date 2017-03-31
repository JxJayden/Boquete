<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i> 主页</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <a :href="websiteUrl"
           target="_blank">{{title}}</a>
    </div>
</template>
<script>
import { api } from '../../lib/config'
import { axiosGet } from '../../lib/utils'
export default {
    data() {
        return {
            websiteUrl: '',
            title: ''
        }
    },
    mounted() {
        this.getWebsiteUrl()
    },
    methods: {
        getWebsiteUrl() {
            axiosGet(this, api.websiteUrl, function (data) {
                this.websiteUrl = data.value.url
                this.title = data.value.title
            })
        }
    }
}
</script>

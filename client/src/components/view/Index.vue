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
import { API } from '../../lib/config'
import { _get } from '../../lib/utils'
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
            _get(this, API.WEBSITEURL, function (data) {
                this.websiteUrl = data.url
                this.title = data.title
            })
        }
    }
}
</script>

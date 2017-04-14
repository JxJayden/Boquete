<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes"
                 theme="dark"
                 unique-opened
                 router>
            <el-menu-item index="home">
                <i class="el-icon-setting"></i>主页
            </el-menu-item>
            <!--<el-submenu index="2">
                <template slot="title"><i class="el-icon-menu"></i>表格</template>
                <el-menu-item index="basetable">基础表格</el-menu-item>
                <el-menu-item index="vuetable">Vue表格组件</el-menu-item>
            </el-submenu>-->
            <!--<el-submenu index="3">
                <template slot="title"><i class="el-icon-date"></i>表单</template>
                <el-menu-item index="baseform">基本表单</el-menu-item>
                <el-menu-item index="vueeditor">编辑器</el-menu-item>
                <el-menu-item index="markdown">markdown</el-menu-item>
                <el-menu-item index="upload">文件上传</el-menu-item>
            </el-submenu>-->
            <!--<el-submenu index="4">
                    <template slot="title"><i class="el-icon-star-on"></i>图表</template>
                    <el-menu-item index="basecharts">基础图表</el-menu-item>
                    <el-menu-item index="mixcharts">混合图表</el-menu-item>
                </el-submenu>-->
            <el-submenu index="4">
                <template slot="title"><i class="el-icon-star-on"></i>页面管理</template>
                <el-menu-item index="pagelist">页面列表</el-menu-item>
                <el-menu-item index="addpage">添加页面</el-menu-item>
            </el-submenu>
            <el-submenu index="5">
                <template slot="title"><i class="el-icon-edit"></i>文章管理</template>
                <el-menu-item index="postlist">文章列表</el-menu-item>
                <el-menu-item index="addpost">添加文章</el-menu-item>
            </el-submenu>
            <el-submenu index="6">
                <template slot="title"><i class="el-icon-setting"></i>设置</template>
                <!--<el-menu-item index="usermanage">管理员设置</el-menu-item>-->
                <el-menu-item index="basicmanage">基本设置</el-menu-item>
                <el-menu-item index="navmanage">导航栏设置</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
export default {
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '')
        }
    }
}
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    width: 250px;
    left: 0;
    top: 70px;
    bottom: 0;
    background: #2E363F;
}

.sidebar>ul {
    height: 100%;
}
</style>

<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" theme="dark" unique-opened router>

            <el-menu-item index="/home">
                <i class="el-icon-setting"></i>主页
            </el-menu-item>
            <el-menu-item index="/page/list">
                <i class="el-icon-document"></i>页面管理
            </el-menu-item>
            <el-menu-item index="/chat/list">
                <i class="el-icon-message"></i>在线咨询回复
            </el-menu-item>
            <el-submenu index="5">
                <template slot="title"><i class="el-icon-edit"></i>文章管理</template>
                <el-menu-item index="/post/list">文章列表</el-menu-item>
                <el-menu-item index="/post/add">添加文章</el-menu-item>
            </el-submenu>
            <el-submenu index="6">
                <template slot="title"><i class="el-icon-setting"></i>设置</template>
                <el-menu-item index="/setting/basic">基本设置</el-menu-item>
                <el-menu-item index="/setting/password">密码设置</el-menu-item>
                <el-menu-item index="/setting/nav">导航栏设置</el-menu-item>
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
    width: 200px;
    left: 0;
    top: 70px;
    bottom: 0;
    background: #2E363F;
}

.sidebar>ul {
    height: 100%;
}
</style>

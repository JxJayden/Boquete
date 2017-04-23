import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        redirect: '/login'
    },
    {
        path: '/home',
        component: resolve => require(['../components/common/Home.vue'], resolve),
        children: [{
            path: '/',
            component: resolve => require(['../components/view/Index.vue'], resolve)
        },
        {
            path: '/basetable',
            component: resolve => require(['../components/view/BaseTable.vue'], resolve)
        },
        {
            path: '/vuetable',
            component: resolve => require(['../components/view/VueTable.vue'], resolve) // vue-datasource组件
        },
        {
            path: '/baseform',
            component: resolve => require(['../components/view/BaseForm.vue'], resolve)
        },
        {
            path: '/vueeditor',
            component: resolve => require(['../components/view/VueEditor.vue'], resolve) // Vue-Quill-Editor组件
        },
        {
            path: '/markdown',
            component: resolve => require(['../components/view/Markdown.vue'], resolve) // Vue-Quill-Editor组件
        },
        {
            path: '/upload',
            component: resolve => require(['../components/view/Upload.vue'], resolve) // Vue-Core-Image-Upload组件
        },
        {
            path: '/basecharts',
            component: resolve => require(['../components/view/BaseCharts.vue'], resolve) // vue-echarts-v3组件
        },
        {
            path: '/mixcharts',
            component: resolve => require(['../components/view/MixCharts.vue'], resolve) // vue-echarts-v3组件
        },
        // setting
        {
            name: 'basicSetting',
            path: '/setting/basic',
            component: resolve => require(['../components/view/setting/basic.vue'], resolve)
        },
        {
            name: 'navSetting',
            path: '/setting/nav',
            component: resolve => require(['../components/view/setting/nav.vue'], resolve)
        },
        // post
        {
            name: 'editPost',
            path: '/post/edit/:id',
            component: resolve => require(['../components/view/post/edit.vue'], resolve)
        },
        {
            name: 'addPost',
            path: '/post/add',
            component: resolve => require(['../components/view/post/edit.vue'], resolve)
        },
        {
            name: 'allPost',
            path: '/post/list',
            component: resolve => require(['../components/view/post/list.vue'], resolve)
        },
        // page
        {
            name: 'addPage',
            path: '/page/add',
            component: resolve => require(['../components/view/page/edit.vue'], resolve)
        },
        {
            name: 'allPage',
            path: '/page/list',
            component: resolve => require(['../components/view/page/list.vue'], resolve)
        },
        {
            name: 'editPage',
            path: '/page/edit/:id',
            component: resolve => require(['../components/view/page/edit.vue'], resolve)
        },
        {
            name: 'chat',
            path: '/chat',
            component: resolve => require(['../components/view/chat.vue'], resolve)
        }]
    },
    {
        path: '/login',
        component: resolve => require(['../components/view/Login.vue'], resolve)
    },
    {
        path: '/register',
        component: resolve => require(['../components/view/Register.vue'], resolve)
    }]
})

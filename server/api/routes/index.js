const config = require('../lib/config'),
    router = require('koa-router')({
        prefix: config.route_prefix
    }),
    user = require('./user/index'),
    base = require('./base/index'),
    website = require('./website/index'),
    file = require('./file/index'),
    page = require('./pages/index'),
    post = require('./post/index'),
    register = user.register,
    login = user.login,
    logout = user.logout

router
    // base router
    .get('/verify-img', base.verify_img)
    // login & register & logout router
    .post('/login', login)
    .post('/register', register)
    .get('/logout', logout)
    // 用户管理
    .post('/user', user.isRoot, user.add)
    .get('/user', user.get)
    .put('/user', user.isRoot, user.update)
    .delete('/user', user.isRoot, user.delete)
    // 网站信息管理
    .get('/website', website.get)
    .put('/website', website.update)
    .get('/website/url', website.get_url)
    .post('/website/logo', website.upload_logo)
    // 网站导航栏管理
    .get('/website/nav', website.get_nav)
    // .post('/website/nav', website.add_nav)
    .put('/website/nav', website.update_nav)
    // .delete('/website/nav', website.del_nav)
    // 文件管理
    .post('/image', file.upload)
    // 文章管理
    .get('/post', post.get)
    .post('/post', post.add)
    .put('/post', post.update)
    .delete('/post', post.delete)
    // 页面管理
    .get('/page', page.get)
    .post('/page', page.add)
    .put('/page', page.update)
    .delete('/page', page.delete)

module.exports = router

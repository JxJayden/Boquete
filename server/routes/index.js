const config = require('../lib/config'),
    router = require('koa-router')({
        prefix: config.route_prefix
    }),
    user = require('./user/index'),
    base = require('./base/index'),
    website = require('./website/index'),
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
    .get('/website/url', website.get_url)
    .put('/website', website.update)


module.exports = router

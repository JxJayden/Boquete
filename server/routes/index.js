const router = require('koa-router')({
        prefix: 'v1/'
    }),
    login = require('./user/login'),
    register = require('./user/register'),
    team = require('./teams/index'),
    base = require('./base/index')

router
    // base router
    .get('verify-img', base.verify_img)
    // user router
    .post('login', login)
    .post('register', register)
    // team routers
    .post('teams', team.add)
    .get('teams', team.get)

module.exports = router

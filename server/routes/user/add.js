const db   = require('../../models/index'),
    router = require('koa-router')(),
    logger = require('../../lib/log'),
    cry    = require('../../lib/cryptology'),
    config = require('../../config'),
    utils  = require('../../lib/utils')

router.post('/', async function(ctx) {
    let newUser = {
        team: 0,
        username: ctx.request.body.username,
        password: ctx.request.body.password,
        isRoot: ctx.request.body.isRoot,
        limits:  ctx.request.body.isRoot ? // 超级用户拥有所有权限
            config.limits :
            ctx.request.body.limits ?
            JSON.parse(ctx.request.body.limits) :
            []
    }
    let currentUserId = cry.decrypt(ctx.cookies.get('user')),
        body

    // 对 username 和 password 做判断
    if (!newUser.username || !newUser.password) {

        body = {
            error: true,
            message: !newUser.password ?
                'password is required' :
                'username is required',
            code: -1,
            data: {}
        }

    } else if (!utils.isArray(newUser.limits)) { // 对 limits 是否为数组做判断

        body = {
            error: true,
            message: 'limits must be Array',
            code: -1,
            data: {}
        }

    } else {
        body = await db.userModel.count({ username: newUser.username }).exec().then((value) => {

            if (value && value > 0) {
                throw {
                    error: true,
                    message: `${newUser.username} is exist!`,
                    code: -2,
                }
            } else {
                return db.userModel.findOne({ _id: currentUserId }, 'username isRoot').exec()
            }
        }).then((value) => {

            if (!value.isRoot) {
                throw {
                    error: true,
                    message: '无添加账户的权限',
                    code: -1,
                }
            } else {
                newUser.team = value._id
                return true
            }
        }).then(() => {
            return new db.userModel(newUser).save()
        }).then((value) => {

            return {
                error: false,
                message: 'succeed',
                code: 200,
                data: {
                    user: value
                }
            }

        }).catch((err) => {

            logger.error(err)
            return {
                error: true,
                message: err.message,
                code: err.code || -3,
                data: {}
            }
        })
    }
    ctx.body = body
})

module.exports = router

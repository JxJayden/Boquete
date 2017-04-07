const db = require('../../../models/index'),
    router = require('koa-router')(),
    logger = require('../../lib/log'),
    cry = require('../../lib/cryptology'),
    utils = require('../../lib/utils')

router.post('/', async function (ctx) {
    let newUser = {
            team: 0,
            username: ctx.request.body.username,
            password: ctx.request.body.password,
            isRoot: ctx.request.body.isRoot || false,
            limits: ctx.request.body.limits ?
                JSON.parse(ctx.request.body.limits) : []
        },
        currentUserId = cry.decrypt(ctx.cookies.get('user')),
        body, userCount, currentUser

    try {
        if (!newUser.username || !newUser.password) {

            throw {
                message: !newUser.password ?
                    'password is required' : 'username is required',
                code: -1
            }

        }
        if (!utils.isArray(newUser.limits)) { // 对 limits 是否为数组做判断

            throw {
                message: 'limits must be Array',
                code: -1
            }

        }

        userCount = await db.userModel.count({
            username: newUser.username
        }).exec()

        if (userCount && userCount > 0) {
            throw {
                message: `${newUser.username} is exist!`,
                code: -2,
            }
        }

        currentUser = await db.userModel.findOne({
            _id: currentUserId
        }, 'username isRoot team').exec()

        if (!currentUser.isRoot) {
            throw {
                message: '无添加账户的权限',
                code: -1,
            }
        }

        newUser.team = currentUser.team
        await new db.userModel(newUser).save()

    } catch (err) {
        logger.error(err)
        return {
            err: true,
            message: err.message,
            code: err.code || -3,
            data: {}
        }
    }
    // 对 username 和 password 做判断

    ctx.body = body
})

// module.exports = router

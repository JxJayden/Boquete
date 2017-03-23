const db   = require('../../models/index'),
    router = require('koa-router')(),
    logger = require('../../lib/log'),
    cry    = require('../../lib/cryptology')

router.put('/', async function(ctx) {
    let _id = ctx.request.body._id
    let currentUserId = cry.decrypt(ctx.cookies.get('user'))
    let change = ctx.request.body.change ? JSON.parse(ctx.request.body.change) : false
    let body

    if (!change) {
        body = {
            err: true,
            message: '没有做出更改！',
            code: -1
        }
    } else if (currentUserId) {
        body = await db.userModel.findOne({ _id: currentUserId }, 'username limits').exec().then((value) => {
            // do some judge
            if (value.limits) {
                logger.info(`做出修改操作的用户为 ${value.username}`)
                return db.userModel.update({ _id: _id }, { $set: change }).exec()
            } else {
                throw {
                    err: true,
                    message: '没有权限！',
                    code: -2
                }
            }

        }).then(() => {

            return {
                err: false,
                message: 'update done',
                code: 200
            }

        }).catch((err) => {

            logger.error(err)
            return {
                err: true,
                message: err.message,
                code: err.code || -4
            }
        })

    } else {
        ctx.cookies.set('sessionId', null)
        ctx.cookies.set('user', null)
        ctx.cookies.set('limits', null)

        body = {
            err: true,
            message: '会话过期，请登录重试',
            code: -2
        }
    }

    ctx.body = body
})

module.exports = router

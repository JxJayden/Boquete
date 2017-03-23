const db = require('../../models/index'),
    router = require('koa-router')(),
    logger = require('../../lib/log'),
    config = require('../../lib/config')

router.post('/', async function (ctx) {
    let newUser = {
            mail: ctx.request.body.mail,
            username: ctx.request.body.username,
            password: ctx.request.body.password,
            isRoot: true,
            limits: config.limits
        },
        body

    try {
        if (!newUser.mail || !newUser.username || !newUser.password) {

            throw {
                message: !newUser.mail ?
                    'mail is required' :
                    !newUser.username ?
                    'username is required' : 'password is required',
                code: -1
            }

        }

        await db.userModel.hasUserBymail(newUser.mail)
        await new db.userModel(newUser).save()

        delete newUser.password
        delete newUser.limits
        delete newUser.isRoot

        body = {
            err: false,
            message: 'register succeed',
            data: {
                newUser
            }
        }
    } catch (err) {
        logger.error(err)
        body = {
            error: true,
            message: err.message,
            code: err.code || -3,
            data: {}
        }
    }
    ctx.body = body
})

module.exports = router

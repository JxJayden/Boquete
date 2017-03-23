const db = require('../../models/index'),
    router = require('koa-router')(),
    logger = require('../../lib/log'),
    cry = require('../../lib/cryptology'),
    config = require('../../lib/config')

router.post('/', async function (ctx) {
    let mail = ctx.request.body.mail,
        password = ctx.request.body.password,
        verifyCode = ctx.request.body.verify,
        cookiesVerifyCode = ctx.cookies.get('verify'),
        loginUser

    try {
        if (!config.production) {
            if (!verifyCode || !cookiesVerifyCode) {
                throw {
                    message: '无验证码',
                    code: -1
                }
            }

            if (cry.encrypt(verifyCode) !== cookiesVerifyCode) {
                throw {
                    message: '验证码错误，请重试！',
                    code: -1
                }
            }
        }



        loginUser = await db.userModel.login(mail, password)

        logger.info(loginUser)

        config.production && ctx.cookies.set('verify', null)
        ctx.cookies.set('sessionId', cry.encrypt(new Date().getTime().toString()))
        ctx.cookies.set('user', cry.encrypt(String(loginUser._id)))
        ctx.cookies.set('limits', cry.encrypt(JSON.stringify(loginUser.limits)))
        ctx.body = {
            err: false,
            code: 200,
            message: 'login succeed',
            data: {
                limits: loginUser.limits,
                isRoot: loginUser.isRoot
            }
        }
    } catch (err) {
        logger.error(err)
        config.production && ctx.cookies.set('verify', null)
        ctx.body = {
            err: true,
            code: err.code || -3,
            message: err.message,
            data: {}
        }
    }
})

module.exports = router

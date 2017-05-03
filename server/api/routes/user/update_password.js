const db = require('../../../models/index'),
    logger = require('../../../lib/log')('password-update'),
    cry = require('../../lib/cryptology')

module.exports = async function (ctx) {
    let userId = cry.decrypt(ctx.cookies.get('user')),
        newPassword = ctx.request.body.password,
        body, userData

    try {
        userData = await db.userModel.findById(userId).exec()
        userData.password = newPassword
        userData.save()

        body = {
            err: false,
            code: 200,
            message: '修改用户密码成功',
            data: {
                ok: 1
            }
        }
        ctx.cookies.set('sessionId', null)
        ctx.cookies.set('user', null)
        ctx.cookies.set('limits', null)
    } catch (err) {
        logger.error(err)
        body = {
            err: true,
            code: err.code || -4,
            message: err.message,
            data: {}
        }
    }

    ctx.body = body
}

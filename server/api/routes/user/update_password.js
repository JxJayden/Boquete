const db = require('../../../models/index'),
    logger = require('../../../lib/log')('password-update'),
    cry = require('../../lib/cryptology')

module.exports = async function (ctx) {
    let userId = cry.decrypt(ctx.cookies.get('user')),
        newPassword = ctx.request.body.password,
        body, dbVal

    try {
        dbVal = await db.userModel.update({
            _id: userId
        }, {
            $set: {
                password: newPassword
            }
        }).exec()

        body = {
            err: false,
            code: 200,
            message: '修改用户密码成功',
            data: dbVal
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

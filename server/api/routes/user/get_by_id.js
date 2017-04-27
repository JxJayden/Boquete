/**
 * 获取用户信息
 */
const db = require('../../../models/index'),
    logger = require('../../../lib/log')('user get'),
    cry = require('../../lib/cryptology')

module.exports = async function (ctx) {
    let userId = cry.decrypt(ctx.cookies.get('user')),
        body, dbVal

    try {
        dbVal = await db.userModel.findById(userId, {
            _id: 1,
            username: 1,
            limits: 1,
            isRoot: 1
        }).exec()

        if (dbVal === null) {
            throw {
                message: 'no user'
            }
        }

        body = {
            err: false,
            code: 200,
            message: 'succeed',
            data: dbVal
        }

    } catch (err) {
        logger.error(err)
        body = {
            err: true,
            code: -4,
            message: err.message,
            data: {}
        }
    }
    ctx.body = body
}

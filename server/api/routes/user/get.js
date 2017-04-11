/**
 * 获取用户信息
 */
const db = require('../../../models/index'),
    logger = require('../../lib/log').getLogger('user get')

module.exports = async function (ctx) {
    let conditions = ctx.query.id ?
        { _id: ctx.query.id } :
        {},
        body, dbVal

    try {
        dbVal = await db.userModel.find(conditions, {
            _id: 1,
            username: 1,
            limits: 1,
            isRoot: 1
        }).exec()

        if (dbVal === null) { throw { message: 'no user' } }

        body = {
            err: false,
            code: 200,
            message: 'succeed',
            data: {
                users: dbVal
            }
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

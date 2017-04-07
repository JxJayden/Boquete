/**
 * 删除管理员
 */
const db = require('../../../models/index'),
    logger = require('../../lib/log')

module.exports = async function (ctx) {
    let _id = ctx.request.body._id,
        body, dbVal

    try {
        if (!_id) throw { code: -4, message: '没有用户 ID' }

        dbVal = await db.userModel.remove({ _id: _id, isRoot: false }).exec()

        if (dbVal.result.ok == 1 && dbVal.result.n == 0) throw { message: '无该用户' }

        body = {
            err: false,
            message: '删除成功',
            code: 200,
            data: dbVal.result
        }

    } catch (err) {
        logger.error(err)
        body = {
            err: true,
            message: err.message,
            code: err.code || -1
        }
    }
    ctx.body = body
}

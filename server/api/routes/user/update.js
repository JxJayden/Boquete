const db = require('../../../models/index'),
    logger = require('../../../lib/log')('user-update'),
    utils = require('../../lib/utils')

module.exports = async function (ctx) {
    let _id = ctx.request.body._id
    let change = ctx.request.body.change
    let body, dbVal

    try {
        if (!_id) throw { message: '没有用户 ID', code: -4 }
        if (!change) throw { message: '没有做出改变', code: -4 }
        if (!utils.isObject(change)) change = JSON.parse(change)

        dbVal = await db.userModel.update({ _id: _id }, { $set: change }).exec()

        body = {
            err: false,
            code: 200,
            message: '修改用户信息成功',
            data: dbVal
        }
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

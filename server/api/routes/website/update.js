const db = require('../../../models/index'),
    logger = require('../../lib/log'),
    utils = require('../../lib/utils')

module.exports = async function (ctx) {
    let _id = ctx.request.body._id
    let change = ctx.request.body.change
    let body, dbVal

    try {
        if (!_id)  throw { message: '没有获取到网站', code: -4 }

        if (!change) throw { message: '没有做出改变', code: -4 }

        if (!utils.isObject(change)) change = JSON.parse(change)

        if (change.owner) throw { message: '不允许修改网站所有者', code: -4 }

        dbVal = await db.websiteModel.update({ _id: _id }, { $set: change }).exec()

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

const db = require('../../models/index'),
    logger = require('../../lib/log'),
    utils = require('../../lib/utils')

module.exports = async function (ctx) {
    let _id = ctx.request.body._id
    let change = ctx.request.body.change ? JSON.parse(ctx.request.body.change) : false
    let body

    try {
        if (!_id) {
            throw {
                message: '没有用户 ID',
                code: -4
            }
        }

        if (!change && !utils.isObject(change)) {
            throw {
                message: '没有做出改变',
                code: -4
            }
        }

        await db.userModel.update({
            _id: _id
        }, {
            $set: change
        }).exec().then((value) => {
            body = {
                err: false,
                code: 200,
                message: '修改用户信息成功',
                data: {
                    value
                }
            }
        }).catch((err) => {
            throw {
                message: err.message,
                code: -3
            }
        })

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

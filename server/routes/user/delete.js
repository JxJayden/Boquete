/**
 * 删除管理员
 */
const db = require('../../models/index'),
    logger = require('../../lib/log')

module.exports = async function (ctx) {
    let _id = ctx.request.body._id,
        body

    try {
        if (!_id) {
            throw {
                code: -4,
                message: '没有用户 ID'
            }
        }

        await db.userModel.remove({
            _id: _id,
            isRoot: false
        }).exec().then((value) => {
            body = {
                err: false,
                message: '删除成功',
                code: 200,
                data: {
                    value
                }
            }
        }).catch((err) => {
            throw err
        })
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

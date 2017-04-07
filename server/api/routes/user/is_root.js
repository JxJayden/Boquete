const db = require('../../../models/index'),
    logger = require('../../lib/log'),
    cry = require('../../lib/cryptology')

module.exports = async function (ctx, next) {
    let currentUserId = ctx.cookies.get('user') || null,
        isRoot

    try {
        if (!currentUserId) throw { message: '请先登录' }

        currentUserId = cry.decrypt(ctx.cookies.get('user'))
        isRoot = await db.userModel.isRoot(currentUserId)

        if (!isRoot) throw { message: '无修改权限' }

        await next()

    } catch (err) {
        logger.error(err)
        ctx.body = {
            err: true,
            message: err.message,
            code: -3,
            data: {}
        }
    }
}

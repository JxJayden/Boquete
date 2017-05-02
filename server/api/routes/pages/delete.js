const db = require('../../../models/index'),
    logger = require('../../../lib/log')('post-delete'),
    cry = require('../../lib/cryptology')

module.exports = async function (ctx) {
    logger.debug(ctx.request.body)
    let userId = cry.decrypt(ctx.cookies.get('user')), // eslint-disable-line
        pageId = ctx.request.body.id,
        body, dbVal

    try {
        if (!pageId) {
            throw {
                message: '无页面 id'
            }
        }

        dbVal = await db.pageModel.findByIdAndRemove(pageId).exec()

        body = {
            err: false,
            message: 'delete page succeed',
            code: 200,
            data: dbVal
        }
    } catch (err) {
        logger.error(err)
        body = {
            err: true,
            message: err.message,
            code: err.code || -3,
            data: {}
        }
    }
    ctx.body = body
}

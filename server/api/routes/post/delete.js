const db = require('../../../models/index'),
    logger = require('../../../lib/log')('post-delete'),
    cry = require('../../lib/cryptology'),
    utils = require('../../lib/utils')


module.exports = async function (ctx) {
    logger.debug(ctx.request.body)
    let userId = cry.decrypt(ctx.cookies.get('user')), // eslint-disable-line
        postId = ctx.request.body.id,
        body, dbVal

    try {
        if (!postId) {
            throw {
                message: '无文章 id'
            }
        }

        dbVal = await db.postModel.findByIdAndRemove(postId).exec()

        body = {
            err: false,
            message: 'delete post succeed',
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

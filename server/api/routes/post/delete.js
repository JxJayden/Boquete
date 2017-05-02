const db = require('../../../models/index'),
    logger = require('../../../lib/log')('post-delete'),
    cry = require('../../lib/cryptology')

module.exports = async function (ctx) {
    let userId = cry.decrypt(ctx.cookies.get('user')), // eslint-disable-line
        { id: postId } = ctx.request.body,
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

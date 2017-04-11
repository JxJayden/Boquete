const db = require('../../../models/index'),
    logger = require('../../lib/log').getLogger('post update'),
    cry = require('../../lib/cryptology')

module.exports = async function (ctx) {
    logger.debug(ctx.request.body)
    let content = ctx.request.body.content,
        title = ctx.request.body.title,
        userId = cry.decrypt(ctx.cookies.get('user')),
        postId = ctx.request.body.id,
        body, dbVal

    try {
        if (!postId) {
            throw {
                message: '无文章 id'
            }
        }

        if (!content) {
            throw {
                message: '无文章内容'
            }
        }

        if (!title) {
            throw {
                message: '无文章标题'
            }
        }

        dbVal = await db.postModel.update({
            _id: postId,
            owner: userId
        }, {
            $set: {
                title: title,
                content: content
            }
        }).exec()

        body = {
            err: false,
            message: 'update post succeed',
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

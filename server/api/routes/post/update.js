const db = require('../../../models/index'),
    logger = require('../../../lib/log')('post-update'),
    cry = require('../../lib/cryptology')

module.exports = async function (ctx) {
    let { content, title, id } = ctx.request.body,
        userId = cry.decrypt(ctx.cookies.get('user')), // eslint-disable-line
        body, dbVal

    try {
        if (!id) {
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

        dbVal = await db.postModel.findByIdAndUpdate(id, {
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

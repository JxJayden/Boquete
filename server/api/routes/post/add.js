const db = require('../../../models/index'),
    logger = require('../../../lib/log')('post-add'),
    cry = require('../../lib/cryptology')

module.exports = async function (ctx) {
    let content = ctx.request.body.content,
        title = ctx.request.body.title,
        userId = cry.decrypt(ctx.cookies.get('user')),
        body, dbVal, authorInfo

    try {
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
        authorInfo = await db.userModel.findById(userId).exec()

        dbVal = await new db.postModel({
            title: title,
            content: content,
            author: userId,
            authorName: authorInfo.username,
            owner: userId
        }).save()

        body = {
            err: false,
            message: 'add post succeed',
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

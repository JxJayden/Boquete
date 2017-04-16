const db = require('../../../models/index'),
    logger = require('../../../lib/log')('post update'),
    cry = require('../../lib/cryptology')

module.exports = async function (ctx) {
    let content = ctx.request.body.content || '',
        title = ctx.request.body.title || '',
        userId = cry.decrypt(ctx.cookies.get('user')), // eslint-disable-line
        pageId = ctx.request.body.id,
        body, dbVal

    try {
        if (!pageId) {
            throw {
                message: '无页面 id'
            }
        }

        dbVal = await db.pageModel.findByIdAndUpdate(pageId, {
            $set: {
                title: title,
                content: content
            }
        }).exec()

        body = {
            err: false,
            message: 'update page succeed',
            code: 200,
            data: Object.assign(dbVal, {
                content: content,
                title: title
            })
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

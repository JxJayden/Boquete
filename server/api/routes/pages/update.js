const db = require('../../../models/index'),
    logger = require('../../../lib/log')('post update'),
    cry = require('../../lib/cryptology')

module.exports = async function (ctx) {
    let modules = ctx.request.body.content || [],
        userId = cry.decrypt(ctx.cookies.get('user')), // eslint-disable-line
        pageId = ctx.request.body.id,
        content = '',
        body,
        dbVal

    try {
        if (!pageId) {
            throw {message: '无页面 id'}
        }

        modules.forEach((value) => {
            content += value.content
        })

        dbVal = await db
            .pageModel
            .findByIdAndUpdate(pageId, {
                $set: {
                    content: content,
                    modules: modules
                }
            })
            .exec()

        body = {
            err: false,
            message: 'update page succeed',
            code: 200,
            data: Object.assign(dbVal, {
                content: content
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

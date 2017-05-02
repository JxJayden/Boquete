const db = require('../../../models/index'),
    logger = require('../../../lib/log')('post-update-draft')

module.exports = async function (ctx) {
    let { id, draft = false } = ctx.request.body,
        body, dbVal

    try {
        if (!id) {
            throw {
                message: '无文章 id'
            }
        }

        dbVal = await db.postModel.findByIdAndUpdate(id, {
            $set: {
                _draft: draft
            }
        }).exec()

        body = {
            err: false,
            message: 'update post draft succeed',
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

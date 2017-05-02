const db = require('../../../models/index'),
    logger = require('../../../lib/log')('post-get')

module.exports = async function (ctx) {
    let id = ctx.request.body.id,
        body, dbVal

    try {

        dbVal = await db.chatModel.findByIdAndUpdate(id, {
            $set: {
                history: []
            }
        }).exec()

        body = {
            err: false,
            message: 'clean chat history succeed',
            code: 200,
            data: dbVal
        }

    } catch (err) {
        logger.error(err)
        body = {
            err: true,
            message: err.message,
            code: -2,
            data: {}
        }
    }
    ctx.body = body
}

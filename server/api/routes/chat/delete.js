const db = require('../../../models/index'),
    logger = require('../../../lib/log')('post-get'),
    cry = require('../../lib/cryptology')

module.exports = async function (ctx) {
    let id = ctx.request.body.id,
        body, dbVal

    try {

        dbVal = await db.chatModel.findByIdAndRemove(id).exec()

        body = {
            err: false,
            message: 'get post info succeed',
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

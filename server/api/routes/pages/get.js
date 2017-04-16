const db = require('../../../models/index'),
    logger = require('../../../lib/log')('post-get'),
    cry = require('../../lib/cryptology')

module.exports = async function (ctx) {
    let userId = cry.decrypt(ctx.cookies.get('user')),
        pageId = ctx.query.id,
        body, dbVal

    try {
        if (!pageId) {
            dbVal = await db.pageModel.find({
                owner: userId
            }).exec()
        } else {
            dbVal = await db.pageModel.find({
                owner: userId,
                _id: pageId
            }).exec()
        }

        body = {
            err: false,
            message: 'get page info succeed',
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

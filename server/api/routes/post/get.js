const db = require('../../../models/index'),
    logger = require('../../../lib/log')('post-get'),
    cry = require('../../lib/cryptology')

module.exports = async function (ctx) {
    let userId = cry.decrypt(ctx.cookies.get('user')),
        { id: postId } = ctx.query,
        body, dbVal

    try {
        if (!postId) {
            dbVal = await db.postModel.find({
                owner: userId
            }).exec()
        } else {
            dbVal = await db.postModel.findOne({
                owner: userId,
                _id: postId
            }).exec()
        }

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

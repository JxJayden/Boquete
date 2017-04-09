const logger = require('../../lib/log'),
    db = require('../../../models/index')

module.exports = async(ctx, next) => {
    let post = await db.postModel.findById(ctx.params.postId).exec()
    ctx.body = post
}

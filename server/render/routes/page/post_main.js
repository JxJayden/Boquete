const logger = require('../../../lib/log')('router-postmain'),
    db = require('../../../models/index')

module.exports = async(ctx) => {
    try {
        let post = await db.postModel.findById(ctx.params.postId).exec()

        await ctx.render('./page/post_main', {
            post: post
        })
    } catch (err) {
        logger.error(err)
        await ctx.render('./error', {
            message: err.message,
            error: {
                status: err.status || 500
            }
        })
    }
}

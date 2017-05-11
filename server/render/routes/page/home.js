const logger = require('../../../lib/log')('router-home')

module.exports = async(ctx) => {
    try {
        await ctx.render('./page/index', {})
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

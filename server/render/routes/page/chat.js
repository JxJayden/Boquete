const logger = require('../../../lib/log')('router-home')

module.exports = async(ctx) => {
    try {
        let webSiteInfo = ctx.websiteInfo

        await ctx.render('./page/chat', {})
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

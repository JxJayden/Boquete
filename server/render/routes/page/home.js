const logger = require('../../../lib/log')('router-home'),
    db = require('../../../models/index')

module.exports = async(ctx) => {
    let pageData = await db.pageModel.findOne({
        website: ctx.params.websiteId,
        type: 'home'
    }).exec()

    logger.info(pageData)
    if (pageData) {
        await ctx.render('./page/page_main', {
            page: {
                content: pageData.content
            }
        })
    } else {
        await ctx.render('./page/index', {})
    }
}

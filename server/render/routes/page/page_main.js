const logger = require('../../../lib/log')('router-pagemain'),
    db = require('../../../models/index')

module.exports = async(ctx) => {
    try {
        // let webSiteInfo = ctx.websiteInfo
        let pageData = await db.pageModel.findById(ctx.params.pageId).exec()

        let page = {
            content: pageData.content
        }

        await ctx.render('./page/page_main', {
            page: page
        })
    } catch (err) {
        logger.error(err)
    }
}

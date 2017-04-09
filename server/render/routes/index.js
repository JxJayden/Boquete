const router = require('koa-router')(),
    logger = require('../../lib/log'),
    base = require('./base/index'),
    page = require('./page/index')

router
    .get(['/:websiteId', '/:websiteId/*'], async(ctx, next) => {
        ctx.websiteInfo = await base.getWebSiteInfo(ctx.params.websiteId)
        await next()
    })
    .get(['/:websiteId', '/:websiteId/index'], page.home)
    .get('/:websiteId/post', page.post_list)
    .get('/:websiteId/post/:postId', page.post_main)

module.exports = router

const router = require('koa-router')(),
    _ = require('../lib/utils'),
    page = require('./page/index'),
    logger = require('../../lib/log')('router')

router
    .get('/chat', page.chat)
    .get(['/:websiteId', '/:websiteId/*'], async(ctx, next) => {
        ctx.websiteInfo = await _.getWebsiteInfo(ctx.params.websiteId)
        await next()
    })
    .get(['/:websiteId', '/:websiteId/index'], page.home)
    .get('/:websiteId/post', page.post_list)
    .get('/:websiteId/post/:postId', page.post_main)
    .get('/:websiteId/page/:pageId', page.page_main)

module.exports = router

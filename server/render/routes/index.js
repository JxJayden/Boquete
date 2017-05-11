const router = require('koa-router')(),
    page = require('./page/index'),
    getInfoAndSetCommonData = require('./base/get_info')

router
    .get(['/:websiteId', '/:websiteId/*'], getInfoAndSetCommonData)
    .get(['/:websiteId', '/:websiteId/index'], page.home)
    .get('/:websiteId/post', page.post_list)
    .get('/:websiteId/post/:postId', page.post_main)
    .get('/:websiteId/page/:pageId', page.page_main)
    .get('/:websiteId/chat', page.chat)

module.exports = router


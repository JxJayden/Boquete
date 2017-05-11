const router = require('koa-router')(),
    _ = require('../lib/utils'),
    page = require('./page/index'),
    logger = require('../../lib/log')('router')

router
    .get(['/:websiteId', '/:websiteId/*'], getInfoAndSetCommonData)
    .get(['/:websiteId', '/:websiteId/index'], page.home)
    .get('/:websiteId/post', page.post_list)
    .get('/:websiteId/post/:postId', page.post_main)
    .get('/:websiteId/page/:pageId', page.page_main)
    .get('/:websiteId/chat', page.chat)

module.exports = router

async function getInfoAndSetCommonData(ctx, next) {
    ctx.websiteInfo = await _.getWebsiteInfo(ctx.params.websiteId)
    let webSiteInfo = ctx.websiteInfo

    if (webSiteInfo === null) {
        throw {
            message: '无该网站',
            code: 404
        }
    }
    let common = {
        title: webSiteInfo.title,
        logo:  `//api.cms.com/${webSiteInfo.logo}`,
        nav: {
            homeUrl: webSiteInfo.url,
            nav: webSiteInfo.nav,
            logo: `//api.cms.com/${webSiteInfo.logo}`
        },
        page: {
            title: webSiteInfo.title,
            description: webSiteInfo.description,
            chaturl: webSiteInfo.url + '/chat'
        },
        footer: {
            copyright: webSiteInfo.copyright,
            description: webSiteInfo.description
        }
    }
    ctx.state = {
        common: common
    }
    await next()
}

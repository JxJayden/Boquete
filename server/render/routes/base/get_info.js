const  logger = require('../../../lib/log')('base-getinfo'),
    _ = require('../../lib/utils'),
    config = require('../../lib/config')

module.exports = async (ctx, next) => {
    ctx.websiteInfo = await _.getWebsiteInfo(ctx.params.websiteId)
    let webSiteInfo = ctx.websiteInfo

    if (webSiteInfo === null) {
        logger.info(`can not find website: ${ctx.params.websiteId}`)
        throw {
            message: '无该网站',
            code: 404
        }
    }
    let common = {
        title: webSiteInfo.title,
        logo:  `${config.URL.API}${webSiteInfo.logo}`,
        nav: {
            homeUrl: webSiteInfo.url,
            nav: webSiteInfo.nav,
            logo: `${config.URL.API}${webSiteInfo.logo}`
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

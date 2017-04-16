const logger = require('../../../lib/log')('router-home')

module.exports = async(ctx) => {
    try {
        let webSiteInfo = ctx.websiteInfo
        if (webSiteInfo === null) {
            throw {
                message: '无该网站',
                code: 404
            }
        }

        let nav = {
            homeUrl: webSiteInfo.url,
            nav: webSiteInfo.nav,
            logo: `//api.cms.com/${webSiteInfo.logo}`
        }

        let page = {
            title: webSiteInfo.title,
            description: webSiteInfo.description
        }

        let footer = {
            copyright: webSiteInfo.copyright,
            description: webSiteInfo.description
        }

        ctx.state = {
            title: webSiteInfo.title,
            nav: nav,
            page: page,
            footer: footer
        }

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

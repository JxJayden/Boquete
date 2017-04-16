const logger = require('../../../lib/log')('router-postmain'),
    db = require('../../../models/index')

module.exports = async(ctx) => {
    try {
        let webSiteInfo = ctx.websiteInfo
        let post = await db.postModel.findById(ctx.params.postId).exec()

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
            description: webSiteInfo.description,
            cover: '/img/background1.jpg'
        }

        let footer = {
            copyright: webSiteInfo.copyright,
            description: webSiteInfo.description
        }

        ctx.state = {
            title: webSiteInfo.title,
            nav: nav,
            page: page,
            footer: footer,
            post: post
        }

        await ctx.render('./page/post_main', {})
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

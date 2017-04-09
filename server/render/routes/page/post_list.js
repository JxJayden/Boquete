const logger = require('../../lib/log'),
    db = require('../../../models/index')

module.exports = async(ctx, next) => {
    logger.debug('----- in post list')
    try {
        let webSiteInfo = ctx.websiteInfo
        logger.debug(webSiteInfo)
        if (webSiteInfo === null) {
            throw {
                message: '无该网站',
                code: 404
            }
        }

        let postsInfo = await getPostsInfo(webSiteInfo.owner)

        let nav = {
            nav: webSiteInfo.nav,
            logo: `//api.cms.com/${webSiteInfo.logo}`
        }

        let page = {
            title: webSiteInfo.title,
            description: webSiteInfo.description,
            // cover: '/img/background1.jpg'
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
            posts: postsInfo
        }

        await ctx.render('./page/postlist', {})
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


async function getPostsInfo(ownerId) {
    logger.debug(ownerId)
    return await db.postModel.find({
        owner: ownerId
    }).exec()
}
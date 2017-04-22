const logger = require('../../../lib/log')('router-postlist'),
    db = require('../../../models/index')

module.exports = async(ctx) => {
    try {
        let webSiteInfo = ctx.websiteInfo

        if (webSiteInfo === null) {
            throw {
                message: '无该网站',
                code: 404
            }
        }

        let postsInfo = await getPostsInfo(webSiteInfo.owner)

        let nav = {
            homeUrl: webSiteInfo.url,
            nav: webSiteInfo.nav,
            logo: `//api.cms.com/${webSiteInfo.logo}`
        }

        let page = {
            title: webSiteInfo.title,
            description: webSiteInfo.description,
            cover: '/img/background1.jpg',
            chaturl: webSiteInfo.url + '/chat'
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

        await ctx.render('./page/post_list', {})
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
    return await db.postModel.find({
        owner: ownerId
    }).exec()
}

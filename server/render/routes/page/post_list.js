const logger = require('../../../lib/log')('router-postlist'),
    db = require('../../../models/index')

module.exports = async(ctx) => {
    try {
        let webSiteInfo = ctx.websiteInfo

        let postsInfo = await getPostsInfo(webSiteInfo.owner)

        await ctx.render('./page/post_list', {
            posts: postsInfo
        })
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

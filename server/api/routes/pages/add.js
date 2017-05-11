const db = require('../../../models/index'),
    logger = require('../../../lib/log')('post add'),
    cry = require('../../lib/cryptology'),
    config = require('../../lib/config')

module.exports = async function (ctx) {
    let modules = ctx.request.body.content || [],
        title = ctx.request.body.title || '',
        userId = cry.decrypt(ctx.cookies.get('user')),
        content = '',
        body,
        pageVal,
        websiteInfo,
        pageUrl

    try {
        websiteInfo = await db
            .websiteModel
            .findOne({
                owner: userId
            })
            .exec()

        modules.forEach((value) => {
            content += value.content
        })

        pageVal = await new db
            .pageModel({
                title: title,
                website: websiteInfo._id,
                modules: modules,
                content: content,
                owner: userId,
                type: 'customize'
            })
            .save()

        pageUrl = `${websiteInfo.url}/page/${pageVal._id}`

        await db
            .pageModel
            .findByIdAndUpdate(pageVal._id, {
                $set: {
                    url: pageUrl
                }
            })
            .exec()

        body = {
            err: false,
            message: 'add page succeed',
            code: 200,
            data: Object.assign(pageVal, {
                url: pageUrl
            })
        }
    } catch (err) {
        logger.error(err)
        body = {
            err: true,
            message: err.message,
            code: err.code || -3,
            data: {}
        }
    }
    ctx.body = body
}

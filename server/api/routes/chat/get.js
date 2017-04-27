const db = require('../../../models/index'),
    logger = require('../../../lib/log')('post-get'),
    cry = require('../../lib/cryptology')

module.exports = async function (ctx) {
    let userId = cry.decrypt(ctx.cookies.get('user')),
        website = await getWebsiteInfo(userId),
        body, dbVal

    try {
        if (!website) {
            throw Error('no website')
        }

        dbVal = await db.chatModel.find({website: website._id}).exec()

        body = {
            err: false,
            message: 'get post info succeed',
            code: 200,
            data: dbVal
        }

    } catch (err) {
        logger.error(err)
        body = {
            err: true,
            message: err.message,
            code: -2,
            data: {}
        }
    }
    ctx.body = body
}

async function getWebsiteInfo(ownerId) {
    return await db.websiteModel.findOne({ owner: ownerId }).exec()
}

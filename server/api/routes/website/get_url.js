/**
 * 获取网站 url
 */
const db = require('../../../models/index'),
    logger = require('../../../lib/log')('website-get-url'),
    cry = require('../../lib/cryptology')

module.exports = async function (ctx) {
    let ownerId = cry.decrypt(ctx.cookies.get('user')),
        body, dbVal

    try {
        dbVal = await db.websiteModel.findOne({ owner: ownerId }, {_id: 1, url: 1, title: 1}).exec()

        if (dbVal === null) throw { message: 'no website' }

        body = {
            err: false,
            code: 200,
            message: 'succeed',
            data: dbVal
        }
    } catch (err) {
        logger.error(err)
        body = {
            err: true,
            code: -4,
            message: err.message,
            data: {}
        }
    }
    ctx.body = body
}

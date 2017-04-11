/**
 * 获取网站信息
 */
const db = require('../../../models/index'),
    logger = require('../../lib/log').getLogger('website-get-info'),
    cry = require('../../lib/cryptology')

module.exports = async function (ctx) {
    let ownerId = cry.decrypt(ctx.cookies.get('user')),
        body, dbVal

    try {
        dbVal = await db.websiteModel.findOne({ owner: ownerId }).exec()

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

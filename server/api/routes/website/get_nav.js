/**
 * 获取网站导航栏信息
 */
const db = require('../../../models/index'),
    logger = require('../../lib/log').getLogger('website-get-nav'),
    cry = require('../../lib/cryptology')

module.exports = async function (ctx) {
    let ownerId = cry.decrypt(ctx.cookies.get('user')),
        body, dbVal

    try {
        dbVal = await db.websiteModel.findOne({ owner: ownerId }, {_id: 1, nav: 1, title: 1}).exec()

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

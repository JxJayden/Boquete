/**
 * 获取网站信息
 */
const db = require('../../models/index'),
    logger = require('../../lib/log'),
    cry = require('../../lib/cryptology')

module.exports = async function (ctx) {
    let ownerId = ctx.cookies.get('user') || null,
        body

    try {
        if (!ownerId) {
            throw {
                message: '请先登录'
            }
        } else {
            ownerId = cry.decrypt(ownerId)
        }

        await db.websiteModel.findOne({
            owner: ownerId
        }).exec().then((value) => {

            if (value === null) {
                throw {
                    message: 'no website'
                }
            }

            body = {
                err: false,
                code: 200,
                message: 'succeed',
                data: {
                    value
                }
            }
        }).catch((err) => {
            throw {
                message: err.message
            }
        })
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

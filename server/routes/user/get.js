/**
 * 获取用户信息
 */
const db = require('../../models/index'),
    logger = require('../../lib/log')

module.exports = async function (ctx) {
    let body

    try {

        await db.userModel.find({}, {
            _id: 1,
            username: 1,
            limits: 1,
            isRoot: 1
        }).exec().then((value) => {

            if (value === null) {
                throw {
                    message: 'no user'
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

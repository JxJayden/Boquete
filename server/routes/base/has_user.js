const db = require('../../models/index'),
    logger = require('../../lib/log'),
    cry = require('../../lib/cryptology')

module.exports = async function (ctx) {
    let currentUserId = ctx.cookies.get('user') || null,
        hasUser

    try {
        if (!currentUserId) {
            throw {
                message: '请先登录'
            }
        }
        currentUserId = cry.decrypt(currentUserId)
        hasUser = await db.userModel.count({
            _id: currentUserId
        }).exec().then(count => {
            if (count && count > 0) {
                return true
            } else {
                return false
            }
        }).catch(err => {
            logger.error(err)
            return false
        })
        return hasUser
    } catch (err) {
        logger.info(err)
        return false
    }
}

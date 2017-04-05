const db = require('../../models/index'),
    cry = require('../../lib/cryptology'),
    utils = require('../../lib/utils')

/**
 * 如果没有用户权限，返回 false
 * @param {String} url
 * @param {String} limits
 * @returns {Boolean}
 */
function hasLimits(url, limits) {
    return !limits || utils.hasPermission(url, cry.decrypt(limits))
}

/**
 * 如果没有 sessionId 或者超时，返回 false
 * @param {String} sessionId
 * @returns {Boolean}
 */
function isEffective(sessionId) {
    return !(!sessionId || utils.isTimeout(cry.decrypt(sessionId)))
}

/**
 * 如果没有 user 返回 false
 * @param {String} userId
 * @returns {Boolean}
 */
async function hasUser(userId) {
    if (!userId) {
        return false
    }

    let userCount = await db.userModel.count({
        _id: cry.decrypt(userId)
    }).exec()

    return userCount && userCount > 0
}

module.exports = {
    hasLimits: hasLimits,
    hasUser: hasUser,
    isEffective: isEffective
}

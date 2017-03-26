/* eslint no-console: "off" */
const config = require('./config'),
    cry = require('./cryptology'),
    LIMIT_RE = new RegExp(`(${config.limits.join('|')})`, 'i')

/**
 * 判断是否为数组
 * @param {Array} val
 * @returns {Boolean}
 */
function isArray(val) {
    return Array.isArray(val) || Object.prototype.toString.call(val) === '[object Array]'
}

/**
 * 判断是否有访问权限
 * @param {String} url
 * @param {String} limits
 * @returns {Boolean}
 */
function hasPermission(url, limits) {
    let to = url.match(LIMIT_RE)[0]

    limits = JSON.parse(cry.decrypt(limits))

    let tmp = limits.join(',')
    return !!~tmp.indexOf(to)
}

/**
 * 判断是否为限制的路由
 *
 * @param {any} url
 * @returns {Boolean}
 */
function isLimited(url) {
    return LIMIT_RE.test(url)
}

/**
 * 判断是否登录超时
 * @param {String} sessionTime
 * @returns {Boolean}
 */
function isTimeout(sessionTime) {
    sessionTime = parseInt(cry.decrypt(sessionTime))

    if (sessionTime && new Date().getTime() - sessionTime < config.maxTime) {
        return false
    } else {
        return true
    }
}

/**
 * 根据传进的参数判断是否为空，返回对应的信息。用于 HTTP 请求的参数判断
 * @param {Object} obj
 */
function checkIfParamNull(...args) {

}
module.exports = {
    isArray: isArray,
    hasPermission: hasPermission,
    isTimeout: isTimeout,
    isLimited: isLimited,
    checkIfParamNull: checkIfParamNull
}

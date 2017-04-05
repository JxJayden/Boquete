/* eslint no-console: "off" */
const config = require('./config'),
    LIMIT_RE = new RegExp(`(${config.limits.join('|')})`, 'i'),
    toString = Object.prototype.toString

/**
 * 判断是否为数组
 * @param {Array} val
 * @returns {Boolean}
 */
function isArray(val) {
    return Array.isArray(val) || toString.call(val) === '[object Array]'
}

/**
 * 判断是否为数组
 * @param {Object} val
 * @returns
 */
function isObject(val) {
    return toString.call(val) === '[object Object]'
}

/**
 * 判断是否有访问权限
 * @param {String} url
 * @param {String} limits
 * @returns {Boolean}
 */
function hasPermission(url, limits) {
    let to = url.match(LIMIT_RE)[0]

    limits = JSON.parse(limits)

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
    sessionTime = parseInt(sessionTime)

    if (sessionTime && new Date().getTime() - sessionTime < config.maxTime) {
        return false
    } else {
        return true
    }
}

module.exports = {
    isArray: isArray,
    isObject: isObject,
    hasPermission: hasPermission,
    isTimeout: isTimeout,
    isLimited: isLimited
}

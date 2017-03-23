/* eslint no-console: "off" */
const config = require('./config'),
    cry = require('./cryptology')

function isArray(val) {
    return Array.isArray(val) || Object.prototype.toString.call(val) === '[object Array]'
}

function hasPermission(url, limits) {
    let LIMIT_RE = new RegExp(`(${config.limits.join('|')})`, 'i'),
        to = url.match(LIMIT_RE)[0]

    limits = JSON.parse(cry.decrypt(limits))

    let tmp = limits.join(',')
    return !!~tmp.indexOf(to)
}

function isLimited(url) {
    let LIMIT_RE = new RegExp(`(${config.limits.join('|')})`, 'i')
    return LIMIT_RE.test(url)
}

function isTimeout(sessionTime) {
    sessionTime = parseInt(cry.decrypt(sessionTime))

    if (sessionTime && new Date().getTime() - sessionTime < config.maxTime) {
        return false
    } else {
        return true
    }
}

module.exports = {
    isArray: isArray,
    hasPermission: hasPermission,
    isTimeout: isTimeout,
    isLimited: isLimited
}

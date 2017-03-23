function isArray(val) {
    return Array.isArray(val) || Object.prototype.toString.call(val) === '[object Array]'
}

module.exports = {
    isArray: isArray
}

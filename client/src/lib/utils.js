/**
 * 发送通用的 post 请求
 * @export
 * @param {this} context
 * @param {String} api
 * @param {Object} data
 * @param {Function} cb
 */
export function _post(context, api, data, cb, errCb) {
    const self = context
    self.axios.post(api, data).then(res => {
        if (!res.data.err) {
            isFun(cb) && cb.call(self, res.data.data)
        } else {
            throw res.data.message
        }
    }).catch(err => {
        if (err.response && err.response.status === 403) {
            self.$router.replace('login')
            self.$notify.error({
                title: '更新失败',
                message: '无用户信息，请登录重试'
            })
        } else {
            self.$notify.error({
                title: '更新失败',
                message: err
            })
            isFun(errCb) && errCb.call(self, res.data.data)
        }
    })
}

/**
 * 发送通用的 put 请求
 * @export
 * @param {this} context
 * @param {String} api
 * @param {Object} data
 * @param {Function} cb
 */
export function _put(context, api, data, cb, errCb) {
    const self = context
    self.axios.put(api, data).then(res => {
        if (!res.data.err) {
            isFun(cb) && cb.call(self, res.data.data)
        } else {
            throw res.data.message
        }
    }).catch(err => {
        if (err.response && err.response.status === 403) {
            self.$router.replace('login')
            self.$notify.error({
                title: '更新失败',
                message: '无用户信息，请登录重试'
            })
        } else {
            self.$notify.error({
                title: '更新失败',
                message: err
            })
            isFun(errCb) && errCb.call(self, res.data.data)
        }
    })
}

/**
 * 发送通用的 get 请求
 * @export
 * @param {this} context
 * @param {String} api
 * @param {Function} cb
 */
export function _get(context, api, cb, errCb) {
    const self = context
    self.axios.get(api).then(res => {
        if (!res.data.err) {
            isFun(cb) && cb.call(self, res.data.data)
        } else {
            throw res.data.message
        }
    }).catch(err => {
        if (err.response && err.response.status === 403) {
            self.$router.replace('login')
            self.$notify.error({
                title: '获取失败',
                message: '无用户信息，请登录重试'
            })
        } else {
            self.$notify.error({
                title: '获取失败',
                message: err
            })
            isFun(errCb) && errCb.call(self, res.data.data)
        }
    })
}

/**
 *  发送通用的 delete 请求
 * @export
 * @param {this} context
 * @param {String} api
 * @param {Object} data
 * @param {Function} cb
 */
export function _delete(context, api, data, cb, errCb) {
    const self = context
    self.axios.delete(api, {
        data: data
    }).then(res => {
        if (!res.data.err) {
            isFun(cb) && cb.call(self, res.data.data)
        } else {
            throw res.data.message
        }
    }).catch(err => {
        if (err.response && err.response.status === 403) {
            self.$router.replace('login')
            self.$notify.error({
                title: '删除失败',
                message: '无用户信息，请登录重试'
            })
        } else {
            self.$notify.error({
                title: '删除失败',
                message: err
            })
            isFun(errCb) && errCb.call(self, res.data.data)
        }
    })
}

export function isFun(fn) {
    return typeof fn === 'function'
}

/**
 * 判断是否为数组
 * @param {any} value
 * @returns
 */
export function isArray(value) {
    return Array.isArray(value) || toString.call(value) === '[object Array]'
}


export function assign(target, sources) {
    if (Object.assign) {
        return Object.assign(target, sources)
    } else {
        if (Object.prototype.toString(target) !== '[object Object]') {
            throw new TypeError('target must be Object')
        }
        if (Object.prototype.toString(sources) !== '[object Object]') {
            throw new TypeError('sources must be Object')
        }
        for (var key in sources) {
            target[key] = sources[key]
        }
        return target
    }
}

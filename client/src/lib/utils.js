/**
 * 发送通用的 post 请求
 * @export
 * @param {this} context
 * @param {String} api
 * @param {Object} data
 * @param {Function} cb
 */
export function axiosPost(context, api, data, cb, errCb) {
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
export function axiosPut(context, api, data, cb, errCb) {
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
export function axiosGet(context, api, cb, errCb) {
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
export function axiosDelete(context, api, data, cb, errCb) {
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

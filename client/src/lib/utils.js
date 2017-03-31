/**
 * 发送通用的 put 请求
 * @param {String} api
 * @param {data} data
 * @param {Function} cb
 */
export function axiosPut(context, api, data, cb) {
    const self = context
    self.axios.put(api, data).then(res => {
        if (!res.data.err) {
            isFun(cb) && cb.call(self, res.data.data)
        } else {
            throw res.data.message
        }
    }).catch(err => {
        self.$notify.error({
            title: '更新失败',
            message: err
        })
    })
}

/**
 * 发送通用的 get 请求
 * @param {String} api
 * @param {data} data
 * @param {Function} cb
 */
export function axiosGet(context, api, cb) {
    const self = context
    self.axios.get(api).then(res => {
        if (!res.data.err) {
            isFun(cb) && cb.call(self, res.data.data)
        } else {
            throw res.data.message
        }
    }).catch(err => {
        self.$notify.error({
            title: '获取失败',
            message: err
        })
    })
}

export function isFun(fn) {
    return typeof fn === 'function'
}

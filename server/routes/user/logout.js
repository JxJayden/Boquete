const logger = require('../../lib/log')
module.exports = async function (ctx) {
    try {
        ctx.cookies.set('sessionId', null)
        ctx.cookies.set('user', null)
        ctx.cookies.set('limits', null)
        ctx.body = {
            err: false,
            message: 'logout succeed',
            code: 200,
            data: {}
        }
    } catch (err) {
        logger.error(err)
        ctx.body = {
            err: true,
            message: 'logout fail, try again',
            code: -1,
            data: {}
        }
    }
}

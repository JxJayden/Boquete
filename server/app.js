const Koa = require('koa'),
    app = new Koa(),
    convert = require('koa-convert'),
    json = require('koa-json'),
    mount = require('mount-koa-routes'),
    logger = require('./lib/log'),
    utils = require('./lib/utils'),
    hasUser = require('./routes/base/has_user')

// middlewares
app.use(convert(json()))
app.use(require('koa-static')(__dirname + '/public'))

app.use(async function (ctx, next) {
    const start = new Date()

    try {
        if (utils.isLimited(ctx.url)) { // 判断访问的路径有没有被限制
            if (!await hasUser(ctx, next)) {
                throw {
                    message: '请登录',
                    code: -10,
                }
            } else if (!ctx.cookies.get('sessionId') ||
                utils.isTimeout(ctx.cookies.get('sessionId'))) {
                throw {
                    message: '长时间未操作，会话已过期',
                    code: -10,
                }
            } else {
                if (utils.hasPermission(ctx.url, ctx.cookies.get('limits'))) {
                    await next()
                } else {
                    throw {
                        message: '没有访问权限',
                        code: -4,
                    }
                }
            }
        } else {
            await next()
        }
    } catch (err) {
        if (err.code === -10) {
            ctx.cookies.set('sessionId', null)
            ctx.cookies.set('user', null)
            ctx.cookies.set('limits', null)
            ctx.status = 403
            ctx.body = Object.assign(err, {
                err: true,
                data: {}
            })
        } else {
            ctx.body = Object.assign(err, {
                err: true,
                data: {}
            })
        }
    }

    const ms = new Date() - start
    logger.info(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routers
mount(app, __dirname + '/routes', true)

app.on('error', function (err, ctx) {
    logger.error('server error', err, ctx)
})

module.exports = app

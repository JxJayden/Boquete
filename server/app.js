const Koa = require('koa'),
    app = new Koa(),
    convert = require('koa-convert'),
    json = require('koa-json'),
    mount = require('mount-koa-routes'),
    bodyparser = require('koa-bodyparser')(),
    logger = require('./lib/log'),
    utils = require('./lib/utils')

// middlewares
app.use(convert(bodyparser))
app.use(convert(json()))
app.use(require('koa-static')(__dirname + '/public'))


app.use(async function (ctx, next) {
    const start = new Date()

    if (utils.isLimited(ctx.url)) {
        if (!ctx.cookies.get('sessionId')) {
            ctx.body = {
                err: true,
                message: '请登录',
                code: -2,
                data: {}
            }
        } else if (utils.isTimeout(ctx.cookies.get('sessionId'))) {
            ctx.body = {
                err: true,
                message: '长时间未操作，会话已过期',
                code: -2,
                data: {}
            }
        } else {
            if (utils.hasPermission(ctx.url, ctx.cookies.get('limits'))) {
                await next()
            } else {
                ctx.body = {
                    err: true,
                    message: '没有访问权限',
                    code: -4,
                    data: {}
                }
            }
        }
    } else {
        await next()
    }

    const ms = new Date() - start
    logger.info(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routers
mount(app, __dirname + '/routes', true)


// response

app.on('error', function (err, ctx) {
    logger.error('server error', err, ctx)
})

module.exports = app

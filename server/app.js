const Koa      = require('koa'),
    app        = new Koa(),
    convert    = require('koa-convert'),
    json       = require('koa-json'),
    mount      = require('mount-koa-routes'),
    bodyparser = require('koa-bodyparser')(),
    logger     = require('./lib/log'),
    cry        = require('./lib/cryptology')

// middlewares
app.use(convert(bodyparser))
app.use(convert(json()))
app.use(require('koa-static')(__dirname + '/public'))

app.use(async function(ctx, next) {
    const start = new Date()
    if (!~ctx.url.indexOf('base')) {
        let sessionTime = ctx.cookies.get('sessionId')
        sessionTime = parseInt(cry.decrypt(sessionTime))

        if (sessionTime && new Date().getTime() - sessionTime < 28800000) {
            await
            await next()
        } else {
            ctx.body = {
                err: true,
                message: '长时间未操作，会话已过期',
                code: -2,
                data: {}
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

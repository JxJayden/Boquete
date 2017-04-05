const Koa = require('koa'),
    app = new Koa(),
    convert = require('koa-convert'),
    json = require('koa-json'),
    mount = require('mount-koa-routes'),
    bodyparser = require('koa-bodyparser'),
    send = require('koa-send'),
    logger = require('./lib/log'),
    utils = require('./lib/utils'),
    judgeUser = require('./routes/base/judge_user')

// middlewares
app
    .use(convert(bodyparser()))
    .use(convert(json()))
    .use(async(ctx, next) => {
        await send(ctx, ctx.path.replace(/\/?public\//, ''), {
            root: __dirname + '/public',
            maxage: 300
        })
        await next()
    })

app.use(async function (ctx, next) {
    const start = new Date()
    try {
        if (!utils.isLimited(ctx.url)) {
            await next()
        } else {
            if (!await judgeUser.hasUser(ctx.cookies.get('user'))) {
                throw {
                    code: -10,
                    message: '无该用户，请重新登录'
                }
            }

            if (!judgeUser.isEffective(ctx.cookies.get('sessionId'))) {
                throw {
                    code: -4,
                    message: '长时间未操作，请重新登录'
                }
            }

            if (!judgeUser.hasLimits(ctx.url, ctx.cookies.get('limits'))) {
                throw {
                    code: -4,
                    message: '无访问权限'
                }
            }

            await next()
        }
    } catch (err) {
        logger.error(err)
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

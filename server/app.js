const Koa = require('koa')
const app = new Koa()
const router = require('koa-router')()
const views = require('koa-views')
const co = require('co')
const convert = require('koa-convert')
const json = require('koa-json')
const onerror = require('koa-onerror')
const mount = require('mount-koa-routes')
const bodyparser = require('koa-bodyparser')()
const logger = require('./lib/log')
const cry = require('./lib/cryptology')
// // website routers
// const website_add = require('./routes/website/add')
// const website_delete = require('./routes/website/delete')

// // user routers
// const user_get_verify_img = require('./routes/user/get-verify-img')
// const user_login = require('./routes/user/login')
// const user_verify_login = require('./routes/user/verify-login')

// // pages routers
// const pages_add = require('./routes/pages/add')
// const pages_delete = require('./routes/pages/delete')
// const pages_get = require('./routes/pages/get')
// const pages_update = require('./routes/pages/update')

// // file routers
// const upload = require('./routes/file/upload')
// const get = require('./routes/file/get')

// // product routers
// const product_add = require('./routes/product/add')
// const product_delete = require('./routes/product/delete')
// const product_get = require('./routes/product/get')
// const product_add = require('./routes/product/update')
// const product_add = require('./routes/product/change-product-info')

// middlewares
app.use(convert(bodyparser))
app.use(convert(json()))
app.use(require('koa-static')(__dirname + '/public'))

// app.use(views(__dirname + '/views', {
//   extension: 'jade'
// }))

app.use(async function(ctx, next) {
    const start = new Date()
    logger.info(ctx.url)
    logger.info(!~ctx.url.indexOf('base'))
    if (!~ctx.url.indexOf('base')) {

        let sessionTime = ctx.cookies.get('sessionId')
        sessionTime = parseInt(cry.decrypt(sessionTime))
        logger.info(sessionTime)
        if (sessionTime && new Date().getTime() - sessionTime < 28800000) {
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
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routers
mount(app, __dirname + '/routes', true)

// response

app.on('error', function (err, ctx) {
    console.log(err)
    logger.error('server error', err, ctx)
})

module.exports = app

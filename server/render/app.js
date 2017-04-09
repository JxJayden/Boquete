const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')()
const logger = require('./lib/log')

// const artTemplate = require('art-template')

const index = require('./routes/index')

// error handler
onerror(app)

// artTemplate.config('base', __dirname + '/views')
// artTemplate.config('encoding', 'utf-8')
// artTemplate.config('extname', '.html')
// app.context.render = artTemplate


// middlewares
app
    .use(bodyparser)
    .use(json())
    .use(require('koa-static')(__dirname + '/public'))
    .use(views(__dirname + '/views', {
        extension: 'pug'
    }))

// logger
app.use(async(ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    logger.info(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())

module.exports = app

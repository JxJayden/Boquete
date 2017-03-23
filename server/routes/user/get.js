const db   = require('../../models/index'),
    router = require('koa-router')(),
    logger = require('../../lib/log')

router.get('/', async function(ctx) {
    ctx.body = await db.userModel.find({}, '_id username limits isRoot').exec().then((value) => {
        return {
            err: false,
            code: 200,
            message: 'get user info done',
            data: {
                users: value
            }
        }
    }).catch((err) => {
        logger.error(err)
        return {
            err: true,
            code: -4,
            message: err.message,
            data: {}
        }
    })
})

module.exports = router

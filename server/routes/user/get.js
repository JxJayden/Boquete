const db = require('../../models/db');
const router = require('koa-router')();
const logger = require('../../lib/log');
const cry = require('../../lib/cryptology');

router.get('/', async function(ctx, next) {
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
        logger.error(err);
        return {
            err: true,
            code: -4,
            message: err.message,
            data: {}
        }
    })
})

module.exports = router;

const db = require('../../models/db');
const router = require('koa-router')();
const logger = require('../../lib/log');
const cry = require('../../lib/cryptology');

router.put('/', async function(ctx, next) {
    logger.info(typeof ctx.request.body.change);
    logger.info(ctx.request.body.change);
    let _id = ctx.request.body._id;
    let isRoot = cry.decrypt(ctx.cookies.get('root'));
    let change = ctx.request.body.change ? JSON.parse(ctx.request.body.change) : false;
    let body;

    if (!change) {
        body = {
            err: true,
            message: '没有做出更改！',
            code: -1
        }
    } else if (!isRoot || isRoot === 'false') {
        body = {
            err: true,
            message: '无修改的权限！',
            code: -1
        }
    } else {
        body = await db.userModel.findOne({ _id: _id }).exec().then((value) => {
            if (value.isRoot) {
                throw {
                    err: true,
                    message: '无法修改超级管理员的权限！',
                    code: -2
                };
            } else {
                return value;
            }
        }).then(() => {
            return db.userModel.update({ _id: _id }, { $set: change }).exec();
        }).then((value) => {
            return {
                err: false,
                message: 'update done',
                code: 200
            }
        }).catch((err) => {
            logger.error(err);
            return {
                err: true,
                message: err.message,
                code: err.code || -4
            };
        });
    }

    ctx.body = body;
})

module.exports = router;

const db = require('../../models/db');
const router = require('koa-router')();
const logger = require('../../lib/log');
const cry = require('../../lib/cryptology');

router.delete('/', async function(ctx, next) {
    let _id = ctx.request.body._id;
    let isRoot = cry.decrypt(ctx.cookies.get('root'));
    let body;

    if (!isRoot || isRoot === 'false') {
        body = {
            err: true,
            message: '无删除权限！',
            code: -1
        }
    } else {
        body = await db.userModel.findOne({ _id: _id }).exec().then((value) => {
            if (value.isRoot) {
                throw {
                    err: true,
                    message: '无法删除超级管理员！',
                    code: -2
                };
            } else {
                return value;
            }
        }).then(() => {
            return db.userModel.remove({ _id: _id }).exec();
        }).then((value) => {
            return {
                err: false,
                message: 'delete done',
                code: 200
            }
        }).catch((err) => {
            logger.error(err);
            return {
                err: true,
                message: err.message,
                code: err.code || -4
            };;
        });
    }
    ctx.body = body;
})

module.exports = router;

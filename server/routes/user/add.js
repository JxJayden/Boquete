const db = require('../../models/db');
const router = require('koa-router')();
const logger = require('../../lib/log');


router.post('/', async function(ctx, next) {
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    let isRoot = ctx.request.body.root ? true : false;
    let limits = ctx.request.body.limits ? JSON.parse(ctx.request.body.limits) : [];
    let newUser, isHasUser, body;

    // 对 username 和 password 做判断
    if (!username || !password) {
        if (!password) {
            body = {
                error: true,
                message: 'password is required',
                code: -1,
                data: {}
            }
        } else {
            body = {
                error: true,
                message: 'username is required',
                code: -1,
                data: {}
            }
        }
    } else if (Object.prototype.toString.call(limits) !== '[object Array]') { // 对 limits 是否为数组做判断
        body = {
            error: true,
            message: 'limits must be Array',
            code: -1,
            data: {}
        }
    } else {
        body = await db.userModel.count({ username: username }).exec().then((value) => {
            if (value && value > 0) {
                throw {
                    error: true,
                    message: `${username} is exist!`,
                    code: -2,
                    data: {}
                }
            } else {
                return true;
            }
        }).then((value) => {
            newUser = new db.userModel({
                username: username,
                password: password,
                limits: limits,
                isRoot: isRoot
            });

            return newUser.save();
        }).then((value) => {
            return {
                error: false,
                message: 'succeed',
                code: 200,
                data: value
            }
        }).catch((err) => {
            logger.error(err);
            return {
                error: true,
                message: err.message,
                code: err.code || -3,
                data: {}
            }
        });
    }
    ctx.body = body;
})

module.exports = router;

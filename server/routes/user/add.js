const db = require('../../models/db');
const router = require('koa-router')();
const logger = require('../../lib/log');


router.post('/', async function(ctx, next) {
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    let limits = ctx.request.body.limits ? JSON.parse(ctx.request.body.limits) : [];
    let newUser, isHasUser;

    // 对 username 和 password 做判断
    if (!username || !password) {
        if (!password) {
            return ctx.body = {
                error: true,
                message: 'password is required',
                code: -1,
                data: {}
            }
        } else {
            return ctx.body = {
                error: true,
                message: 'username is required',
                code: -1,
                data: {}
            }
        }
    }

    // 对 limits 是否为数组做判断
    if (Object.prototype.toString.call(limits) !== '[object Array]') {
        return ctx.body = {
            error: true,
            message: 'limits must be Array',
            code: -1,
            data: {}
        }
    }

    // 判断是否存在相同的用户名
    isHasUser = await db.userModel.count({ username: username }).exec().then((value) => {
        if (value && value > 0) return true;
        else return false;
    });

    // 对 isHasUser 的值做判断
    if (isHasUser) {
        return ctx.body = {
            error: true,
            message: `${username} is exist!`,
            code: -2,
            data: {}
        }
    } else {
        // 保存新用户数据
        newUser = new db.userModel({
            username: username,
            password: password,
            limits: limits
        });

        await newUser.save().then((value) => {
            if (value) {
                return ctx.body = {
                    error: false,
                    message: 'succeed',
                    code: 200,
                    data: value
                }
            }
        }).catch((err) => {
            logger.debug(err);
            return ctx.body = {
                error: true,
                message: err.message,
                code: -3,
                data: {}
            }
        });
    }
})

module.exports = router;

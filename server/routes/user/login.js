const db = require('../../models/db');
const router = require('koa-router')();
const logger = require('../../lib/log');
const cry = require('../../lib/cryptology');

router.post('/', async function(ctx, next) {
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    let verifyCode = ctx.request.body.verify;
    let cookiesVerifyCode = ctx.cookies.get('verify');

    if (cry.encrypt(verifyCode) !== cookiesVerifyCode) {
        ctx.cookies.set('verify', null);
        ctx.body = {
            err: true,
            message: '验证码错误，请重试！',
            code: -1
        }
    } else {
        let loginState = await new Promise((resolve, reject) => {
            db.userModel.login(username, password, (err, user) => {
                err ? reject(err) : resolve(user);
            })
        }).then((value) => {
            return value;
        }).catch((err) => {
            return err;
        });

        if (loginState.err) {
            ctx.body = {
                err: true,
                code: loginState.code,
                message: loginState.message,
                data: {}
            }
        } else {
            let time = new Date().getTime().toString();
            ctx.cookies.set('sessionId', cry.encrypt(time));
            ctx.cookies.set('limits', cry.encrypt(JSON.stringify(loginState.limits)));
            ctx.body = {
                err: false,
                code: 200,
                message: 'login succeed',
                data: {
                    limits: JSON.parse(loginState.limits)
                }
            }
        }
    }
})

module.exports = router;

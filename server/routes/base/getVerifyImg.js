const router = require('koa-router')();
const logger = require('../../lib/log');
const cry = require('../../lib/cryptology');
const captchapng = require('captchapng');

router.get('/', async function(ctx, next) {
    let verify = parseInt(Math.random() * 9000 + 1000);
    let p = new captchapng(80, 30, verify);
    let img, imgBase64;

    p.color(0, 0, 0, 0);
    p.color(32, 160, 255, 255);
    img = p.getBase64();
    imgBase64 = new Buffer(img, 'base64');

    ctx.cookies.set('verify', cry.encrypt(verify));
    ctx.type = 'image/png';
    ctx.body = imgBase64;
})

module.exports = router;

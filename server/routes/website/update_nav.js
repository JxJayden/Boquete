const db = require('../../models/index'),
    logger = require('../../lib/log'),
    cry = require('../../lib/cryptology'),
    utils = require('../../lib/utils')

module.exports = async function (ctx) {
    let editNav = ctx.request.body.nav,
        currentUserId = cry.decrypt(ctx.cookies.get('user')),
        NAV_RE = /(label,url)|(url,label)/,
        navAfterReg = [],
        body

    try {
        if (!utils.isArray(editNav)) {

            throw {
                message: 'editNav is required and must be Array',
                code: -1
            }
        }

        for (var i = 0; i < editNav.length; i++) {
            let data = editNav[i],
                keys = Object.keys(data).join(',')

            if (NAV_RE.test(keys)) {
                navAfterReg.push({
                    label: data.label,
                    url: data.url
                })
            } else {
                throw {
                    message: `editNav 的第 ${i} 个元素错误`
                }
            }
        }
        await db.websiteModel.update({
            owner: currentUserId
        }, {
            $set: {
                nav: navAfterReg
            }
        }).exec().then(value => {
            body = {
                err: false,
                message: 'edit website navigation succeed',
                code: 200,
                data: {
                    value
                }
            }
        }).catch(err => {
            throw err
        })

    } catch (err) {
        logger.error(err)
        body = {
            err: true,
            message: err.message,
            code: err.code || -3,
            data: {}
        }
    }
    ctx.body = body
}

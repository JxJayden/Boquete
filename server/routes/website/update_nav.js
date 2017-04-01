const db = require('../../models/index'),
    logger = require('../../lib/log'),
    cry = require('../../lib/cryptology'),
    utils = require('../../lib/utils'),
    NAV_RE = /(label,url)|(url,label)/

module.exports = async function (ctx) {
    let editNav = ctx.request.body.nav,
        currentUserId = cry.decrypt(ctx.cookies.get('user')),
        navAfterReg, body, dbVal

    try {
        if (!utils.isArray(editNav)) throw { message: 'editNav is required and must be Array', code: -1 }

        navAfterReg = handleNavs(editNav)

        dbVal = await db.websiteModel.update({ owner: currentUserId }, { $set: { nav: navAfterReg }}).exec()

        body = {
            err: false,
            message: 'edit website navigation succeed',
            code: 200,
            data: dbVal
        }
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

function handleNavs (navs) {
    let m = []
    for (var i = 0; i < navs.length; i++) {
        let data = navs[i],
            keys = Object.keys(data).join(',')

        if (NAV_RE.test(keys)) {
            m.push({
                label: data.label,
                url: data.url
            })
        } else {
            throw { message: `editNav 的第 ${i} 个元素错误` }
        }
    }
    return m
}

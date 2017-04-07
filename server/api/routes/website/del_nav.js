const db = require('../../../models/index'),
    logger = require('../../lib/log'),
    cry = require('../../lib/cryptology')

module.exports = async function (ctx) {
    let delNav = {
            label: ctx.request.body.label,
            url: ctx.request.body.url
        },
        ownerId = cry.decrypt(ctx.cookies.get('user')),
        body, dbVal

    try {
        if (!delNav.label || !delNav.url) {
            throw {
                message: !delNav.label ?
                    'label is required' : 'url is required',
                code: -1
            }
        }

        dbVal = await db.websiteModel.update({ owner: ownerId }, { $pull: { 'nav': delNav }}).exec()

        body = {
            err: false,
            message: 'add nav succeed',
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

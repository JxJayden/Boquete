const db = require('../../models/index'),
    logger = require('../../lib/log'),
    cry = require('../../lib/cryptology')

module.exports = async function (ctx) {
    let delNav = {
            label: ctx.request.body.label,
            url: ctx.request.body.url
        },
        currentUserId = cry.decrypt(ctx.cookies.get('user')),
        body

    try {
        if (!delNav.label || !delNav.url) {

            throw {
                message: !delNav.label ?
                    'label is required' : 'url is required',
                code: -1
            }

        }

        await db.websiteModel.update({
            owner: currentUserId
        }, {
            $pull: {
                'nav': delNav
            }
        }).exec().then(value => {
            body = {
                err: false,
                message: 'add nav succeed',
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

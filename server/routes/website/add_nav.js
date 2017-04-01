const db = require('../../models/index'),
    logger = require('../../lib/log'),
    cry = require('../../lib/cryptology')

module.exports = async function (ctx) {
    let newNav = {
            label: ctx.request.body.label,
            url: ctx.request.body.url
        },
        currentUserId = cry.decrypt(ctx.cookies.get('user')),
        body

    try {
        if (!newNav.label || !newNav.url) {

            throw {
                message: !newNav.label ?
                    'label is required' : 'url is required',
                code: -1
            }

        }

        await db.websiteModel.update({
            owner: currentUserId
        }, {
            $push: {
                nav: newNav
            }
        }).exec().then(value => {
            body = {
                err: false,
                message: 'add nav succeed',
                code: 200,
                data: value
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

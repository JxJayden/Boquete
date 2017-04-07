const db = require('../../../models/index'),
    logger = require('../../lib/log')

module.exports = async function (ctx) {
    let teamname = ctx.query.teamname,
        body

    try {
        if (!teamname) {
            throw {
                message: 'teamname is required'
            }
        }

        await db.teamModel.findOne({
            name: teamname
        }).exec().then((value) => {

            if (value === null) {
                throw {
                    message: `${teamname} is not exist`
                }
            }

            body = {
                err: false,
                code: 200,
                message: 'succeed',
                data: {
                    value
                }
            }
        }).catch((err) => {
            throw {
                message: err.message
            }
        })
    } catch (err) {
        logger.error(err)
        body = {
            err: true,
            code: -4,
            message: err.message,
            data: {}
        }
    }
    ctx.body = body
}

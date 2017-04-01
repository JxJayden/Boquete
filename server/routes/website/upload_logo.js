const db = require('../../models/index'),
    logger = require('../../lib/log'),
    fileSave = require('../../lib/save_file')({
        isRandomName: true,
        dest: 'public/uploads'
    })

module.exports = async function (ctx) {
    let body
    try {
        await fileSave.single('logo')(ctx).then(ctx => {
            body = {
                err: false,
                code: 200,
                message: 'upload done',
                data: ctx.req.file
            }
        })
    } catch (err) {
        logger.debug(err)
        ctx.status = 500
        body = Object.assign(err, {
            err: true
        })
    }
    ctx.body = body
}

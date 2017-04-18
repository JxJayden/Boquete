const logger = require('../../../lib/log')('file-upload-image'),
    cry = require('../../lib/cryptology'),
    fileSave = require('../../lib/save_file')({isRandomName: true, dest: 'public/uploads'})

module.exports = async function (ctx) {
    let currentUserId = cry.decrypt(ctx.cookies.get('user')),
        body
    try {
        if (!currentUserId) {
            throw {message: '无权限'}
        }

        await fileSave.any()(ctx)

        body = {
            err: false,
            code: 200,
            message: 'upload img succeed',
            data: {
                files: ctx.req.files
            }
        }
    } catch (err) {
        logger.error(err)
        ctx.status = 500
        body = Object.assign(err, {err: true})
    }
    ctx.body = body
}

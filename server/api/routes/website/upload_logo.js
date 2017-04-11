const db = require('../../../models/index'),
    logger = require('../../lib/log').getLogger('website-upload-logo'),
    cry = require('../../lib/cryptology'),
    fs = require('fs'),
    fileSave = require('../../lib/save_file')({
        isRandomName: true,
        dest: 'public/uploads'
    })

module.exports = async function (ctx) {
    let currentUserId = cry.decrypt(ctx.cookies.get('user')),
        body, websiteInfo
    try {
        websiteInfo = await db.websiteModel.getWebsiteByOwner(currentUserId)

        if (!websiteInfo) throw {
            message: '没有找到对应的网站',
            code: -3
        }

        if (websiteInfo.logo) {
            fs.unlink('public/' + websiteInfo.logo, function (err) {
                logger.error(err)
            })
        }

        await fileSave.single('logo')(ctx)
        await saveLogoPathUrlTodb(ctx.req.file.path.replace(/.*\/uploads/, 'uploads'), currentUserId)

        body = {
            err: false,
            code: 200,
            message: 'save logo succeed',
            data: {
                path: String(ctx.req.file.path).replace(/.*\/uploads/, '/uploads')
            }
        }
    } catch (err) {
        logger.debug(err)
        ctx.status = 500
        body = Object.assign(err, {
            err: true
        })
    }
    ctx.body = body
}

async function saveLogoPathUrlTodb(logoPath, ownerId) {
    return await db.websiteModel.update({
        owner: ownerId
    }, {
        $set: {
            logo: logoPath
        }
    }).exec()
}

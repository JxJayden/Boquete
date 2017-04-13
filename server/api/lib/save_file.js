const crypto = require('crypto'),
    fs = require('fs'),
    mkdirp = require('mkdirp'),
    multer = require('koa-multer'),
    logger = require('../../lib/log')('save-file'),
    config = require('./config'),
    defaultDest = 'public/uploads'

module.exports = function fileSave(opts) {
    let multerConfig = {},
        storage

    try {
        opts = opts || {}
        if (opts.dest) {
            if (!fs.existsSync(opts.dest)) {
                mkdirp(opts.dest)
            }
        }

        multerConfig.destination = opts.dest || defaultDest
        if (opts.isRandomName) {
            multerConfig.filename = function (req, file, cb) {
                const buf = crypto.randomBytes(16).toString('hex')
                cb(null, `${buf}${config.mimetypeList[file.mimetype]}`)
            }
        } else if (opts.fileName) {
            multerConfig.fileName = opts.fileName
        }

        storage = multer.diskStorage(multerConfig)

        return multer({
            storage: storage
        })
    } catch (err) {
        logger.error(err)
        throw err
    }
}

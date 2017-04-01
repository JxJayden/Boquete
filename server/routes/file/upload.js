const multer = require('koa-multer'),
    upload = multer({
        dest: 'public/uploads/'
    })

module.exports = upload.single('facvion')

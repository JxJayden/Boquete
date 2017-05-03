const
    logger   = require('../lib/log')('model-website'),
    { Schema, mongoose } = require('../lib/mongoose'),
    website_schema = new Schema({
        owner: { // 网站所有者 _id
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        title: { // 网站标题
            type: String,
            default: ''
        },
        description: { // 网站描述
            type: String,
            default: 'Thoughts, stories and ideas.'
        },
        logo: { // 网站 logo
            type: String,
            default: ''
        },
        copyright: {  // 网站版权
            type: String,
            default: 'Copyright © 2017'
        },
        keywords: { // 网站关键字
            type: String,
            default: ''
        },
        url: { // 网站链接
            type: String,
            default: ''
        },
        nav: { // 网站导航栏
            type: Array,
            default: []
        }
    })

website_schema.statics.getWebsiteByOwner = function (ownerId) {
    let that = this

    return new Promise((resolve, reject) => {
        that.findOne({
            owner: ownerId
        }).exec().then((value) => {
            if (value && value.owner) {
                resolve(value)
            } else {
                resolve(null)
            }
        }).catch((err) => {
            logger.error(err)
            reject(null)
        })
    })
}

website_schema.statics.hasWebsiteByOwner = function (ownerId) {
    let self = this

    return new Promise((resolve, reject) => {
        self.count({
            owner: ownerId
        }).exec().then((count) => {
            if (count && count > 0) {
                resolve(true)
            } else {
                resolve(false)
            }
        }).catch((err) => {
            logger.error(err)
            reject({
                err: true,
                code: -4,
                message: err.message
            })
        })
    })
}

module.exports = mongoose.model('website', website_schema)

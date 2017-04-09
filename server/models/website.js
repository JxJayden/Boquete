const
    logger   = require('../lib/log'),
    m        = require('../lib/mongoose'),
    Schema   = m.Schema,
    mongoose = m.mongoose

const website_schema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: 'Thoughts, stories and ideas.'
    },
    logo: {
        type: String,
        default: ''
    },
    copyright: {
        type: String,
        default: 'Copyright © 2017'
    },
    url: {
        type: String,
        default: ''
    },
    nav: {
        type: Array,
        default: []
    }
})

website_schema.statics.getWebsiteByOwner = function (ownerId) {
    let self = this

    return new Promise((resolve, reject) => {
        self.findOne({
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

const websiteModel = mongoose.model('website', website_schema)

module.exports = websiteModel

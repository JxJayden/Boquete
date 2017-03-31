const mongoose = require('mongoose'),
    logger = require('../lib/log'),
    Schema = mongoose.Schema

mongoose.Promise = global.Promise

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
        required: true
    },
    nav: {
        type: Array,
        index: true,
        required: true
    }
})
website_schema.statics.getNavByOwner = function (ownerId) {
    let self = this

    return new Promise((resolve, reject) => {
        self.findOne({
            owner: ownerId
        }, {
            nav: 1
        }).exec().then((value) => {
            if (value && value.nav) {
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
const websiteModel = mongoose.model('website', website_schema)


module.exports = websiteModel

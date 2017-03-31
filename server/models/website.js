const mongoose = require('mongoose'),
    Schema = mongoose.Schema

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
    }
})

const websiteModel = mongoose.model('website', website_schema)

module.exports = websiteModel

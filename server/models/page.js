const logger = require('../lib/log')('model-page'), // eslint-disable-line
    m = require('../lib/mongoose'),
    Schema = m.Schema,
    mongoose = m.mongoose

const page_schema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    website: {
        type: Schema.Types.ObjectId,
        ref: 'website'
    },
    title: {
        type: String,
        default: ''
    },
    content: {
        type: String,
        default: ''
    },
    components: {
        type: Array,
        default: []
    },
    date: {
        type: Date,
        default: Date.now
    },
    visited: {
        type: Number,
        default: 0
    },
    url: {
        type: String,
        default: ''
    }
})

const pageModel = mongoose.model('pages', page_schema)

module.exports = pageModel

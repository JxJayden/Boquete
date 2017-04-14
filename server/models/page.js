const
    logger = require('../lib/log')('model-page'), // eslint-disable-line
    m = require('../lib/mongoose'),
    Schema = m.Schema,
    mongoose = m.mongoose

const page_schema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    label: {
        type: String,
        default: ''
    },
    content: {
        type: String,
        default: ''
    },
    url: {
        type: String,
        default: ''
    }
})

const pageModel = mongoose.model('page', page_schema)

module.exports = pageModel

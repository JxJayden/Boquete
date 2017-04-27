const
    m = require('../lib/mongoose'),
    Schema = m.Schema,
    mongoose = m.mongoose

const chat_schema = new Schema({
    website: {
        type: String,
        required: true
    },
    customerId: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    history: {
        type: Array,
        default: []
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const chatModel = mongoose.model('chats', chat_schema)

module.exports = chatModel

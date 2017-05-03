const
    { Schema, mongoose } = require('../lib/mongoose'),
    chat_schema = new Schema({
        website: { // 信息所属的网站 ID
            type: String,
            required: true
        },
        customerId: { // 随机生成的咨询者 ID
            type: String,
            required: true
        },
        customerName: { // 咨询者输入的昵称
            type: String,
            required: true
        },
        history: { // 咨询历史记录
            type: Array,
            default: []
        },
        date: { // 初次咨询的时间
            type: Date,
            default: Date.now
        }
    })

module.exports = mongoose.model('chats', chat_schema)

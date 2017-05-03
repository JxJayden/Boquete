const logger = require('../lib/log')('model-page'), // eslint-disable-line
    { Schema, mongoose } = require('../lib/mongoose'),
    page_schema = new Schema({
        owner: { // 页面所有者的 _id
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        website: { // 页面所属的网站 _id
            type: Schema.Types.ObjectId,
            ref: 'website'
        },
        title: { // 页面名称
            type: String,
            default: ''
        },
        content: { // 页面内容
            type: String,
            default: ''
        },
        modules: { // 页面模块
            type: Array,
            default: []
        },
        date: { // 页面创建的时间
            type: Date,
            default: Date.now
        },
        visited: { // 页面访问次数
            type: Number,
            default: 0
        },
        url: { // 页面的链接
            type: String,
            default: ''
        }
    })

module.exports = mongoose.model('pages', page_schema)

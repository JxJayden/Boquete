const
    { Schema, mongoose } = require('../lib/mongoose'),
    post_schema = new Schema({
        title: { // 文章标题
            type: String,
            required: true
        },
        content: { // 文章内容
            type: String,
            required: true
        },
        owner: { // 文章所有者 _id
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        author: { // 文章作者 _id
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        authorName: { // 文章作者名
            type: String,
            default: ''
        },
        date: { // 文章创建时间
            type: Date,
            default: Date.now
        },
        visited: { // 文章访问次数
            type: Number,
            default: 0
        },
        url: { // 文章链接
            type: String,
            default: ''
        },
        nav: { // 文章标签
            type: String,
            default: ''
        },
        _draft: { // 是否为草稿
            type: Boolean,
            default: false
        }
    })

module.exports = mongoose.model('post', post_schema)

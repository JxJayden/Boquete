const
    bcrypt = require('bcrypt-nodejs'),
    logger = require('../lib/log')('model-user'),
    { Schema, mongoose } = require('../lib/mongoose'),
    user_schema = new Schema({
        username: { // 管理员用户名
            type: String,
            required: true
        },
        password: { // 管理员密码
            type: String,
            required: true
        },
        limits: { // 用户权限
            type: Array,
            default: []
        },
        isRoot: { // 是否为超级管理员
            type: Boolean,
            default: false
        },
        created_at: { // 创建时间
            type: Date,
            default: Date.now
        },
        _salt_bounds: { // 工作因子 salt work factor
            type: Number,
            required: false,
            default: 10
        }
    })

user_schema.statics.login = function (username, password) {
    return new Promise((resolve, reject) => {
        this.findOne({
            username: username
        }).exec().then((user) => {
            let loginUser = user

            if (!loginUser) {
                reject({
                    code: -1,
                    message: `The user ${username} is not exist!`
                })
            }

            bcrypt.compare(password, loginUser.password, (err, same) => {
                if (err) {
                    logger.error(err)
                    reject({
                        code: -3,
                        message: err.message
                    })
                }
                if (same) {
                    resolve(loginUser)
                } else {
                    reject({
                        code: -1,
                        message: 'password is incorrect, please check it again!'
                    })
                }

            })
        }).catch((err) => {
            logger.error(err)
            reject({
                code: -3,
                message: err.message
            })
        })
    })

}

user_schema.statics.hasUser = function (username) {
    let self = this

    return new Promise((resolve, reject) => {
        self.count({
            username: username
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

user_schema.statics.isRoot = function (userId) {
    let self = this

    return new Promise((resolve, reject) => {
        self.findOne({
            _id: userId
        }, {
            username: 1,
            isRoot: 1
        }).exec().then((value) => {
            if (value && value.isRoot) {
                resolve(true)
            } else {
                resolve(false)
            }
        }).catch((err) => {
            logger.error(err)
            reject(false)
        })
    })
}

user_schema.pre('save', function (next) {
    var that = this

    if (!that.isModified('password')) return next()

    bcrypt.genSalt(that._salt_bounds, (err, salt) => {
        if (err) {
            logger.error(err)
            return next()
        }

        bcrypt.hash(that.password, salt, null, (err, hash) => {
            if (err) {
                logger.error(err)
            }
            that.password = hash
            return next()
        })
    })
})

module.exports = mongoose.model('user', user_schema)

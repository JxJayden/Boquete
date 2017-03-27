const mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    logger = require('../lib/log'),
    Schema = mongoose.Schema

const user_schema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    limits: {
        type: Array,
        default: []
    },
    isRoot: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    _salt_bounds: {
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

            bcrypt.compare(password, loginUser.password, (error, same) => {
                if (error) {
                    logger.error(error)
                    reject({
                        code: -3,
                        message: error.message
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
        }, {username: 1, isRoot: 1}).exec().then((value) => {
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
    bcrypt.genSalt(that._salt_bounds, function (err, salt) {
        if (err) {
            logger.error(err)
            return next()
        }

        bcrypt.hash(that.password, salt, function (error, hash) {
            if (error) {
                logger.error(error)
            }
            that.password = hash

            return next()
        })
    })
})


const userModel = mongoose.model('user', user_schema)

module.exports = userModel

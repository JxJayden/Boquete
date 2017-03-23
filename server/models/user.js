const mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    logger = require('../lib/log'),
    Schema = mongoose.Schema

const user_schema = new Schema({
    team: {
        type: Array,
        default: []
    },
    mail: {
        type: String,
        required: true
    },
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

user_schema.statics.login = function (mail, password) {
    return new Promise((resolve, reject) => {
        this.findOne({
            mail: mail
        }).exec().then((user) => {
            let loginUser = user

            if (!loginUser) {
                reject({
                    code: -1,
                    message: `The mail ${mail} is not exist!`
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

user_schema.statics.hasUserBymail = function (mail) {
    let self = this

    return new Promise((resolve, reject) => {
        self.count({
            mail: mail
        }).exec().then((count) => {
            if (count && count > 0) {
                reject({
                    err: true,
                    message: `${mail} is exist`,
                    code: -3
                })
            } else {
                resolve()
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

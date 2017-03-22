const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const logger = require('../lib/log')

mongoose.connect('mongodb://127.0.0.1:27017/nodecms')
mongoose.Promise = global.Promise

const Schema = mongoose.Schema

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

user_schema.statics.login = function(username, password, cb) {
    this.findOne({
        username: username
    }, (err, user) => {
        if (err || !user) {
            logger.error(err ? err : `${username} is not exist!`)
            return cb(err ? {
                err: true,
                code: -3,
                message: err.message
            } : {
                err: true,
                code: -1,
                message: `${username} is not exist!`
            })
        }

        bcrypt.compare(password, user.password, (error, same) => {
            if (error) {
                logger.error(error)
                return cb({
                    err: true,
                    code: -3,
                    message: err.message
                })
            }
            if (same) {
                logger.info('login succeed')
                return cb(null, user)
            } else {
                return cb({
                    err: true,
                    code: -1,
                    message: 'password is incorrect, please check it again!'
                })
            }

        })
    })
}

user_schema.pre('save', function(next) {
    var that = this
    console.log(that._salt_bounds)
    bcrypt.genSalt(that._salt_bounds, function(err, salt) {
        if (err) {
            logger.error(err)
            return next()
        }

        bcrypt.hash(that.password, salt, function(error, hash) {
            if (error) {
                logger.error(error)
            }
            that.password = hash

            return next()
        })
    })
})


const userModel = mongoose.model('user', user_schema)

module.exports = {
    userModel: userModel
}

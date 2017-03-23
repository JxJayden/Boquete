const mongoose = require('mongoose'),
    logger = require('../lib/log'), // eslint-disable-line
    Schema = mongoose.Schema

const team_schema = new Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    feature: {
        type: Array,
        default: []
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

team_schema.statics.hasTeam = function (teamname, cb) {
    this.count({
        name: teamname
    }).exec().then((teamCount) => {
        if (teamCount && teamCount > 0) {
            cb(true)
        } else {
            cb(false)
        }
    }).catch((err) => {
        logger.error(err)
        throw {
            err: true,
            message: err.message
        }
    })
}

const teamModel = mongoose.model('team', team_schema)

module.exports = teamModel

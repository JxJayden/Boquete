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
    users: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    feature: {
        type: Array,
        default: []
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

const teamModel = mongoose.model('team', team_schema)

module.exports = teamModel

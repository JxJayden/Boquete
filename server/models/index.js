const mongoose = require('mongoose'),
    userModel = require('./user'),
    teamModel = require('./team')
mongoose.connect('mongodb://127.0.0.1:27017/nodecms')
mongoose.Promise = global.Promise


module.exports = {
    userModel: userModel,
    teamModel: teamModel
}

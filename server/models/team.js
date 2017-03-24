// const mongoose = require('mongoose'),
//     logger = require('../lib/log'), // eslint-disable-line
//     Schema = mongoose.Schema

// const team_schema = new Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     owner: {
//         type: String,
//         required: true
//     },
//     users: [{
//         type: Schema.Types.ObjectId,
//         ref: 'user'
//     }],
//     feature: {
//         type: Array,
//         default: []
//     },
//     created_at: {
//         type: Date,
//         default: Date.now
//     }
// })

// team_schema.statics.hasTeam = function (teamname) {
//     return new Promise((resolve, reject) => {
//         this.count({
//             name: teamname
//         }).exec().then((teamCount) => {
//             if (teamCount && teamCount > 0) {
//                 resolve(true)
//             } else {
//                 resolve(false)
//             }
//         }).catch((err) => {
//             logger.error(err)
//             reject({
//                 code: -4,
//                 message: err.message
//             })
//         })
//     })
// }

// team_schema.statics.getOwnerId = function (teamId) {
//     return new Promise((resolve, reject) => {
//         this.findOne({
//             _id: teamId
//         }, {
//             owner: 1
//         }).exec().then((id) => {
//             if (id) resolve(id)
//             else throw {message: `can't find ${teamId} owner id`}
//         }).catch((err) => {
//             logger.error(err)
//             reject({
//                 code: -4,
//                 message: err.message
//             })
//         })
//     })
// }
// const teamModel = mongoose.model('team', team_schema)

// module.exports = teamModel

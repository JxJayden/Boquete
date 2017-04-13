// const db = require('../../../models/index'),
//     logger = require('../../lib/log'),
//     cry = require('../../lib/cryptology')

// module.exports = async function (ctx) {
//     let userId = ctx.cookies.get('user') ? cry.decrypt(ctx.cookies.get('user')) : null,
//         teamname = ctx.request.body.teamname,
//         newTeam = {
//             name: teamname,
//             owner: userId,
//             users: []
//         },
//         body, isTeamExist, user

//     try {
//         // 对 userId 做判断
//         if (!userId) {
//             throw {
//                 message: '请先登录',
//                 code: -1
//             }
//         }
//         if (!teamname) {
//             throw {
//                 code: -3,
//                 message: '请输入团队名称'
//             }
//         }

//         await db.userModel.findOne({
//             _id: userId
//         }).exec().then((value) => {
//             user = value
//         }).catch((err) => {
//             throw {
//                 code: -4,
//                 message: err.message
//             }
//         })

//         if (user.team) {
//             throw {
//                 message: '已经创建了团队',
//                 code: -1
//             }
//         }

//         // 根据团队名称判断团队是否已经存在
//         isTeamExist = await db.teamModel.hasTeam(teamname)

//         if (isTeamExist) {
//             throw {
//                 code: -3,
//                 message: `The Team name: ${teamname} is exist!`
//             }
//         }

//         newTeam.users.push(user._id)

//         await new db.teamModel(newTeam).save()
//         await db.userModel.update({
//             _id: user._id
//         }, {
//             $set: {
//                 team: teamname
//             }
//         })
//         body = {
//             err: false,
//             message: 'succeed',
//             code: 200,
//             data: {
//                 team: newTeam
//             }
//         }
//     } catch (err) {
//         logger.error(err)
//         body = {
//             err: true,
//             message: err.message,
//             code: err.code || -3,
//             data: {}
//         }
//     }
//     ctx.body = body
// }

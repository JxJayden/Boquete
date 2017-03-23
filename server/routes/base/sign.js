const db = require('../../models/index'),
    router = require('koa-router')(),
    logger = require('../../lib/log'),
    config = require('../../config')

router.post('/', async function (ctx) {
    let username = ctx.request.body.username,
        password = ctx.request.body.password,
        teamname = ctx.request.body.teamname,
        body, teamCount, newUser

    // 对 teamname username password 做判断
    if (!teamname || !username || !password) {

        body = {
            error: true,
            message: !teamname ?
                'teamname is required' :
                !username ?
                'username is required' : 'password is required',
            code: -1,
            data: {}
        }

    } else {
        try {
            teamCount = await db.teamModel.count({
                name: teamname
            }).exec()

            if (teamCount && teamCount > 0) {
                throw {
                    error: true,
                    message: `${teamname} is exist!`,
                    code: -2,
                }
            }

            // userCount = await db.userModel.count({
            //     team: teamname,
            //     username: username
            // })

            // if (userCount && userCount > 0) {
            //     throw {
            //         error: true,
            //         message: `${username} is exist in ${teamname}!`,
            //         code: -2,
            //     }
            // }

            newUser = await new db.userModel({
                team: teamname,
                username: username,
                password: password,
                isRoot: true,
                limits: config.limits
            }).save()

            await new db.teamModel({
                name: teamname,
                owner: username,
                users: [newUser._id]
            }).save()

            body = {
                error: false,
                message: 'succeed',
                code: 200,
                data: {}
            }
        } catch (err) {
            logger.error(err)
            body = {
                error: true,
                code: err.code || -2,
                message: err.message || 'some thing wrong',
                data: {}
            }
        }

        ctx.body = body
    }
})

module.exports = router

const db = require('../../models/index'),
    router = require('koa-router')(),
    logger = require('../../lib/log'),
    config = require('../../lib/config')

router.post('/', async function (ctx) {
    let username = ctx.request.body.username,
        password = ctx.request.body.password,
        teamname = ctx.request.body.teamname,
        body, hasTeam, hasUser, newUser

    // 对 teamname username password 做判断
    try {
        if (!teamname || !username || !password) {

            throw {
                message: !teamname ?
                    'teamname is required' :
                    !username ?
                    'username is required' : 'password is required',
                code: -1,
            }

        }

        hasTeam = await new Promise((resolve) => {
            db.teamModel.hasTeam(teamname, (h) => {
                resolve(h)
            })
        })

        if (hasTeam) {
            throw {
                message: `Team name: ${teamname} is exist!`
            }
        }

        hasUser = await new Promise((resolve) => {
            db.userModel.hasUser(username, (h) => {
                resolve(h)
            })
        })

        if (hasUser) {
            throw {
                message: `User name: ${username} is exist!`
            }
        }

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
})

module.exports = router

const db = require('../../models/index'),
    logger = require('../../lib/log'),
    config = require('../../lib/config')

module.exports = async function (ctx) {
    let
        username = ctx.request.body.username,
        password = ctx.request.body.password,
        newUser = {
            username: username,
            password: password,
            isRoot: true,
            limits: config.limits
        },
        body, isUserExist

    try {
        // 对 username, password 做判断 不存在则抛出错误
        if (!username || !password) {

            throw {
                message: !username ?
                    'username is required' : 'password is required',
                code: -1
            }

        }

        // 根据注册邮箱判断用户是否已经存在
        isUserExist = await db.userModel.hasUser(username)

        if (isUserExist) {
            throw {
                code: -3,
                message: `The username: ${username} is exist!`
            }
        }

        // 保存新用户
        await new db.userModel(newUser).save()

        // 删除一些不必要的信息
        delete newUser.password
        delete newUser.limits
        delete newUser.isRoot

        body = {
            err: false,
            message: 'register succeed',
            data: {
                newUser
            }
        }
    } catch (err) {
        logger.error(err)
        body = {
            err: true,
            message: err.message,
            code: err.code || -3,
            data: {}
        }
    }
    ctx.body = body
}

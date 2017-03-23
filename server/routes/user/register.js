const db = require('../../models/index'),
    logger = require('../../lib/log'),
    config = require('../../lib/config')

module.exports = async function (ctx) {
    let newUser = {
            mail: ctx.request.body.mail,
            username: ctx.request.body.username,
            password: ctx.request.body.password,
            isRoot: true,
            limits: config.limits
        },
        body, isUserExist

    try {
        // 对 mail, username, password 做判断 不存在则抛出错误
        if (!newUser.mail || !newUser.username || !newUser.password) {

            throw {
                message: !newUser.mail ?
                    'mail is required' :
                    !newUser.username ?
                    'username is required' : 'password is required',
                code: -1
            }

        }

        // 根据注册邮箱判断用户是否已经存在
        isUserExist = await db.userModel.hasUserBymail(newUser.mail)

        if (isUserExist) {
            throw {
                code: -3,
                message: `The Mail: ${newUser.mail} is exist!`
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
            error: true,
            message: err.message,
            code: err.code || -3,
            data: {}
        }
    }
    ctx.body = body
}

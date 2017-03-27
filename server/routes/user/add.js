/**
 * 添加团队
 */
const db = require('../../models/index'),
    logger = require('../../lib/log'),
    cry = require('../../lib/cryptology'),
    utils = require('../../lib/utils')

module.exports = async function (ctx) {
    let  username = ctx.request.body.username,
        password = ctx.request.body.password,
        limits = ctx.request.body.limits,
        isRoot = ctx.request.body.isRoot ? ctx.request.body.isRoot : false,
        body, hasUserName

    try {
        if (!username) throw {
            code: -3,
            message: '请输入新管理员的用户名'
        }

        if (!password) throw {
            code: -3,
            message: '请输入新管理员的密码'
        }

        if (!limits) {
            throw {
                code: -3,
                message: '请选择新管理员的权限'
            }
        } else {
            limits = JSON.parse(limits)
        }

        if (!utils.isArray(limits)) throw {
            code: -3,
            message: 'TypeError: limits must be Array'
        }

        hasUserName = await db.userModel.hasUser(username)

        if (hasUserName) throw {
            code: -2,
            message: `The username: ${username} is exist`
        }

        await new db.userModel({
            username: username,
            password: password,
            limits: limits,
            isRoot: isRoot
        }).save()

        body = {
            error: false,
            message: 'succeed',
            code: 200,
            data: {
                user: {
                    username: username,
                    limits: limits,
                    isRoot: isRoot
                }
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

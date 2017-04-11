/**
 * 添加管理员
 */
const db = require('../../../models/index'),
    logger = require('../../lib/log').getLogger('user add'),
    utils = require('../../lib/utils')

module.exports = async function (ctx) {
    let username = ctx.request.body.username,
        password = ctx.request.body.password,
        limits = ctx.request.body.limits,
        isRoot = ctx.request.body.isRoot ? ctx.request.body.isRoot : false,
        body, hasUserName

    try {
        if (!username) throw { code: -3, message: '请输入新管理员的用户名' }

        if (!password) throw { code: -3, message: '请输入新管理员的密码' }

        if (!limits) throw { code: -3, message: '请选择新管理员的权限' }

        if (!utils.isArray(limits))  limits = JSON.parse(limits)

        hasUserName = await db.userModel.hasUser(username)

        if (hasUserName) throw { code: -2, message: `The username: ${username} is exist` }

        await new db.userModel({
            username: username,
            password: password,
            limits: limits,
            isRoot: isRoot
        }).save()

        body = {
            err: false,
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
            err: true,
            message: err.message,
            code: err.code || -3,
            data: {}
        }
    }
    ctx.body = body
}

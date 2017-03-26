/**
 * 添加团队
 */
const db = require('../../models/index'),
    logger = require('../../lib/log'),
    cry = require('../../lib/cryptology'),
    utils = require('../../lib/utils')

module.exports = async function (ctx) {
    let currentUserId = cry.decrypt(ctx.cookies.get('user')),
        username = ctx.request.body.username,
        password = ctx.request.body.password,
        limits = ctx.request.body.limits,
        isRoot = ctx.request.body.isRoot ? ctx.request.body.isRoot : false,
        body, currentUser

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

        await db.userModel.findOne({
            _id: currentUserId
        }, ).exec().then((value) => {
            currentUser = value
        }).catch((err) => {
            throw {
                code: -4,
                message: err.message
            }
        })

        if (!currentUser.isRoot) {
            throw {
                message: '无添加新用户权限',
                code: -1
            }
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

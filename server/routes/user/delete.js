const db = require('../../models/db')
const router = require('koa-router')()
const logger = require('../../lib/log')
const cry = require('../../lib/cryptology')

router.delete('/', async function(ctx, next) {
    let _id = ctx.request.body._id
    let currentUserId = cry.decrypt(ctx.cookies.get('user'))
    let body

    if (currentUserId) {
        body = await (db.userModel.findOne({ _id: currentUserId }, 'username isRoot')).exec().then((value) => {

            if (!value.isRoot) {
                throw {
                    err: true,
                    message: '无删除权限！',
                    code: -1
                }
            } else {
                return value.username
            }

        }).then((current) => {

            logger.info(`做出删除操作的用户为 ${current}`)
            return db.userModel.findOne({ _id: _id }).exec()

        }).then((value) => {

            if (value.isRoot) {
                throw {
                    err: true,
                    message: '无法删除超级用户！',
                    code: -1
                }
            } else {
                return db.userModel.remove({ _id: _id }).exec()
            }

        }).then(() => {

            return {
                err: false,
                message: 'delete done',
                code: 200
            }

        }).catch((err) => {

            return {
                err: true,
                message: err.message,
                code: err.code || -1
            }

        })

    } else {
        cxt.cookies.set('sessionId', null)
        cxt.cookies.set('user', null)
        cxt.cookies.set('limits', null)

        body = {
            err: true,
            message: '会话过期，请登录重试',
            code: -2
        }
    }

    ctx.body = body
})

module.exports = router

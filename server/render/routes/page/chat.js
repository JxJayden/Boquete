const logger = require('../../../lib/log')('router-home')

module.exports = async(ctx) => {
    await ctx.render('./page/chat', {})
}

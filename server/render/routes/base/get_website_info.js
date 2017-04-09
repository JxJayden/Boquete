const db = require('../../../models/index'),
    logger = require('../../lib/log')

module.exports = async function (websiteId) {
    return await db.websiteModel.findById(websiteId).exec()
}

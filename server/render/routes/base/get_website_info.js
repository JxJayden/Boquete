const db = require('../../../models/index')

module.exports = async function (websiteId) {
    return await db.websiteModel.findById(websiteId).exec()
}

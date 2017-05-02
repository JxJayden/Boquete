const db = require('../../models/index')

async function getWebsiteInfo(websiteId)  {
    return await db.websiteModel.findById(websiteId).exec()
}

module.exports = {
    getWebsiteInfo: getWebsiteInfo
}

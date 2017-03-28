const log4js = require('log4js')
const path = require('path')
const log_config = {
    appenders: [{
        type: 'console'
    }, {
        type: 'DateFile',
        level: 'DEBUG',
        filename: `${__dirname}/../../logs/server/api`,
        pattern: '-yyyy-MM-dd.log',
        alwaysIncludePattern: true,
        maxLogSize: 20480,
        backups: 3
    }]
}

log4js.configure(log_config)

const logger = log4js.getLogger(path.basename(__filename))
/**
 * 打印日志
 */
module.exports = logger

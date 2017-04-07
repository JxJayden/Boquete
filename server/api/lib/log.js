const log4js = require('log4js'),
    path = require('path'),
    log_config = {
        appenders: [{
            type: 'console'
        }, {
            type: 'DateFile',
            level: 'ERROR',
            filename: `${__dirname}/../../../logs/api/api`,
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

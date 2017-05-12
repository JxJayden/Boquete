const log4js = require('log4js'),
    path = require('path'),
    log_config = {
        appenders: [{
            type: 'console'
        }, {
            type: 'dateFile',
            level: 'ERROR',
            filename: `${__dirname}/../../logs/server/server`,
            pattern: '-yyyy-MM-dd.log',
            alwaysIncludePattern: true,
            maxLogSize: 20480,
            backups: 3
        }]
    }

log4js.configure(log_config)


function log (logName) {
    if (logName) {
        return log4js.getLogger(logName)
    } else {
        return log4js.getLogger(path.basename(__filename))
    }
}

log.getLogger = log4js.getLogger
/**
 * 打印日志
 */
module.exports = log

/* eslint-disable */
module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [{
            name: "API",
            script: "./api/bin/www",
            watch: [
                "./api", "./lib", "./models"
            ],
            env: {
                COMMON_VARIABLE: "true",
            },
            env_production: {
                NODE_ENV: "production"
            }
        },
        {
            name: "RENDER",
            script: "./render/bin/www",
            watch: [
                "./render", "./lib", "./models"
            ],
            env: {
                COMMON_VARIABLE: "true"
            },
            env_production: {
                NODE_ENV: "production"
            }
        },
        {
            name: "CHAT",
            script: "./im/app.js",
            watch: [
                "./im"
            ],
            env: {
                COMMON_VARIABLE: "true"
            },
            env_production: {
                NODE_ENV: "production"
            }
        }
    ]
}

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
                COMMON_VARIABLE: "true"
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
    ],

    /**
     * Deployment section
     * http://pm2.keymetrics.io/docs/usage/deployment/
     */
    deploy: {
        production: {
            user: "node",
            host: "212.83.163.1",
            ref: "origin/master",
            repo: "git@github.com:repo.git",
            path: "/var/www/production",
            "post-deploy": "npm install && pm2 startOrRestart ecosystem.config.js --env production"
        },
        dev: {
            user: "node",
            host: "212.83.163.1",
            ref: "origin/master",
            repo: "git@github.com:repo.git",
            path: "/var/www/development",
            "post-deploy": "npm install && pm2 startOrRestart ecosystem.config.js --env dev",
            env: {
                NODE_ENV: "dev"
            }
        }
    }
}

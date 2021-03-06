module.exports = {
  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'root',
      host : '119.29.137.236',
      ref  : 'origin/master',
      repo : 'https://github.com/JxJayden/Boquete.git',
      path : '/boquete',
      'post-deploy' : 'cd ./server && yarn install && pm2 reload ecosystem.config.js --env production'
    }
  }
};

module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: "fds-admin",
      script: "npm",
      args: "run start",
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
};

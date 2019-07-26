// PM2启动文件入口
// pm2 start start.config.js --env production
module.exports = {
    apps : [
        {
          name: "hudong",
          script: "./server/index.js",
          watch: false,
          env: {
              "PORT": 22801,
              "NODE_ENV": "development"
          },
          env_prev: {
            "PORT": 22801,
            "NODE_ENV": "prev",
          },
          env_production: {
              "PORT": 22801,
              "NODE_ENV": "production",
          }
        }
    ]
  }

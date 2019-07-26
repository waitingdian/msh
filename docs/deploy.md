# hudong 部署文档
## 生产环境
- 准备更新的文件，和简单的文档说明
1. 构建步骤
    1.打包上去
    2.npm install 安装依赖
    3.npm run build 构建
    4.pm2 启动项目
2. 域名以及存放路径
    域名 http://hudong.youpenglai.com/
    存放路径 \\192.168.0.21\public\interactive\
3. 部署步骤

- 准备更新的文件，和简单的文档说明
## 测试环境
1. 构建步骤
   文件夹下的除node_modules 文件打包
2. 域名以及存放路径
   域名 http://hudong2.youpenglai.com/
   存放路径 /var/www/hudong
3. 部署步骤
   pm2 ls
   pm2 restart start.config.js

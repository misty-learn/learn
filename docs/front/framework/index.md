# Node Web框架

## NodeMon

### 使用

nodemon是一个监视服务端应用程序文件改变的包，一旦nodemon发现我们修改了服务器文件，
他就会自动重启服务，这样我们就可以省去ctrl+c停止服务-> 启动服务

### 安装

``` shell

npm install nodemon

# 全局安装启动项目
nodemon app.js

# 当前项目安装
npx nodemon app.js

```
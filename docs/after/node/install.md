# 安装

## 直接安装

1. 官网下载.msi安装包：<https://nodejs.org/zh-cn/>

2. 全程下一步

3. 在命令行工具中输入 `node -v` 查看版本号，如果存在版本号安装成功

## 使用压缩包安装

1. 官网下载.zip安装包： <https://nodejs.org/zh-cn/>

2. 解压下载好的安装包

3. 在此电脑 > 高级系统设置 手动配置环境变量

4. 在命令行工具中输入 `node -v` 查看版本号，如果存在版本号则安装成功

## 多版本共存的安装方式

1. 下载NVM: <https://github.com/coreybutler/nvm-windows>

2. 创建一个存放nvm的目录

3. 在创建的nvm目录中创建两个子目录，分别是nvm和nodejs，并把nvm的压缩包导入至nvm的目录中

4. 点击运行`install.cmd`文件【需要以管理员身份运行】
    * 在终端中直接回车
    * 将弹出的文件直接另存到当前的nvm的目录中
    * 打开setting.txt【上一步另存为的文件】
    * 修改`root`为当前的nvm地址
    * 修改`path`为创建的node地址

5. 配置环境变量
    ::: tip
    在运行完`install.cmd`的时候会默认在环境变量中生成一个`NVM_HOME`和`NVM_SYMLINK`两个环境变量但是里面的值是错误的需要手动修改，若不存在，需要自行手动创建两个环境变量
    :::
    * 打开环境变量
    * 配置`NVM_HOME`为当前的nvm的地址
    * 配置`NVM_SYMLINK`为创建的node地址

6. 打开命令行工具输入`nvm version` 能查看版本信息则配置成功

::: tip
NVM中的常用命令：

```shell
nvm list #查看当前安装的nodeJs的所有版本信息
nvm install 10.18.2 #安装指定版本的nodeJs
nvm uninstall 10.18.2 #卸载指定版本的nodeJs
nvm use 10.18.2 #使用指定版本的nodeJs
```

:::

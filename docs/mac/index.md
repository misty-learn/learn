# MAC使用中的常见问题

## Mac应用出现文件损坏的问题解决

1. 打开终端界面

2. 输入如下命令：

```shell script

sudo xattr -r -d com.apple.quarantine 损坏应用的路径

```
3. 点击【前往】->【应用程序】，将应用程序拖至终端操作界面

4. 执行命令，完成重新打开应用

## 使用brew安装php以及pecl

1. 执行如下命令

```shell script
brew search php  # 使用此命令搜索可用的PHP版本
brew install php@7.1 # 使用此命令安装指定版本的php
brew install brew-php-switcher # 安装php多版本切换工具
brew-php-switcher 7.1 # 切换PHP版本到7.1（需要brew安装多个版本）
```

::: waring 注意点：

PHP -v 查询版本信息，确定是否安装成功（如果显示的是系统自带版本，则需要配置环境变量，修改~/.bash_profile中/usr/local/bin的优先级）

:::

2. 通过brew安装的PHP版本中自带了pecl,可以直接使用

```shell script

pecl version # 查看版本信息
pecl help # 可以查看命令帮助
pecl search xdebug  # 搜索可以安装的扩展信息
pecl install xdebug # 安装扩展
pecl install http://pecl.php.net/get/redis-4.2.0.tgz # 安装指定版本扩展

```

::: warning 注意点：

因为pecl在使用的过程中下载会非常慢，所以可以先下载下来对应的扩展然后安装

:::

### 目前已经存在的本地库

* mongodb
    * http://pecl.28yanyu.cn/mongodb/mongodb-1.8.2.tgz

* swoole
    * http://pecl.28yanyu.cn/swoole/swoole-4.5.7.tgz
    
* redis
    * http://pecl.28yanyu.cn/redis/redis-4.2.0.tgz
    * http://pecl.28yanyu.cn/redis/redis-5.3.2.tgz

## mac多开微信命令

```shell
nohup /Applications/WeChat.app/Contents/MacOS/WeChat > /dev/null 2>&1 &
```

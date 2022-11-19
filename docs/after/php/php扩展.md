# php安装扩展

## mongodb扩展安装

在mac下使用pecl安装mongodb扩展会出现报错如下:

pecl在mac上安装mongodb，致命错误：找不到'Security / Security.h'文件

解决办法：

1. 手动下载mongodb扩展包 下载地址：http://pecl.php.net/get/mongodb

2. 解压文件

3. 进入目录执行以下命令

```shell
# 解压文件包
phpize

# 查找php-config配置文件的路径

mdfind php-config

# 执行编译
./configure --with-php-config=/usr/bin/php-config # 这是我php的路径每个人的不一定相同哦！

# 编译并安装

make && make install

```

4. 执行make的时候会报之前我们提到过的错误，解决办法如下

```
# 进入扩展包的include目录

cd include

# 软连接
ln -s /Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX.sdk/System/Library/Frameworks/Security.framework/Versions/A/Headers/ Security
# 配置完成后，后面可能还会报其他错误，所以需要对其他的错误也要进行处理同上的方式
ln -s /Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX.sdk/System/Library/Frameworks/CoreFoundation.framework/Versions/A/Headers CoreFoundation

# 再执行编译安装

make && make install

# 安装成功

```

* 在新版本的mac中其所有的库文件都在如下目录，安装其他扩展如出现相同的情况可以到如下地址去查询对应的文件

```

cd /Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX.sdk/System/Library/Frameworks

```


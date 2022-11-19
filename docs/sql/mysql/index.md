# MySQL数据库

## Mysql基础

在安装完成mysql的时候，如果没有密码登录，可以手动创建一个密码：

```sql

alter user 'root'@'localhost' identified by '新密码';

```

### 链接mysql

mysql -h127.0.0.1 -P3306 -uroot -proot

::: tip 解释：

 * -h 链接的地址默认为本地
 * -P 端口号默认为3306
 * -u 登录账号
 * -p 密码（没有密码可以省略密码）
 
:::

### 退出mysql

三种退出方式：

1. exit;
2. quit
3. \q

### 显示数据库

show databases;

显示当前已有的数据库：
1. information_schema

保存着关于MySQL服务器所维护的所有其他的数据库的信息。
如：数据库名，数据库表，表栏的数据类型和访问权限

2. mysql

MySQL系统数据库，保存了登录用户名，密码，以及每个用户的权限等

3. performance_schema

用来保存数据库服务性能的参数

4. sys

这个库是通过视图的形式把information_schema和performance_schema结合起来，查询出更加令人容易理解的数据

### 理解数据库SQL

* DDL:数据定义语句
    用来定义数据库对象：创建库、表、列等

* DML:数据操作语句
    用来操作数据表中的记录

* DQL:数据查询语句
    用来查询数据

* DCL:数据控制语句
    用来定义访问权限和安全级别



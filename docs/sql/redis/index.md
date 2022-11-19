# Redis

## 什么是Redis

* Remote Dictionary Server（远程字典服务器）

* Redis是一个开源的使用C语言编写的数据库

* Redis与MongoDB一样是NoSQL类型的数据库
    不同的是MongoDB存储的是文档，而Redis存储的是键值对（Key-Value）
    
## 特点

* 速度快
    * Redis默认情况下将数据存储到内存中
    * 读取速度能达到10w/s左右，写入能到8w/s左右
* 支持数据的持久化
    * 可以将内存中的数据保存到磁盘中
* 支持多种数据结构
    * Redis是通过key-value形式存储数据，但是value的值除了支持常用数据类型以外，
        同时还提供了list,set,zset,hash等数据结构的存储
* 定制性强
    * Redis虽然强大，但是它是开源免费的
    * 一个版本的代码在23000行左右
    * 第二个版本代码在50000行左右
* 支持分布式
    * 和MongoDB一样，Redis支持主从赋值，支持分布式存储的

## 应用场景

* 缓存系统
    * 由于Redis是将数据存储在内存中的，所以我们可以使用Redis来实现内存缓存
    * 对于经常被查询，但是不经常被修改或者删除的数据，存储到Redis中
* 排行榜
    * 由于Redis支持集合(set)和有序集合(Sorted Set)
    所以使得我们实现排行榜的时候变的更简单
* 计数器
    * 由于Redis提供了incr/decr指令，使得我们在实现计数器时非常简单
    * 转发数/评论数/播放数/访问数/......
* 存储社交关系
    * 由于Redis支持存储集合类型数据，由于社交关系不会经常发生改变
    所以很多社交网站会使用Redis来存储社交关系
* 消息队列
    * Redis天生支持发布订阅模式，所以天生就是实现消息队列系统的材料

## 数据类型

* Redis是以key-value的形式存储数据的

* key无论如何都是字符串类型

* value支持以下五种数据类型
    * 字符串（String）
    * 哈希（Hash）
    * 列表（List）
    * 无序集合（sets）
    * 有序集合（sorted sets）

1. String

格式 key value

示例 name hello

2. Hash 

相当于一个对象（是无序的）

格式 key field value

示例 user name hello
    user age    18

3. List

相当于编程开发中的数组

格式 key value1 value2 ...

示例 name abc bcd ada

list是有序的

4. Set

键是String ，值是set

一堆无序的数据

存储的数据不能重复

5. Zset

一堆有序的数据，通过权重方式实现排序

存储的数据不能重复